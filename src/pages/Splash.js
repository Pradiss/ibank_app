import react, { useState, useEffect } from "react"
import { View, Text, Image } from "react-native"
import styles from "../components/Style"
import { ActivityIndicator} from "react-native-paper"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash({ navigation }) {

  useEffect(() => {
   const checkLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.replace('MyTabs');
    } else {
      navigation.replace('Login');
    }
  };

  checkLogin();

    const timer = setTimeout(() => {
      navigation.replace("Create")
    }, 2400)

    return () => clearTimeout(timer)
  }, [])
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
      <ActivityIndicator type={"large"} animating={true} color={"#34E167"}/>
    </View>
  );
}
