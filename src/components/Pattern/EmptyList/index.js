import React from "react";
import {
    Text, View
} from "react-native";
import Block from "../Block";
import styles from './style';
import {theme} from "../../../utils/constants";

const EmptyList = ({message}) => {

    const cardContainer = [styles.card, styles.shadow];

    return (
        <View style={styles.body}>
            <Block style={styles.block}>
                <Block row={styles.vertical} card flex style={cardContainer}>
                    <Text
                        style={styles.title}
                        size={12}
                        color={theme.COLORS.BLACK}
                    >
                        {message}
                    </Text>
                </Block>
            </Block>
        </View>
    )
};

export default EmptyList;