import React from "react";
import {
    ScrollView,
    StyleSheet,
    Dimensions,
} from "react-native";
import Block from '../Block';
import DrawerCustomItem from '../../Pattern/DrawerItem';
import { useSafeArea } from "react-native-safe-area-context";
import styles from './style';
import routes from '../../../navigation/Routes';

const { width } = Dimensions.get("screen");

function CustomDrawerContent({
         drawerPosition,
         navigation,
         profile,
         focused,
         state,
         ...rest
     }) {
    const insets = useSafeArea();
    const screens = [
        "Menu",
        "Perfil",
        "Acesso"
    ];
    return (
        <Block
            style={styles.container}
            forceInset={{ top: "always", horizontal: "never" }}
        >
            <Block style={styles.header}>
                <Block right style={styles.headerIcon}>
                </Block>
            </Block>
            <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    {screens.map((item, index) => {
                        return (
                            <DrawerCustomItem
                                title={item}
                                key={index}
                                navigation={navigation}
                                focused={routes[state.index].name === item}
                            />
                        );
                    })}
                    <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
                        <Block
                            style={{ borderColor: 'white', width: '93%', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 10}}
                        />
                    </Block>
                    <DrawerCustomItem title="Sair" navigation={navigation}/>
                </ScrollView>
            </Block>
        </Block>
    );
}

export default CustomDrawerContent;