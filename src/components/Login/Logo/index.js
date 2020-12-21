import React from "react";
import {
    Text,
    View,
} from "react-native";
import styles from './style';

const Logo = (props) => {

    return (
        <View style={styles.logo}>
            <View style={styles.separator} />
            <View style={styles.row}>
                <Text style={styles.texto}>WeFis</Text>
                <View style={styles.linha} />
            </View>
        </View>
    )
};

export default Logo;