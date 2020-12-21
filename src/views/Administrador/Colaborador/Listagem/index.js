import React from "react";
import {
    View,
    StatusBar,
    FlatList, ScrollView
} from "react-native";

import Block from "../../../../components/Pattern/Block";
import {theme} from "../../../../utils/constants";
import styles from './style';
import * as actions from "../../../../store/actions";
import {connect} from "react-redux";
import {listagemColaborador as initialState} from "../../../../utils/constants";
import update from "immutability-helper";
import FooterToolbar from "../../../../components/Pattern/FooterToolbar";
import Card from "../../../../components/Pattern/Card";
import Header from "../../../../components/Pattern/Header";
import EmptyList from "../../../../components/Pattern/EmptyList";
import formatterConstant from "../../../../utils/function/formatterConstant";

class ListagemColaborador extends React.Component {
    constructor(props) {
        super(props);
        this.state = formatterConstant(initialState);
    }

    componentDidMount() {
        this.props.checkToken(this.props.navigation);

        this.setState(
            update(this.state, {
                users: {$set: this.mapData(this.props.users)}
            })
        );
    };

    componentDidUpdate(prevProps, _prevState, _snapshot) {
        if(prevProps.users !== this.props.users) {
            this.setState(
                update(this.state, {
                    users: {$set: this.mapData(this.props.users)}
                })
            );
        }
    }

    cb = (type) => {
        this.setState(
            update(this.state, {
                request: {
                    $toggle: ['loading']
                }
            })
        );
    };

    onApprove = async (_id) => {
        this.props.onStatusUser(_id, 'approve', this.cb);
    };

    onDisapprove = async (_id) => {
        this.props.onStatusUser(_id, 'disapprove', this.cb);
    };

    mapData = data => {
        const list = [];

        if(data) {
            Object.keys(data).forEach(key => {
                const user = data[key];

                if(user.perfil.tipo.colaborador) {
                    list.push({...user.perfil, _id: key});
                }
            });
        }

        return list;
    };

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle={theme.MODE.BARSTYLE} backgroundColor={theme.COLORS.PRIMARY} />

                <Header navigation={this.props.navigation} rota="Menu" statusPage="AdmColaboradores" listagem tipo="administrador" />

                <ScrollView horizontal={false} style={styles.scrollContainer}>
                    <View style={styles.flatlist}>
                        {this.state.users.length > 0 ?
                            <FlatList data={this.state.users} renderItem={({item}) =>
                                <>
                                    <View style={styles.body}>
                                        <Block style={styles.block}>
                                            <Card key={item._id} item={item} horizontal
                                                  navigation={this.props.navigation} rota=""
                                                  onApprove={() => this.onApprove(item._id)}
                                                  onDisapprove={() => this.onDisapprove(item._id)}
                                                  listagem={"colaborador"}
                                                  tipo="administrador"
                                            />
                                        </Block>
                                    </View>
                                </>
                            } keyExtractor={item => String(item._id)}/>
                            : <EmptyList message="Nenhum colaborador encontrado..." />
                        }
                    </View>
                </ScrollView>

                <FooterToolbar navigation={this.props.navigation} />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    users: state.users.users
});

const mapDispatchToProps = dispatch => ({
    onStatusUser: (_id, status, cb) => dispatch(actions.statusUser(_id, status, cb)),
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListagemColaborador);
