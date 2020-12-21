import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Center } from "@builderx/utils";
import {theme} from "../../../../utils/constants";

function Logo(props) {
    return (
        <View style={props.style}>
            <View style={styles.row}>
                <Center horizontal>
                    <Text style={styles.texto}>WF</Text>
                </Center>
                <View style={styles.linha} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    texto: {
        top: 0,
        color: theme.COLORS.WHITE,
        position: "absolute",
        fontSize: 25
    },
    linha: {
        top: 38,
        left: 0,
        backgroundColor: theme.COLORS.SECONDARY,
        position: "absolute",
        right: 0,
        bottom: 6
    },
    row: {
        flex: 1,
        marginBottom: -5
    }
});

export default Logo;