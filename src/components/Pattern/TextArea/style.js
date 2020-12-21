import {theme} from "../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        height: 320,
        width: '100%',
        backgroundColor: theme.COLORS.PRIMARY,
        marginTop: 27,
        borderBottomWidth: 1,
        borderColor: theme.COLORS.PRIMARY,
        flexDirection: "row",
        opacity: 1,
        borderRadius: 5,
        padding: 10
    },
    textarea: {
        textAlignVertical: 'top',
        width: '100%',
        fontSize: 14,
        color: theme.COLORS.WHITE,
        letterSpacing: 1,
        lineHeight: 25.5,
        textAlign: "justify"
    }
});

export default styles;