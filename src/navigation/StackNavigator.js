import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import routes from './Routes';

const Stack = createStackNavigator();

const StackNavigator = ({route}) => {

    const item = routes.find(el => el.id === route.params.id);

    return (
        <Stack.Navigator initialRouteName={route.name} mode="card" headerMode="screen">
            <Stack.Screen
                name={item.name}
                component={item.screenComponent}
                options={item.options}
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;