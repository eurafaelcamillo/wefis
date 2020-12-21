import {theme} from "../../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.BASE
    },
    block: {
        paddingHorizontal: theme.SIZES.BASE,
        borderRadius: 5,
        backgroundColor: theme.COLORS.WHITE, //theme.COLORS.GREY,
        marginBottom: 30,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        paddingTop: 10,
        paddingBottom: 10
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: theme.COLORS.BASE,
        paddingTop: 5,
        paddingBottom: 10,
        maxHeight: '100vh'
    },
    text: {
        alignSelf: "center",
        marginBottom: 10,
        fontWeight: 'bold',
        color: "#4A4A4A",
        lineHeight: 25.5,
        fontStyle: 'italic'
    },
    description: {
        color: "#4A4A4A",
        letterSpacing: 1,
        lineHeight: 25.5,
        textAlign: "justify"
    }
});

export default styles;
