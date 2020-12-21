import React from 'react';
import {Dimensions} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import routes from './Routes';

import StackNavigator from './StackNavigator';

import Onboarding from '../views/Initial';

import CustomDrawerContent from "../components/Pattern/CustomDrawerContent";
import {theme} from "../utils/constants";
import * as actions from "../store/actions";
import {connect} from "react-redux";
import update from "immutability-helper";

const {width} = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppStack = (props) => {

    const tipo = props.data.auth.user.perfil.tipo;

    return (
        <Drawer.Navigator
            style={{flex: 1}}
            drawerContent={props => <CustomDrawerContent {...props} />}
            mode="card" headerMode="none"
            drawerStyle={{
                backgroundColor: theme.COLORS.SECONDARY,
                width: width * 0.8
            }}
            drawerContentOptions={{
                activeTintcolor: theme.COLORS.WHITE,
                inactiveTintColor: theme.COLORS.WHITE,
                activeBackgroundColor: "transparent",
                itemStyle: {
                    width: width * 0.75,
                    backgroundColor: "transparent",
                    paddingVertical: 16,
                    paddingHorizonal: 12,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                },
                labelStyle: {
                    fontSize: 18,
                    marginLeft: 12,
                    fontWeight: "normal"
                }
            }}
            initialRouteName={"Acesso"}
            routeName={"Acesso"}
        >
            {routes.map(route => {

                if (tipo && tipo.comum) {
                    if (!route.permission.comum) return null;
                }

                if (tipo && tipo.administrador) {
                    if (!route.permission.administrador) return null;
                }

                if (tipo && tipo.colaborador) {
                    if (!route.permission.colaborador) return null;
                }

                return <Drawer.Screen name={route.name}
                                     key={route.name}
                                     component={StackNavigator}
                                     initialParams={ {id: route.id} }
                                     option={{
                                         headerTransparent: true
                                     }}
                />
            })}
        </Drawer.Navigator>
    );
}

class OnboardingStack extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth
        }
    }

    componentDidMount() {
        this.props.checkToken();
    };

    componentDidUpdate(prevProps, _prevState, _snapshot) {
        if (prevProps.auth !== this.props.auth) {
            this.setState(update(this.state, {
                auth: {$set: this.props.auth}
            }));
        }
    }

    render() {
        return (
            <Stack.Navigator mode="card" headerMode="none">
                <Stack.Screen
                    name="Onboarding"
                    component={Onboarding}
                    option={{
                        headerTransparent: true
                    }}
                />
                <Stack.Screen name="App" initialParams={{auth: this.props.auth}}>
                    {props => <AppStack {...props} data={{auth: this.props.auth}} />}
                </Stack.Screen>
            </Stack.Navigator>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    checkToken: () => dispatch(actions.checkToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStack);