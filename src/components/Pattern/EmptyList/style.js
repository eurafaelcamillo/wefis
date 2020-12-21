import {theme} from "../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.BASE,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    block: {
        paddingHorizontal: theme.SIZES.BASE,
    },
    body: {
        flex: 1
    },
    card: {
        backgroundColor: theme.COLORS.GREY,
        marginVertical: theme.SIZES.BASE,
        borderWidth: 0,
        minHeight: 50,
        marginBottom: 4,
        paddingHorizontal: theme.SIZES.BASE,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: "#4A4A4A",
        letterSpacing: 1,
        lineHeight: 25.5,
        textAlign: "justify"
    },
    vertical: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    },
    shadow: {
        shadowColor: '#8898AA',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        elevation: 2
    }
});

export default styles;