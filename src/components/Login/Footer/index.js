import React from "react";
import {
    TouchableOpacity,
    Text, View,
} from "react-native";
import styles from './style';

const Footer = (props) => {

    return (
        <>
            <View style={styles.separator} />
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate(props.rota)}
                    style={styles.button}
                >
                    <View style={styles.separator} />
                    <Text style={styles.criarConta}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
        </>
    )
};

export default Footer;