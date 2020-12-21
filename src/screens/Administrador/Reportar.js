import React from "react";
import {
    StyleSheet,
    View,
    StatusBar, ScrollView,
} from "react-native";

import Button from "../../components/Pattern/Button";
import FooterToolbar from "../../components/Pattern/FooterToolbar";
import Header from "../../components/Pattern/Header";
import { theme } from "../../utils/constants";
import Block from "../../components/Pattern/Block";
import TextArea from "../../components/Pattern/TextArea";

function Reportar(props) {

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.MODE.BARSTYLE} backgroundColor={theme.COLORS.PRIMARY} />

      <Header navigation={props.navigation} rota="" />

      <ScrollView horizontal={false} style={styles.scrollContainer}>
        <View style={styles.body}>
            <Block style={styles.block}>

                <TextArea/>

                <Button name="Salvar" navigation={props.navigation} rota="" />

            </Block>
        </View>
      </ScrollView>

      <FooterToolbar navigation={props.navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.BASE,
        paddingBottom: 60
    },
    block: {
        paddingHorizontal: theme.SIZES.BASE,
        paddingBottom: 50
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: theme.COLORS.BASE,
        paddingTop: 5,
        paddingBottom: 60
    }
});

export default Reportar;
