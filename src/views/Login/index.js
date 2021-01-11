import React from "react";
import {
    View,
    Text,
    StatusBar,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";

import Logo from "../../components/Login/Logo";
import Footer from "../../components/Login/Footer";
import { getMessageByCode } from '../../utils/function/general';

import Button from "../../components/Pattern/Button";
import Input from "../../components/Pattern/Input";

import {theme} from "../../utils/constants";
import update from 'immutability-helper';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import styles from './style';
import {acesso as initialState} from "../../utils/constants";
import formatterConstant from "../../utils/function/formatterConstant";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = formatterConstant(initialState);
    }

    componentDidMount() {
        this.check();
    };

    check = async ()  => {
        const checkToken =  await this.props.checkToken(this.props.navigation);

        if(checkToken) {
            this.props.navigation.navigate("Menu");
        }
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

    onFormSubmit = () => {

        this.setState(
            update(this.state, {
                request: {
                    $toggle: ['loading'],
                    message: {$set: getMessageByCode("auth/clear")}
                }
            })
        );

        const {email, senha} = this.state.form;

        this.props.onLogin(email, senha, this.cb, this.props.navigation);
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
                <ScrollView>

                <StatusBar barStyle={theme.MODE.BARSTYLE}
                           backgroundColor={theme.COLORS.PRIMARY}
                />


                        <View style={styles.background}>

                            <View style={styles.row}>
                                <Logo/>

                            <View style={styles.cardBody}>
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
    </View>
                        </View>

                            <View style={styles.separator}/>

                            <Footer navigation={this.props.navigation} rota="Cadastro"/>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onLogin: (email, senha, cb, navigation) => dispatch(actions.login(email, senha, cb, navigation)),
    checkToken: (navigation) => dispatch(actions.checkToken(navigation)),
    logout: () => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
