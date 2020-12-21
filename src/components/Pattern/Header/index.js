import React from "react";
import { View, TouchableOpacity } from "react-native";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import Logo from "./Logo";
import EntypoIcon from "react-native-vector-icons/Entypo";
import styles from './style';

function Header(props) {
    return (
        <View style={styles.container}>
            <View style={styles.group}>
                <View style={styles.iconRow}>
                    <TouchableOpacity
                        onPress={() => props.isDrawer ? props.navigation.openDrawer() : props.navigation.navigate(props.rota)}
                    >
                        <MaterialIconsIcon name={props.isDrawer ? "dehaze" :"arrow-back"} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.alignMiddle}>
                    <Logo style={styles.logoHeader} />
                </View>

                <View style={styles.alignRight}>
                    <TouchableOpacity
                        onPress={() => props.statusPage === "Depoimentos" || props.statusPage === "Evolucoes" || (props.listagem && props.tipo && props.tipo !== "administrador" && props.tipo !== "comum") ? props.navigation.navigate(props.rotaAdd) : {}}
                        style={styles.button}
                    >
                        <EntypoIcon
                            name={props.statusPage === "Depoimentos" ? "fingerprint" : (props.statusPage === "Evolucoes" || (props.listagem && props.tipo && props.tipo !== "administrador" && props.tipo !== "comum")) ? "circle-with-plus" : "dots-three-vertical"}
                            style={styles.iconRight}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Header;