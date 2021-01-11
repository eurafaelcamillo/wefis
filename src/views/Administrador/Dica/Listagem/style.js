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
        maxHeight: '100%'
    }
});

export default styles;
