import React from "react";
import {
    View,
    StatusBar,
    Text,
    Image, ScrollView
} from "react-native";

import Input from "../../components/Pattern/Input";
import Button from "../../components/Pattern/Button";
import Header from "../../components/Pattern/Header";
import FooterToolbar from "../../components/Pattern/FooterToolbar";

import {perfil as initialState} from "../../utils/constants";
import {theme} from "../../utils/constants";
import styles from './style';
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import update from "immutability-helper";
import formatterConstant from "../../utils/function/formatterConstant";
import Block from "../../components/Pattern/Block";

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = formatterConstant(initialState);
    }

    componentDidMount() {
        this.props.checkToken(this.props.navigation);

        const { email, telefone, nome, tipo, status} = this.props.user.perfil;

        this.setState(
            update(this.state, {
                form: {
                    nome: {$set: nome},
                    email: {$set: email},
                    telefone: {$set: telefone},
                    tipo: {$set: tipo},
                    status: {$set: status}
                }
            })
        );
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

        this.props.onEditPerfilUser(this.state.form, this.cb, this.props.navigation);
    };

    cb = (type) => {
        this.setState(
            update(this.state, {
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

                <Header navigation={this.props.navigation} rota="Menu" isDrawer />

                <ScrollView horizontal={false} style={styles.scrollContainer}>
                    <View style={styles.body}>
                        <Block style={styles.block}>
                            <View style={styles.userInfo}>
                                <Image
                                    source={require("../../assets/images/avatar2.png")}
                                    style={styles.avatar}
                                />

                                <View style={styles.description}>
                                    <Text style={styles.userName}>{this.state.form.nome}</Text>
                                </View>
                            </View>

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

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    onEditPerfilUser: (form, cb, navigation) => dispatch(actions.editPerfilUser(form, cb, navigation)),
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
