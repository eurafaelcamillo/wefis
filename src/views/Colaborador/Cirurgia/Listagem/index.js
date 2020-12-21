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
import {listagemCirurgia as initialState} from "../../../../utils/constants";
import update from "immutability-helper";
import FooterToolbar from "../../../../components/Pattern/FooterToolbar";
import Card from "../../../../components/Pattern/Card";
import Header from "../../../../components/Pattern/Header";
import EmptyList from "../../../../components/Pattern/EmptyList";
import formatterConstant from "../../../../utils/function/formatterConstant";

class ListagemCirurgia extends React.Component {
    constructor(props) {
        super(props);
        this.state = formatterConstant(initialState);
    }

    componentDidMount() {
        this.props.checkToken(this.props.navigation);

        this.setState(
            update(this.state, {
                cirurgias: {$set: this.mapData(this.props.cirurgias)}
            })
        );
    };

    componentDidUpdate(prevProps, _prevState, _snapshot) {
        if(prevProps.cirurgias !== this.props.cirurgias) {
            this.setState(
                update(this.state, {
                    cirurgias: {$set: this.mapData(this.props.cirurgias)}
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

    onDelete = async (_id) => {
        this.props.onDeleteCirurgia(_id, this.cb);
    };

    onPrepareEdit = async (item) => {
        this.props.onPrepareEditCirurgia(item, this.props.navigation);
    };

    mapData = data => {
        const list = [];

        if(data) {
            Object.keys(data).forEach(key => {
                const cirurgia = data[key];

                if(cirurgia.status.pendente || cirurgia.status.aprovado) {
                    list.push({...cirurgia, _id: key})
                }
            });
        }

        return list;
    };

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle={theme.MODE.BARSTYLE} backgroundColor={theme.COLORS.PRIMARY} />

                <Header navigation={this.props.navigation} rota="Menu" statusPage="ColaboradorCirurgias" rotaAdd="ColaboradorCadastrarCirurgia" listagem tipo="colaborador" />

                <ScrollView horizontal={false} style={styles.scrollContainer}>
                    <View style={styles.flatlist}>
                        {this.state.cirurgias.length > 0 ?
                            <FlatList data={this.state.cirurgias} renderItem={({item}) =>
                                <>
                                    <View style={styles.body}>
                                        <Block style={styles.block}>
                                            <Card key={item._id} item={item} horizontal
                                                  navigation={this.props.navigation} rota=""
                                                  onDelete={() => this.onDelete(item._id)}
                                                  onPrepareEdit={() => this.onPrepareEdit(item)} listagem={"cirurgia"} tipo="colaborador"/>
                                        </Block>
                                    </View>
                                </>
                            } keyExtractor={item => String(item._id)}/>
                            : <EmptyList message="Nenhuma cirurgia adicionada..."/>
                        }
                    </View>
                </ScrollView>

                <FooterToolbar navigation={this.props.navigation} />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    cirurgias: state.cirurgias.cirurgias
});

const mapDispatchToProps = dispatch => ({
    onDeleteCirurgia: (_id, cb) => dispatch(actions.deleteCirurgia(_id, cb)),
    onPrepareEditCirurgia: (item, navigation) => dispatch(actions.prepareEditCirurgia(item, navigation)),
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListagemCirurgia);
