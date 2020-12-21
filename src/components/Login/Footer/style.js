import {theme} from "../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    footer: {
        height: 14,
        marginBottom: 36,
        marginLeft: 41,
        marginRight: 41
    },
    button: {
        alignSelf: "center"
    },
    separator: {
        flex: 1
    },
    criarConta: {
        color: theme.COLORS.WHITE
    }
});

export default styles;