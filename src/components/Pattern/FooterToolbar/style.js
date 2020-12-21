import {theme} from "../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme.COLORS.WHITE,
        height: 50,
        width: '100%',
        position: "relative",
        left: 0,
        bottom: 0
    },
    button: {
        flex: 1,
        alignItems: "center",
        borderRadius: 4,
        justifyContent: "center",
        opacity: 1
    },
    icon: {
        backgroundColor: "transparent",
        opacity: 0.8,
        color: theme.COLORS.SECONDARY,
        fontSize: 24
    }
});

export default styles;