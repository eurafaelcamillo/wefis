import {theme} from "../../utils/constants";
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
        paddingTop: 5
    },
    body: {
        flex: 1
    },
    userInfo: {
        marginTop: 30,
        //marginBottom: 20,
        paddingHorizontal: theme.SIZES.BASE,
        alignSelf: "center",
    },
    avatar: {
        alignSelf: "center",
        width: 100,
        height: 100,
        borderRadius: 50
    },
    description: {
        alignSelf: "center",
        marginTop: 15,
        marginBottom: 15
    },
    userName: {
        color: theme.COLORS.SECONDARY,
        fontSize: 16
    },
    userEmail: {
        color: theme.COLORS.PRIMARY,
        fontSize: 16
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
