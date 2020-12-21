import React from "react";
import {
    View,
    StatusBar,
    ScrollView
} from "react-native";

import Block from "../../../../components/Pattern/Block";
import Input from "../../../../components/Pattern/Input";
import Button from "../../../../components/Pattern/Button";
import {theme} from "../../../../utils/constants";
import styles from './style';
import update from "immutability-helper";
import * as actions from "../../../../store/actions";
import {connect} from "react-redux";
import {cadastroDepoimento as initialState} from "../../../../utils/constants";
import Header from "../../../../components/Pattern/Header";
import TextArea from "../../../../components/Pattern/TextArea";
import FooterToolbar from "../../../../components/Pattern/FooterToolbar";
import formatterConstant from "../../../../utils/function/formatterConstant";

class CadastrarDepoimento extends React.Component {
    constructor(props) {
        super(props);
        this.state = formatterConstant(initialState);
    }

    componentDidMount() {
        this.props.checkToken(this.props.navigation);
    };

    formValueChange = (value, stateName, type) => {
        const newState = {...this.state};
        let update     = false;
        newState.request.message = formatterConstant(initialState.request.message);

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

    onFormSubmit = async () => {

        this.setState(
            update(this.state, {
                request: {
                    $toggle: ['loading']
                }
            })
        );

        this.props.onCreateDepoimento(this.state.form, this.cb, this.props.navigation);
    };

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

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle={theme.MODE.BARSTYLE} backgroundColor={theme.COLORS.PRIMARY} />

                <Header navigation={this.props.navigation} rota="Depoimentos" />

                <ScrollView horizontal={false} style={styles.scrollContainer}>
                    <View style={styles.body}>
                        <Block style={styles.block}>

                            <Input icon="envelope"
                                   placeholder="Título"
                                   type="text"
                                   styles={{ input: styles.input, iconeInput: styles.iconeInput, labelInput: styles.labelInput}}
                                   placeholderTextColor={theme.COLORS.WHITE}
                                   formValueChange={this.formValueChange}
                                   value={this.state.form.titulo}
                                   form={{
                                       stateName: "titulo",
                                       type: "general"
                                   }}
                            />

                            <TextArea
                                placeholder="Digite..."
                                formValueChange={this.formValueChange}
                                placeholderTextColor={theme.COLORS.WHITE}
                                value={this.state.form.descricao}
                                form={{
                                    stateName: "descricao",
                                    type: "general"
                                }}
                            />

                            <Button name={!this.state.request.loading ? "Salvar" : "Carregando..."}
                                    styles={{ button: styles.button, textButton: styles.textButton}}
                                    disabled={this.state.request.loading}
                                    onButtonPress={this.onFormSubmit}
                            />

                        </Block>
                    </View>
                </ScrollView>

                <FooterToolbar navigation={this.props.navigation} />
            </View>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onCreateDepoimento: (form, cb, navigation) => dispatch(actions.createDepoimento(form, cb, navigation)),
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(CadastrarDepoimento);
