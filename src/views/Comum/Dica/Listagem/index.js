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
import Header from "../../../../components/Pattern/Header";
import {getMessageByCode} from "../../../../utils/function/general";
import EmptyList from "../../../../components/Pattern/EmptyList";
import Item from "../../../../components/Pattern/Item";
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

    onPrepareView = async (item) => {
        this.props.onPrepareViewDica(item, this.props.navigation);
    };

    mapData = data => {
        const list = [];

        if(data) {
            Object.keys(data).forEach(key => {
                const dica = data[key];

                if(dica.status.aprovado) {
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

                <Header navigation={this.props.navigation} rota="Menu" statusPage="Dicas" listagem tipo="comum" />

                <ScrollView horizontal={false} style={styles.scrollContainer}>
                    <View style={styles.flatlist}>
                        {this.state.dicas.length > 0 ?
                            <FlatList data={this.state.dicas} renderItem={({item}) =>
                                <>
                                    <View style={styles.body}>
                                        <Block style={styles.block}>
                                            <Item key={item._id}
                                                  name={item.titulo}
                                                  navigation={this.props.navigation}
                                                  rota="VisualizarDica"
                                                  onPrepareView={() => this.onPrepareView(item)}
                                            />
                                        </Block>
                                    </View>
                                </>
                            } keyExtractor={item => String(item._id)}/>
                            : <EmptyList message="Nenhuma dica encontrada..." />
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
    onPrepareViewDica: (item, navigation) => dispatch(actions.prepareViewDica(item, navigation)),
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListagemDica);
