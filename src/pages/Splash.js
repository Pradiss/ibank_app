import react, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import styles from "../components/Style";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export default function Splash({ navigation }) {



  useEffect(() => {

    const timer = setTimeout(() => {
      navigation.replace("Create");
    }, 2400);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#232323",
      }}
    >

      <Image
        source={require("../images/LogoGreen.png")}
        style={{ width: 40, height: 40 }}
        resizeMode="contain"
      />
      <Text style={[styles.titleLogo, { color: "white" }]}>iBank</Text>
      <ActivityIndicator type={"large"} animating={true} color={"#34E167"} />
    </View>
  );
}
