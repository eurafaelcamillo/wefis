import {theme} from "../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.PRIMARY
    },
    background: {
        flex: 1
    },
    row: {
        marginTop: 130,
        marginLeft: 41,
        marginRight: 41
    },
    cardBody: {
        //height: 330,
        marginTop: 40
    },
    separator: {
        flex: 1,
        marginTop: 20
    },
    button: {
        height: 59,
        backgroundColor: theme.COLORS.SECONDARY,
        opacity: 1,
        borderRadius: 5,
        borderColor: theme.COLORS.SECONDARY,
        borderWidth: 1,
        justifyContent: "center",
        marginTop: 27
    },
    textButton: {
        color: theme.COLORS.WHITE,
        alignSelf: "center"
    },
    input: {
        marginTop: 27,
        height: 59,
        backgroundColor: theme.COLORS.INPUT,
        opacity: 1,
        borderRadius: 5,
        flexDirection: "row"
    },
    iconeInput: {
        color: theme.COLORS.WHITE,
        fontSize: 28,
        width: 33,
        height: 33,
        marginLeft: 15,
        alignSelf: "center"
    },
    labelInput: {
        height: 30,
        color: theme.COLORS.WHITE,
        fontSize: 14,
        flex: 1,
        marginRight: 17,
        marginLeft: 13,
        marginTop: 14
    }
});

export default styles;
