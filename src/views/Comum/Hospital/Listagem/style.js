import {theme} from "../../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.BASE
    },
    block: {
        paddingHorizontal: theme.SIZES.BASE,
    },
    flatlist: {
        paddingBottom: 95,
        paddingTop: 5
    },
    body: {
        flex: 1
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: theme.COLORS.BASE,
        paddingTop: 5,
        paddingBottom: 10,
        maxHeight: '100vh'
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
        alignSelf: "center",
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
