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
import Header from "../../../../components/Pattern/Header";
import EmptyList from "../../../../components/Pattern/EmptyList";
import Item from "../../../../components/Pattern/Item";
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

    onPrepareView = async (item) => {
        this.props.onPrepareViewTratamento(item, this.props.navigation);
    };

    mapData = data => {
        const list = [];

        if(data) {
            Object.keys(data).forEach(key => {
                const tratamento = data[key];

                if(tratamento.status.aprovado) {
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

                <Header navigation={this.props.navigation} rota="Menu" statusPage="Tratamentos" listagem tipo="comum" />

                <ScrollView horizontal={false} style={styles.scrollContainer}>
                    <View style={styles.flatlist}>
                        {this.state.tratamentos.length > 0 ?
                            <FlatList data={this.state.tratamentos} renderItem={({item}) =>
                                <>
                                    <View style={styles.body}>
                                        <Block style={styles.block}>
                                            <Item key={item._id}
                                                  name={item.nome}
                                                  navigation={this.props.navigation}
                                                  rota="VisualizarTratamento"
                                                  onPrepareView={() => this.onPrepareView(item)}
                                            />
                                        </Block>
                                    </View>
                                </>
                            } keyExtractor={item => String(item._id)}/>
                            : <EmptyList message="Nenhum tratamento encontrado..." />
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
    onPrepareViewTratamento: (item, navigation) => dispatch(actions.prepareViewTratamento(item, navigation)),
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListagemTratamento);
