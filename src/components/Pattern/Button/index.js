import React from "react";
import {
    TouchableOpacity,
    Text,
} from "react-native";

const Button = ({ onButtonPress, name, styles}) => {

    return (
        <TouchableOpacity
            onPress={() => onButtonPress()}
            style={styles.button}
        >
            <Text style={styles.textButton}>{name}</Text>
        </TouchableOpacity>
    )
};

export default Button;