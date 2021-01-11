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
    cardBody: {
        marginBottom: 15,
        marginTop: 15
    },
    termos: {
        marginTop: 20,
        color: theme.COLORS.WHITE,
        alignSelf: "center"
    },
    title: {
        color: theme.COLORS.WHITE,
        fontSize: 24,
        marginTop: 40,
        alignSelf: "center"
    },
    row: {
        marginTop: 53,
        marginLeft: 41,
        marginRight: 41
    },
    buttonType: {
        color: theme.COLORS.PRIMARY,
        paddingHorizontal: 4,
        paddingVertical: 8,
        backgroundColor: theme.COLORS.BASE,
        opacity: 1,
        borderRadius: 5,
        borderColor: theme.COLORS.BASE,
        borderWidth: 1,
        justifyContent: "center",
        alignSelf: "center"
    },
    buttonActive: {
        color: theme.COLORS.BASE,
        paddingHorizontal: 4,
        paddingVertical: 8,
        backgroundColor: theme.COLORS.SECONDARY,
        opacity: 1,
        borderRadius: 5,
        borderColor: theme.COLORS.SECONDARY,
        borderWidth: 1,
        justifyContent: "center",
        alignSelf: "center"
    },
    button: {
        height: 55,
        opacity: 1,
        borderRadius: 5,
        borderColor: theme.COLORS.WHITE,
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
        marginLeft: 15,
        alignSelf: "center"
    },
    labelInput: {
        color: theme.COLORS.WHITE,
        fontSize: 14,
        flex: 1,
        marginRight: 17,
        marginLeft: 13,
        alignSelf: "center"
    }
});

export default styles;
