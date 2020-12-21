import {theme} from "../../../utils/constants";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 3,
        elevation: 3,
        width: '100%'
    },
    notification: {
        backgroundColor: '#4fd69c',
        paddingVertical: theme.SIZES.BASE,
        paddingHorizontal: '5%',
        marginTop: 16,
        marginLeft: '5.5%',
        marginRight: '5.5%',
        color: '#fff',
        borderRadius: 5,
        borderColor: "transparent",
        borderWidth: 1,
    },
    success: {
        color: '#fff',
        borderColor: '#4fd69c',
        backgroundColor: '#4fd69c'
    },
    error: {
        color: '#fff',
        borderColor: '#fc7c5f',
        backgroundColor: '#fc7c5f'
    },
    title: {
        fontSize: 15.25,
        fontWeight: 'bold',
        color: '#fff',
    },
    message: {
        fontSize: 14,
        color: '#fff',
        marginTop: 20
    },
    fadingContainer: {

    },
    hidden: {
        position: 'relative',
        zIndex: 0,
        elevation: 0,
        width: '0%',
        height: '0%'
    }
});

export default styles;