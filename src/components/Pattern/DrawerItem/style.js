import {theme} from "../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    defaultStyle: {
        paddingVertical: 15,
        paddingHorizontal: 14,
        color: "white"
    },
    activeStyle: {
        backgroundColor: theme.COLORS.WHITE,
        borderRadius: 5,
        color: "white"
    },
    shadow: {
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.1
    }
});

export default styles;