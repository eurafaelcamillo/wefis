import {theme} from "../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    row: {
        height: 40,
        flexDirection: "row"
    },
    icon: {
        color: theme.COLORS.SECONDARY,
        fontSize: 40,
        width: 33,
        height: 40
    },
    rect4: {
        width: 50,
        height: 7,
        backgroundColor: theme.COLORS.SECONDARY,
        borderRadius: 40,
        marginLeft: 6,
        marginTop: 16
    },
    icon3: {
        color: theme.COLORS.SECONDARY,
        fontSize: 35,
        width: 40,
        height: 36,
        marginLeft: 4,
        marginTop: 4
    },
    rect5: {
        width: 50,
        height: 7,
        backgroundColor: theme.COLORS.WHITE,
        opacity: 0.75,
        borderRadius: 40,
        marginTop: 16
    },
    icon2RowFiller: {
        flex: 1,
        flexDirection: "row"
    },
    icon4: {
        color: theme.COLORS.WHITE,
        fontSize: 40,
        width: 34,
        height: 40,
        opacity: 0.75
    },
    progressBar: {
        height: 40,
        flexDirection: "row",
        marginLeft: 28,
        marginRight: 28
    }
});

export default styles;