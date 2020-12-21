import React from "react";
import {
    View,
    StatusBar,
    Text,
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
import {cadastroDica as initialState} from "../../../../utils/constants";
import Header from "../../../../components/Pattern/Header";
import TextArea from "../../../../components/Pattern/TextArea";
import FooterToolbar from "../../../../components/Pattern/FooterToolbar";
import formatterConstant from "../../../../utils/function/formatterConstant";

class EditarDica extends React.Component {
    constructor() {
        super();
        this.state = formatterConstant(initialState);
    }

    componentDidMount() {

        const { _id, titulo, descricao, data, status} = this.props.editando;

        this.setState(
            update(this.state, {
                form: {
                    _id: {$set: _id},
                    titulo: {$set: titulo},
                    descricao: {$set: descricao},
                    data: {$set: data},
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

        this.props.onEditDica(this.state.form, this.cb, this.props.navigation);
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

                <Header navigation={this.props.navigation} rota="ColaboradorDicas" />

                <ScrollView horizontal={false} style={styles.scrollContainer}>
                    <View style={styles.body}>
                        <Block style={styles.block}>

                            <Input icon="tag"
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

const mapStateToProps = state => ({
    editando: state.dicas.editando
});

const mapDispatchToProps = dispatch => ({
    onEditDica: (form, cb, navigation) => dispatch(actions.editDica(form, cb, navigation)),
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditarDica);
