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
import {listagemHospital as initialState} from "../../../../utils/constants";
import update from "immutability-helper";
import FooterToolbar from "../../../../components/Pattern/FooterToolbar";
import Card from "../../../../components/Pattern/Card";
import Header from "../../../../components/Pattern/Header";
import EmptyList from "../../../../components/Pattern/EmptyList";
import formatterConstant from "../../../../utils/function/formatterConstant";

class ListagemHospital extends React.Component {
    constructor(props) {
        super(props);
        this.state = formatterConstant(initialState);
    }

    componentDidMount() {
        this.props.checkToken(this.props.navigation);

        this.setState(
            update(this.state, {
                hospitais: {$set: this.mapData(this.props.hospitais)}
            })
        );
    };

    componentDidUpdate(prevProps, _prevState, _snapshot) {
        if(prevProps.hospitais !== this.props.hospitais) {
            this.setState(
                update(this.state, {
                    hospitais: {$set: this.mapData(this.props.hospitais)}
                })
            );
        }
    }

    cb = (type) => {
        this.setState(
            update(this.state, {
                form: { $set: type === "success" ? formatterConstant(initialState.form) : this.state.form},
                request: {
                    $toggle: ['loading']
                }
            })
        );
    };

    onDelete = async (_id) => {
        this.props.onDeleteHospital(_id, this.cb);
    };

    onPrepareEdit = async (item) => {
        this.props.onPrepareEditHospital(item, this.props.navigation);
    };

    mapData = data => {
        const list = [];

        if(data) {
            Object.keys(data).forEach(key => {
                const hospital = data[key];

                if(hospital.status.pendente || hospital.status.aprovado) {
                    list.push({...hospital, _id: key})
                }
            });
        }

        return list;
    };

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle={theme.MODE.BARSTYLE} backgroundColor={theme.COLORS.PRIMARY} />

                <Header navigation={this.props.navigation} rota="Menu" statusPage="ColaboradorHospitais" rotaAdd="ColaboradorCadastrarHospital" listagem tipo="colaborador" />

                <ScrollView horizontal={false} style={styles.scrollContainer}>
                    <View style={styles.flatlist}>
                        {this.state.hospitais.length > 0 ?
                            <FlatList data={this.state.hospitais} renderItem={({ item }) =>
                                <>
                                    <View style={styles.body}>
                                        <Block style={styles.block}>
                                            <Card key={item._id} item={item} horizontal navigation={this.props.navigation} rota="" onDelete={() => this.onDelete(item._id)} onPrepareEdit={() => this.onPrepareEdit(item)} listagem={"hospital"} tipo="colaborador" />
                                        </Block>
                                    </View>
                                </>
                            } keyExtractor={item => String(item._id)} />
                            : <EmptyList message="Nenhum hospital adicionado..."/>
                        }
                    </View>
                </ScrollView>

                <FooterToolbar navigation={this.props.navigation} />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    hospitais: state.hospitais.hospitais
});

const mapDispatchToProps = dispatch => ({
    onDeleteHospital: (_id, cb) => dispatch(actions.deleteHospital(_id, cb)),
    onPrepareEditHospital: (item, navigation) => dispatch(actions.prepareEditHospital(item, navigation)),
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListagemHospital);
