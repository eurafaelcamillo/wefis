import React from "react";
import {
    View,
    StatusBar,
    FlatList, ScrollView, Text
} from "react-native";

import Block from "../../../../components/Pattern/Block";
import {theme} from "../../../../utils/constants";
import styles from './style';
import * as actions from "../../../../store/actions";
import {connect} from "react-redux";
import {listagemEvolucao as initialState} from "../../../../utils/constants";
import update from "immutability-helper";
import FooterToolbar from "../../../../components/Pattern/FooterToolbar";
import Header from "../../../../components/Pattern/Header";
import EmptyList from "../../../../components/Pattern/EmptyList";

class ListagemEvolucao extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.props.checkToken(this.props.navigation);

        this.setState(
            update(this.state, {
                evolucoes: {$set: this.mapData(this.props.evolucoes)}
            })
        );
    };

    componentDidUpdate(prevProps, _prevState, _snapshot) {
        if(prevProps.evolucoes !== this.props.evolucoes) {
            this.setState(
                update(this.state, {
                    evolucoes: {$set: this.mapData(this.props.evolucoes)}
                })
            );
        }
    }

    mapData = data => {
        const list = [];

        if(data) {
            Object.keys(data).forEach(key => {
                const evolucao = data[key];

                if(evolucao.status.aprovado) {
                    list.push({...evolucao, _id: key})
                }
            });
        }

        return list;
    };

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle={theme.MODE.BARSTYLE} backgroundColor={theme.COLORS.PRIMARY} />

                <Header navigation={this.props.navigation} rota="Menu" statusPage="Evolucoes" rotaAdd="CadastrarEvolucao" listagem tipo="comum" />

                <ScrollView horizontal={false} style={styles.scrollContainer}>
                    <View style={styles.flatlist}>
                        {this.state.evolucoes.length > 0 ?
                            <FlatList data={this.state.evolucoes} renderItem={({item}) =>
                                <>
                                    <View style={styles.body}>
                                        <Block style={styles.block}>
                                                <Text style={styles.text}>{item.data}</Text>
                                                <Text style={styles.description}>{item.descricao}</Text>
                                        </Block>
                                    </View>
                                </>
                            } keyExtractor={item => String(item._id)}/>
                            : <EmptyList message="Nenhuma evolução adicionada..." />
                        }
                    </View>
                </ScrollView>

                <FooterToolbar navigation={this.props.navigation} />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    evolucoes: state.evolucoes.evolucoes
});

const mapDispatchToProps = dispatch => ({
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListagemEvolucao);
