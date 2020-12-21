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
import Header from "../../../../components/Pattern/Header";
import EmptyList from "../../../../components/Pattern/EmptyList";
import Item from "../../../../components/Pattern/Item";
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

    onPrepareView = async (item) => {
        this.props.onPrepareViewCirurgia(item, this.props.navigation);
    };

    mapData = data => {
        const list = [];

        if(data) {
            Object.keys(data).forEach(key => {
                const cirurgia = data[key];

                if(cirurgia.status.aprovado) {
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

                <Header navigation={this.props.navigation} rota="Menu" statusPage="Cirurgias" listagem tipo="comum" />

                <ScrollView horizontal={false} style={styles.scrollContainer}>
                    <View style={styles.flatlist}>
                        {this.state.cirurgias.length > 0 ?
                            <FlatList data={this.state.cirurgias} renderItem={({item}) =>
                                <>
                                    <View style={styles.body}>
                                        <Block style={styles.block}>
                                            <Item key={item._id}
                                                  name={item.nome}
                                                  navigation={this.props.navigation}
                                                  rota="VisualizarCirurgia"
                                                  onPrepareView={() => this.onPrepareView(item)}
                                            />
                                        </Block>
                                    </View>
                                </>
                            } keyExtractor={item => String(item._id)}/>
                            : <EmptyList message="Nenhuma cirurgia encontrada..." />
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
    onPrepareViewCirurgia: (item, navigation) => dispatch(actions.prepareViewCirurgia(item, navigation)),
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListagemCirurgia);
