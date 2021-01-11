import React from "react";
import {
    View,
    StatusBar,
    ScrollView,
} from "react-native";

import Block from "../../components/Pattern/Block";
import Item from "../../components/Pattern/Menu/Item";
import FooterToolbar from "../../components/Pattern/FooterToolbar";
import {auth as initialState, theme} from "../../utils/constants";
import styles from './style';
import * as actions from "../../store/actions";
import {connect} from "react-redux";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.check();
    };

    check = async ()  => {
        const checkToken = await this.props.checkToken(this.props.navigation);

        if(!checkToken) {
            this.props.navigation.navigate("Acesso");
        }
    };

    render() {
        return (
            <>
                <View style={styles.container}>
                    <StatusBar barStyle={theme.MODE.BARSTYLE} backgroundColor={theme.COLORS.PRIMARY} />

                    <ScrollView horizontal={false} style={styles.scrollContainer}>
                        <View style={styles.body}>
                            <Block style={styles.block}>
                                {this.props.user.perfil.tipo.comum ?
                                    <>
                                        {/*
                                            <Item name="Sobre a Fissura" navigation={this.props.navigation} rota="Sobre" />

                                            <Item name="Tipos de Fissuras" navigation={this.props.navigation} rota="TiposFissuras" />

                                            <Item name="Primeiros Passos" navigation={this.props.navigation} rota="PrimeirosPassos" />
                                         */}

                                        <Item name="Dicas" navigation={this.props.navigation} rota="Dicas" />

                                        <Item name="Tratamentos" navigation={this.props.navigation} rota="Tratamentos" />

                                        <Item name="Cirurgias" navigation={this.props.navigation} rota="Cirurgias" />

                                        <Item name="Depoimentos" navigation={this.props.navigation} rota="Depoimentos" />

                                        <Item name="Centros de Reabilitação" navigation={this.props.navigation} rota="Hospitais" />
                                    </> : null
                                }

                                {this.props.user.perfil.tipo.administrador ?
                                    <>
                                        <Item name="Colaboradores" navigation={this.props.navigation} rota="AdmColaboradores" />

                                        <Item name="Dicas" navigation={this.props.navigation} rota="AdmDicas" />

                                        <Item name="Tratamentos" navigation={this.props.navigation} rota="AdmTratamentos" />

                                        <Item name="Cirurgias" navigation={this.props.navigation} rota="AdmCirurgias" />

                                        <Item name="Depoimentos" navigation={this.props.navigation} rota="AdmDepoimentos" />
                                    </> : null
                                }

                                {this.props.user.perfil.tipo.colaborador ?
                                    <>
                                        <Item name="Dicas" navigation={this.props.navigation} rota="ColaboradorDicas" />

                                        <Item name="Tratamentos" navigation={this.props.navigation} rota="ColaboradorTratamentos" />

                                        <Item name="Cirurgias" navigation={this.props.navigation} rota="ColaboradorCirurgias" />

                                        <Item name="Hospitais" navigation={this.props.navigation} rota="ColaboradorHospitais" />
                                    </> : null
                                }
                            </Block>
                        </View>
                    </ScrollView>

                    <FooterToolbar navigation={this.props.navigation} />
                </View>
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    checkToken: (navigation) => dispatch(actions.checkToken(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
