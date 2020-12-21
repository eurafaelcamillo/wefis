import React  from "react";
import { StyleSheet, View, StatusBar, Text } from "react-native";
import Header from "../../components/Pattern/Header";
import Svg, { Ellipse } from "react-native-svg";

import FooterToolbar from "../../components/Pattern/FooterToolbar";
import {theme} from "../../utils/constants";

function PrimeirosPassos(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.MODE.BARSTYLE} backgroundColor={theme.COLORS.PRIMARY} />

      <Header navigation={props.navigation} rota="Menu" />

      <View style={styles.body}>
        <View style={styles.ellipseStack}>
          <Svg viewBox="0 0 859.43 890.3" style={styles.ellipse}>
            <Ellipse
              strokeWidth={1}
              fill="rgba(255,255,255,1)"
              cx={430}
              cy={445}
              rx={429}
              ry={445}
            />
          </Svg>

          <View style={styles.containerBody}>
            <View style={styles.row}>

            </View>
          </View>

          <Text style={styles.pageName}>Primeiros Passos</Text>
        </View>
      </View>

      <FooterToolbar navigation={props.navigation}></FooterToolbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE
  },
  ellipseStack: {
    height: 899,
    marginTop: 34,
    marginLeft: -50,
    marginRight: -449
  },
  ellipse: {
    top: 9,
    left: 0,
    width: 859,
    height: 890,
    position: "absolute"
  },
  body: {
    backgroundColor: theme.COLORS.PRIMARY,
    width: 360,
    flex: 1
  },
  containerBody: {
    left: 51,
    height: 409,
    position: "absolute",
    right: 450,
    bottom: 272
  },
  row: {
    height: 165,
    marginTop: 15,
    marginLeft: 41,
    marginRight: 41
  },
  pageName: {
    top: 0,
    left: 85,
    color: theme.COLORS.WHITE,
    position: "absolute",
    fontSize: 24
  }
});

export default PrimeirosPassos;
