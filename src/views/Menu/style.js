import {theme} from "../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.BASE,
        paddingTop: 30
    },
    block: {
        paddingHorizontal: theme.SIZES.BASE
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: theme.COLORS.BASE,
        paddingBottom: 60
    },
    body: {
        flex: 1
    }
});

export default styles;
