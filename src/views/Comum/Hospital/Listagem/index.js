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
import Header from "../../../../components/Pattern/Header";
import EmptyList from "../../../../components/Pattern/EmptyList";
import Card from "../../../../components/Pattern/Card";
import Input from "../../../../components/Pattern/Input";
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

    formValueChange = (value, stateName, type) => {
        const newState = {...this.state};
        let update = false;

        switch (type) {
            case 'general':
                newState.form[stateName] = value;
                update = true;
                break;
            default:
                return null;
        }

        if (update) {
            this.setState(newState);
        }
    };

    mapData = data => {
        const list = [];

        if(data) {
            Object.keys(data).forEach(key => {
                const hospital = data[key];

                if(hospital.status.aprovado) {
                    list.push({...hospital, _id: key})
                }
            });
        }

        return list;
    };

    filter = () => {
        const hospitais = this.state.hospitais;
        const param     = this.state.form.filter;

        if(hospitais.length <= 0) {
            return hospitais;
        }

        if(param !== "") {
            const filter = hospitais.filter(item => item.nome.includes(param) || item.email.includes(param) || item.telefone.includes(param) || item.endereco.includes(param));

            return filter;
        }

        return hospitais;
    };

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle={theme.MODE.BARSTYLE} backgroundColor={theme.COLORS.PRIMARY} />

                <Header navigation={this.props.navigation} rota="Menu" statusPage="Hospitais" listagem tipo="comum" />

                <ScrollView horizontal={false} style={styles.scrollContainer}>
                    <View style={styles.flatlist}>
                        {this.state.hospitais.length > 0 &&
                            <View style={styles.body}>
                                <Block style={styles.block}>
                                    <Input icon="search"
                                           placeholder="Pesquisar..."
                                           type="text"
                                           styles={{
                                               input: styles.input,
                                               iconeInput: styles.iconeInput,
                                               labelInput: styles.labelInput
                                           }}
                                           placeholderTextColor={theme.COLORS.WHITE}
                                           formValueChange={this.formValueChange}
                                           value={this.state.form.filter}
                                           form={{
                                               stateName: "filter",
                                               type: "general"
                                           }}
                                    />
                                </Block>
                            </View>
                        }

                        {this.filter().length > 0 ?
                            <FlatList data={this.filter()} renderItem={({item}) =>
                                    <>
                                        <View style={styles.body}>
                                            <Block style={styles.block}>
                                                <Card key={item._id}
                                                      item={item}
                                                      horizontal
                                                      navigation={this.props.navigation}
                                                      rota=""
                                                      listagem={"hospital"}
                                                      tipo="comum"
                                                />
                                            </Block>
                                        </View>
                                    </>
                                } keyExtractor={item => String(item._id)}/>
                            : <EmptyList message="Nenhum hospital encontrado..." />
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
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListagemHospital);
