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
import {listagemTratamento as initialState} from "../../../../utils/constants";
import update from "immutability-helper";
import FooterToolbar from "../../../../components/Pattern/FooterToolbar";
import Card from "../../../../components/Pattern/Card";
import Header from "../../../../components/Pattern/Header";
import EmptyList from "../../../../components/Pattern/EmptyList";
import formatterConstant from "../../../../utils/function/formatterConstant";

class ListagemTratamento extends React.Component {
    constructor(props) {
        super(props);
        this.state = formatterConstant(initialState);
    }

    componentDidMount() {
        this.props.checkToken(this.props.navigation);

        this.setState(
            update(this.state, {
                tratamentos: {$set: this.mapData(this.props.tratamentos)}
            })
        );
    };

    componentDidUpdate(prevProps, _prevState, _snapshot) {
        if(prevProps.tratamentos !== this.props.tratamentos) {
            this.setState(
                update(this.state, {
                    tratamentos: {$set: this.mapData(this.props.tratamentos)}
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
        this.props.onDeleteTratamento(_id, this.cb);
    };

    onPrepareEdit = async (item) => {
        this.props.onPrepareEditTratamento(item, this.props.navigation);
    };

    mapData = data => {
        const list = [];

        if(data) {
            Object.keys(data).forEach(key => {
                const tratamento = data[key];

                if(tratamento.status.pendente || tratamento.status.aprovado) {
                    list.push({...tratamento, _id: key})
                }
            });
        }

        return list;
    };

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle={theme.MODE.BARSTYLE} backgroundColor={theme.COLORS.PRIMARY} />

                <Header navigation={this.props.navigation} rota="Menu" statusPage="ColaboradorTratamentos" rotaAdd="ColaboradorCadastrarTratamento" listagem tipo="colaborador" />

                <ScrollView horizontal={false} style={styles.scrollContainer}>
                    <View style={styles.flatlist}>
                        {this.state.tratamentos.length > 0 ?
                            <FlatList data={this.state.tratamentos} renderItem={({ item }) =>
                                <>
                                    <View style={styles.body}>
                                        <Block style={styles.block}>
                                            <Card key={item._id} item={item} horizontal navigation={this.props.navigation} rota="" onDelete={() => this.onDelete(item._id)} onPrepareEdit={() => this.onPrepareEdit(item)} listagem={"tratamento"} tipo="colaborador" />
                                        </Block>
                                    </View>
                                </>
                            } keyExtractor={item => String(item._id)} />
                            : <EmptyList message="Nenhum tratamento adicionado..."/>
                        }
                    </View>
                </ScrollView>

                <FooterToolbar navigation={this.props.navigation} />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    tratamentos: state.tratamentos.tratamentos
});

const mapDispatchToProps = dispatch => ({
    onDeleteTratamento: (_id, cb) => dispatch(actions.deleteTratamento(_id, cb)),
    onPrepareEditTratamento: (item, navigation) => dispatch(actions.prepareEditTratamento(item, navigation)),
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListagemTratamento);
