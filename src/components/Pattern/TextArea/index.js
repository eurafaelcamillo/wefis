import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './style';

const UselessTextInput = (props) => {
  return (
      <TextInput
          {...props}
          editable
          maxLength={500}
      />
  );
}

const TextArea = ({ placeholder, value, keyboardType, autoCapitalize, formValueChange, form, placeholderTextColor}) => {

  return (
      <View style={styles.container}>
        <UselessTextInput
            style={styles.textarea}
            multiline
            numberOfLines={4}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            onChangeText={(value) => formValueChange(value, form.stateName, form.type)}
        />
      </View>
  );
}

export default TextArea;