import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import IconFeather from "react-native-vector-icons/Feather";
import Block from "../Block";
import {connect} from "react-redux";
import styles from './style';

function FooterToolbar(props) {
    return (
        <Block row space="between" width={'360px'} style={styles.container}>
            <TouchableWithoutFeedback style={styles.button} onPress={() => props.navigation.navigate('Perfil')}>
                <Block flex center={true}>
                    <IconFeather name="user" style={styles.icon} />
                </Block>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback style={styles.button} onPress={() => props.navigation.navigate('Menu')}>
                <Block flex center={true}>
                    <EntypoIcon name="colours" style={styles.icon} />
                </Block>
            </TouchableWithoutFeedback>

            {props.user.perfil.tipo.comum ?
                <>
                    <TouchableWithoutFeedback style={styles.button} onPress={() => props.navigation.navigate('Depoimentos')}>
                        <Block flex center={true}>
                            <EntypoIcon name="fingerprint" style={styles.icon}/>
                        </Block>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={styles.button} onPress={() => props.navigation.navigate('Evolucoes')}>
                        <Block flex center={true}>
                            <EntypoIcon name="hand" style={styles.icon}/>
                        </Block>
                    </TouchableWithoutFeedback>
                </> : null
            }
        </Block>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FooterToolbar);