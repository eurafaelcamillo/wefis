import {theme} from "../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    block: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    middle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    left: {
        alignItems: 'flex-start',
    },
    right: {
        alignItems: 'flex-end',
    },
    top: {
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
    },
    bottom: {
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    card: {
        borderRadius: theme.SIZES.CARD_BORDER_RADIUS,
        borderWidth: theme.SIZES.CARD_BORDER_WIDTH,
        borderColor: theme.COLORS.BLOCK,
    },
    shadow: {
        shadowColor: theme.COLORS.BLOCK,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: theme.SIZES.BLOCK_SHADOW_OPACITY,
        shadowRadius: theme.SIZES.BLOCK_SHADOW_RADIUS,
        elevation: theme.SIZES.ANDROID_ELEVATION,
    },
    fluid: {
        width: 'auto',
    }
});

export default styles;