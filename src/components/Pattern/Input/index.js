import React from "react";
import {
    View,
    TextInput,
} from "react-native";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

const Input = ({ icon, placeholder, secureTextEntry, type, value, keyboardType, autoCapitalize, formValueChange, form, styles, placeholderTextColor}) => {

    return (
        <View style={styles.input}>
            <EvilIconsIcon name={icon} style={styles.iconeInput} />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={secureTextEntry}
                style={styles.labelInput}
                type={type}
                value={value}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                onChangeText={(value) => formValueChange(value, form.stateName, form.type)}
            />
        </View>
    )
};

export default Input;