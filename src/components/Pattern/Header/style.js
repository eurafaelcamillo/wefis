import {theme} from "../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.PRIMARY,
        height: 80,
        elevation: 15,
        shadowOffset: {
            height: 7,
            width: 1
        },
        shadowColor: theme.COLORS.BLACK,
        shadowOpacity: 0.1,
        shadowRadius: 5
    },
    group: {
        height: 55,
        backgroundColor: theme.COLORS.PRIMARY,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20
    },
    icon: {
        color: theme.COLORS.WHITE,
        fontSize: 25,
        width: 18,
        height: 25,
        marginTop: 9,
        marginLeft: 10,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logoHeader: {
        width: 41,
        height: 44
    },
    iconRow: {
        height: 44,
        flexDirection: "row",
        marginLeft: 10
    },
    button: {
        width: 25,
        height: 25,
        marginRight: 15,
        //marginTop: 15
    },
    iconRight: {
        height: 55,
        color: theme.COLORS.WHITE,
        fontSize: 23
    },
    alignRight: {
        alignItems: "flex-end",
    },
    alignMiddle: {
        alignItems: "center",
    }
});

export default styles;