import React, { useRef } from "react";
import {
    View,
    StatusBar,
    Text,
    Animated
} from "react-native";

import styles from './style';

function Initial(props) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideInLeft = useRef(new Animated.Value(0)).current;

    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true
    }).start();

    Animated.timing(slideInLeft, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
    }).start();

    setTimeout(() => {
        props.navigation.navigate("App")
    }, 3200);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="rgba(169, 225, 144, 1)"
            />
            <View style={styles.logoContainer}>
                <Animated.View
                    style={[
                        styles.fadingContainer,
                        {
                            transform: [
                                {
                                    translateY: slideInLeft.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [600, 0]
                                    })
                                }
                            ],
                            opacity: fadeAnim, // Bind opacity to animated value,
                        }
                    ]}
                >
                    <View style={styles.logo}>
                        <View style={styles.formGroupTexto}>
                            <Text style={styles.texto}>WeFis</Text>
                            <View style={styles.tracoTexto}></View>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
}

export default Initial;