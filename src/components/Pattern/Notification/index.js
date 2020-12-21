import React, {useRef, useEffect} from 'react';
import {View, Text, Animated} from 'react-native';
import styles from './style';

const Notification = ({ notification }) => {

    const opacity = useRef(new Animated.Value(0)).current;
    const slideInLeft = useRef(new Animated.Value(0)).current;

    const { show, type, text} = notification;
    const title = type === "success" ? "Sucesso!" : "Atenção!";

    if(!show) {
        return null;
    }

    Animated.sequence([
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }),
        Animated.timing(slideInLeft, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }),
        Animated.timing(opacity, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true
        }),
    ]).start();

    return (show ? <>
          <View style={styles.container}>
              <Animated.View
                  style={[
                      styles.fadingContainer,
                      {
                          transform: [
                              {
                                  translateX: slideInLeft.interpolate({
                                      inputRange: [0, 1],
                                      outputRange: [600, 0]
                                  })
                              }
                          ],
                          opacity: opacity
                      }
                  ]}
              >
                  <View style={[styles.notification, styles[type]]}>
                      <View>
                          <Text style={styles.title}>{title}</Text>
                          <Text style={styles.message}>{text}</Text>
                      </View>
                  </View>
              </Animated.View>
          </View>
      </> : <View style={styles.hidden} />)
};

export default Notification;