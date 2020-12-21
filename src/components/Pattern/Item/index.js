import React from "react";
import {
    TouchableOpacity,
    Text,
} from "react-native";
import styles from './style';

const Item = (props) => {

    return (
        <TouchableOpacity
            onPress={props.onPrepareView}
            style={styles.button}
        >
            <Text style={styles.text}>{props.name}</Text>
        </TouchableOpacity>
    )
};

export default Item;