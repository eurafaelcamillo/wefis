import {theme} from "../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingHorizontal: 28,
        paddingBottom: theme.SIZES.BASE,
        paddingTop: theme.SIZES.BASE * 3,
        justifyContent: "center"
    },
    headerIcon: {
        marginTop: -20
    }
});

export default styles;