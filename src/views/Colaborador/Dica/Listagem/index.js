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
import {listagemDica as initialState} from "../../../../utils/constants";
import update from "immutability-helper";
import FooterToolbar from "../../../../components/Pattern/FooterToolbar";
import Card from "../../../../components/Pattern/Card";
import Header from "../../../../components/Pattern/Header";
import EmptyList from "../../../../components/Pattern/EmptyList";
import formatterConstant from "../../../../utils/function/formatterConstant";

class ListagemDica extends React.Component {
    constructor(props) {
        super(props);
        this.state = formatterConstant(initialState);
    }

    componentDidMount() {
        this.props.checkToken(this.props.navigation);

        this.setState(
            update(this.state, {
                dicas: {$set: this.mapData(this.props.dicas)}
            })
        );
    };

    componentDidUpdate(prevProps, _prevState, _snapshot) {
        if(prevProps.dicas !== this.props.dicas) {
            this.setState(
                update(this.state, {
                    dicas: {$set: this.mapData(this.props.dicas)}
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
        this.props.onDeleteDica(_id, this.cb);
    };

    onPrepareEdit = async (item) => {
        this.props.onPrepareEditDica(item, this.props.navigation);
    };

    mapData = data => {
        const list = [];

        if(data) {
            Object.keys(data).forEach(key => {
                const dica = data[key];

                if(dica.status.pendente || dica.status.aprovado) {
                    list.push({...dica, _id: key})
                }
            });
        }

        return list;
    };

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle={theme.MODE.BARSTYLE} backgroundColor={theme.COLORS.PRIMARY} />

                <Header navigation={this.props.navigation} rota="Menu" statusPage="ColaboradorDicas" rotaAdd="ColaboradorCadastrarDica" listagem tipo="colaborador" />

                <ScrollView horizontal={false} style={styles.scrollContainer}>
                    <View style={styles.flatlist}>
                        {this.state.dicas.length > 0 ?
                            <FlatList data={this.state.dicas} renderItem={({item}) =>
                                <>
                                    <View style={styles.body}>
                                        <Block style={styles.block}>
                                            <Card key={item._id} item={item} horizontal
                                                  navigation={this.props.navigation} rota=""
                                                  onDelete={() => this.onDelete(item._id)}
                                                  onPrepareEdit={() => this.onPrepareEdit(item)} listagem={"dica"} tipo="colaborador" />
                                        </Block>
                                    </View>
                                </>
                            } keyExtractor={item => String(item._id)}/>
                            : <EmptyList message="Nenhuma dica adicionada..." />
                        }
                    </View>
                </ScrollView>

                <FooterToolbar navigation={this.props.navigation} />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    dicas: state.dicas.dicas
});

const mapDispatchToProps = dispatch => ({
    onDeleteDica: (_id, cb) => dispatch(actions.deleteDica(_id, cb)),
    onPrepareEditDica: (item, navigation) => dispatch(actions.prepareEditDica(item, navigation)),
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListagemDica);
