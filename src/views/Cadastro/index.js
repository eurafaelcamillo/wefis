import React from "react";
import {
    View,
    StatusBar,
    Text,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";

import Block from "../../components/Pattern/Block";
import Input from "../../components/Pattern/Input";
import Button from "../../components/Pattern/Button";
import ProgressBar from "../../components/Cadastro/ProgressBar";
import {theme} from "../../utils/constants";
import styles from './style';
import update from "immutability-helper";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {cadastro as initialState} from "../../utils/constants";
import formatterConstant from "../../utils/function/formatterConstant";

class Cadastro extends React.Component {
    constructor(props) {
        super(props);
        this.state = formatterConstant(initialState);
    }

    componentDidMount() {
        this.props.checkToken(this.props.navigation);
    };

    chooseTypeUser = (tipo) => {
        const newState = {...this.state};

        if(tipo === "comum") {
            newState.form.tipo.comum = true;
            newState.form.tipo.colaborador = false;
        }

        if(tipo === "colaborador") {
            newState.form.tipo.colaborador = true;
            newState.form.tipo.comum = false;
        }

        this.setState(newState);
    };

    formValueChange = (value, stateName, type) => {
        const newState = {...this.state};
        let update     = false;

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

        this.props.onCreateLoginUser(this.state.form, this.cb, this.props.navigation);
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
            <KeyboardAvoidingView behavior="height"
                                  enabled
                                  style={styles.container}
            >
                <View>
                    <StatusBar barStyle={theme.MODE.BARSTYLE}
                               backgroundColor={theme.COLORS.PRIMARY}
                    />

                    <ScrollView>
                        <View style={styles.background}>
                            <View style={styles.row}>

                                <ProgressBar/>

                                <Text style={styles.title}>Criar uma Conta</Text>

                                <View style={styles.cardBody}>

                                    <Block row space="between">
                                        <Block flex center={true}>
                                            <Text
                                                style={this.state.form.tipo.comum ? styles.buttonActive : styles.buttonType}
                                                size={12}
                                                bold
                                                onPress={() => this.chooseTypeUser('comum')}
                                            >
                                                Usuário Comum
                                            </Text>
                                        </Block>

                                        <Block flex center={true}>
                                            <Text
                                                style={this.state.form.tipo.colaborador ? styles.buttonActive : styles.buttonType}
                                                size={12}
                                                bold
                                                onPress={() => this.chooseTypeUser('colaborador')}
                                            >
                                                Usuário Colaborador
                                            </Text>
                                        </Block>
                                    </Block>

                                    <Input icon="user"
                                           placeholder="Nome"
                                           type="text"
                                           styles={{ input: styles.input, iconeInput: styles.iconeInput, labelInput: styles.labelInput}}
                                           placeholderTextColor={theme.COLORS.WHITE}
                                           formValueChange={this.formValueChange}
                                           value={this.state.form.nome}
                                           form={{
                                               stateName: "nome",
                                               type: "general"
                                           }}
                                    />

                                    <Input icon="tag"
                                           placeholder="Telefone"
                                           type="text"
                                           styles={{ input: styles.input, iconeInput: styles.iconeInput, labelInput: styles.labelInput}}
                                           placeholderTextColor={theme.COLORS.WHITE}
                                           formValueChange={this.formValueChange}
                                           value={this.state.form.telefone}
                                           form={{
                                               stateName: "telefone",
                                               type: "general"
                                           }}
                                    />

                                    <Input icon="envelope"
                                           placeholder="E-mail"
                                           type="text"
                                           styles={{ input: styles.input, iconeInput: styles.iconeInput, labelInput: styles.labelInput}}
                                           placeholderTextColor={theme.COLORS.WHITE}
                                           formValueChange={this.formValueChange}
                                           value={this.state.form.email}
                                           form={{
                                               stateName: "email",
                                               type: "general"
                                           }}
                                           keyboardType="email-address"
                                           autoCapitalize="none"
                                    />

                                    <Input icon="lock"
                                           placeholder="Senha"
                                           type="text"
                                           styles={{ input: styles.input, iconeInput: styles.iconeInput, labelInput: styles.labelInput}}
                                           placeholderTextColor={theme.COLORS.WHITE}
                                           formValueChange={this.formValueChange}
                                           value={this.state.form.senha}
                                           stateName="senha"
                                           form={{
                                               stateName: "senha",
                                               type: "general"
                                           }}
                                           secureTextEntry
                                    />

                                    <Button name={!this.state.request.loading ? "Confirmar" : "Carregando..."}
                                            styles={{ button: styles.button, textButton: styles.textButton}}
                                            disabled={this.state.request.loading}
                                            onButtonPress={this.onFormSubmit}
                                    />

                                    <Text style={styles.termos}>Termos &amp; Condições</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onCreateLoginUser: (form, cb, navigation) => dispatch(actions.createLoginUser(form, cb, navigation)),
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);
