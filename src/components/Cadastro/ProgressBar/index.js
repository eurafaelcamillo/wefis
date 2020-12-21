import React from "react";
import {
    View
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import styles from './style';

const ProgressBar = (props) => {

    return (
        <View style={styles.progressBar}>
            <View style={styles.row}>
                <IoniconsIcon name="md-checkmark-circle" style={styles.icon} />
                <View style={styles.rect4} />
                <EntypoIcon name="time-slot" style={styles.icon3} />
                <View style={styles.rect5} />
            </View>
            <View style={styles.icon2RowFiller} />
                <FontAwesomeIcon
                    name="circle"
                    style={styles.icon4}
                />
        </View>
    )
};

export default ProgressBar;