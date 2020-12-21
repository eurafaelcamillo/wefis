import {theme} from "../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    button: {
        width: 302,
        height: 57,
        backgroundColor: theme.COLORS.SECONDARY,
        borderWidth: 1,
        borderColor: theme.COLORS.SECONDARY,
        borderStyle: "solid",
        borderTopRightRadius: 9,
        borderBottomLeftRadius: 9,
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.08,
        shadowRadius: 0,

        alignSelf: "center",
        marginBottom: 20
    },
    text: {
        color: theme.COLORS.WHITE,
        alignSelf: "center",
        fontSize: 15,
        marginTop: 17,
        flexDirection: 'row'
    }
});

export default styles;