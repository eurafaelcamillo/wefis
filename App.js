import React from "react";
import { AppLoading } from "expo";
import Screens from './src/navigation/Screens';
import Block from "./src/components/Pattern/Block";
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';

import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

// REDUCERS

import rootReducer from './src/store/reducers';
import NotificationCentral from "./src/components/Pattern/Notification/central";

const composeEnhancers = compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
        fontLoaded: false
    };

    render() {
        console.disableYellowBox = true;

        return(
            <Provider store={store}>
                {!this.state.isLoadingComplete ?
                    <AppLoading
                        startAsync={this._loadResourcesAsync}
                        onError={this._handleLoadingError}
                        onFinish={this._handleFinishLoading}
                    />
                :
                    <NavigationContainer>
                        <Block flex>
                            <NotificationCentral />
                            <Screens/>
                        </Block>
                    </NavigationContainer>

                }
            </Provider>
        );
    }

    _loadResourcesAsync = async () => {

        this.setState({ fontLoaded: true });

        await Promise.all([
            Font.loadAsync({
                "roboto-regular": require("./src/assets/fonts/roboto-regular.ttf")
            })
        ]);
    };

    _handleLoadingError = error => {
        console.warn(error);
    };

    _handleFinishLoading = () => {
        if (this.state.fontLoaded) {
            this.setState({ isLoadingComplete: true });
        }
    };
}
