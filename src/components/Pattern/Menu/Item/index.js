import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import {theme} from "../../../../utils/constants";

const Item = (props) => {

    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate(props.rota)}
            style={styles.button}
        >
            <Text style={styles.textButton}>{props.name}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        width: 302,
        height: 57,
        backgroundColor: theme.COLORS.SECONDARY,
        borderWidth: 0,
        borderRadius: 8,
        alignSelf: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    textButton: {
        color: theme.COLORS.WHITE,
        alignSelf: "center",
        fontSize: 15,
        //marginTop: 17,
        flexDirection: 'row'
    }
});

export default Item;