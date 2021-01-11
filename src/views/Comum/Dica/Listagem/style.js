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
        paddingBottom: 20,
        paddingTop: 5
    },
    body: {
        flex: 1
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: theme.COLORS.BASE,
        paddingTop: 30,
        paddingBottom: 60,
        maxHeight: '100%'
    }
});

export default styles;
