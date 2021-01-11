import {theme} from "../../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.BASE
    },
    block: {
        paddingHorizontal: theme.SIZES.BASE,
        paddingBottom: 50
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: theme.COLORS.BASE,
        paddingTop: 5,
        paddingBottom: 60
    },
    button: {
        height: 55,
        backgroundColor: theme.COLORS.PRIMARY,
        opacity: 1,
        borderRadius: 5,
        borderColor: theme.COLORS.PRIMARY,
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
        backgroundColor: theme.COLORS.PRIMARY,
        opacity: 1,
        borderRadius: 5,
        flexDirection: "row"
    },
    iconeInput: {
        color: theme.COLORS.WHITE,
        fontSize: 28,
        width: 33,
        marginLeft: 15,
        alignSelf: "center",
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
