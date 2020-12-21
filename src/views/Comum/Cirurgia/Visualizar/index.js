import React from "react";
import {
    View,
    StatusBar,
    Text,
    ScrollView
} from "react-native";

import Block from "../../../../components/Pattern/Block";
import {theme} from "../../../../utils/constants";
import styles from './style';
import update from "immutability-helper";
import * as actions from "../../../../store/actions";
import {connect} from "react-redux";
import {cadastroCirurgia as initialState} from "../../../../utils/constants";
import Header from "../../../../components/Pattern/Header";
import FooterToolbar from "../../../../components/Pattern/FooterToolbar";
import formatterConstant from "../../../../utils/function/formatterConstant";

class VisualizarCirurgia extends React.Component {
    constructor() {
        super();
        this.state = formatterConstant(initialState);
    }

    componentDidMount() {

        const { _id, nome, descricao, data, status} = this.props.visualizando;

        this.setState(
            update(this.state, {
                form: {
                    _id: {$set: _id},
                    nome: {$set: nome},
                    descricao: {$set: descricao},
                    data: {$set: data},
                    status: {$set: status}
                }
            })
        );
    };

    componentDidUpdate(prevProps, _prevState, _snapshot) {
        if(prevProps.visualizando !== this.props.visualizando) {

            const { _id, nome, descricao, data, status} = this.props.visualizando;

            this.setState(
                update(this.state, {
                    form: {
                        _id: {$set: _id},
                        nome: {$set: nome},
                        descricao: {$set: descricao},
                        data: {$set: data},
                        status: {$set: status}
                    }
                })
            );
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle={theme.MODE.BARSTYLE} backgroundColor={theme.COLORS.PRIMARY} />

                <Header navigation={this.props.navigation} rota="Cirurgias" />

                <ScrollView horizontal={false} style={styles.scrollContainer}>
                    <View style={styles.body}>
                        <Block style={styles.block}>
                            <Text style={styles.text}>{this.state.form.nome}</Text>
                            <Text style={styles.description}>{this.state.form.descricao}</Text>
                        </Block>
                    </View>
                </ScrollView>

                <FooterToolbar navigation={this.props.navigation} />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    visualizando: state.cirurgias.visualizando
});

const mapDispatchToProps = dispatch => ({
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(VisualizarCirurgia);
