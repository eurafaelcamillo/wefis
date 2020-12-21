import {theme} from "../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    logo: {
        width: 102,
        height: 111,
        alignSelf: "center"
    },
    separator: {
        flex: 1
    },
    row: {
        marginBottom: 6,
        marginLeft: 2,
        marginRight: -8
    },
    texto: {
        color: "rgba(255,255,255,1)",
        fontSize: 35,
        marginBottom: 4
    },
    linha: {
        height: 8,
        backgroundColor: theme.COLORS.SECONDARY,
        marginRight: 11
    }
});

export default styles;