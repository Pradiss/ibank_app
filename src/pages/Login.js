import react, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "../components/Style";

export default function Login({ navigation }) {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);


  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{flex:1}}>
          <View style={styles.container}>
            <View
              style={{
                paddingBottom: 8,
                flexDirection: "row",
                gap: 0,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../images/LogoGreen.png")}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
              <Text style={styles.titleLogo}>iBank</Text>
            </View>

            <Image
              source={require("../images/pig.png")}
              style={{ width: 200, height: 200, paddingBlock: 32 }}
              resizeMode="contain"
            />

            <TextInput
              style={styles.input}
              placeholder=" Your E-mail"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder=" Your Password"
              value={password}
              onChangeText={setPassword}
            />

            <Text
              style={{
                color: "#000",
                fontSize: 16,
                paddingBottom: 32,
                fontWeight: 400,
                textDecorationLine: "underline",
              }}
              onPress={() => navigation.navigate("ForwardPassword")}
            >
              Esqueceu sua senha?
            </Text>

            <Pressable
              style={styles.buttonLogin}
              onPress={() => navigation.navigate("MyTabs")}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}> Entrar </Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
