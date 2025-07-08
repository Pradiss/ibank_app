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
      style={{ flex: 1, backgroundColor: "#232323" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
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
              <Text style={[styles.titleLogo, { color: "white" }]}>iBank</Text>
            </View>

            <Image
              source={require("../images/image1.png")}
              style={{ width: 200, height: 200, paddingBlock: 32 }}
              resizeMode="contain"
            />

            <TextInput
              style={styles.input}
              placeholder="Digite seu E-mail"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Digite sua Senha"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}

            />
            {password.length > 0 && password.length < 6 && (
              <Text style={{ color: "red", marginBottom: 8 }}>
                A senha deve conter no mínimo 6 caracteres
              </Text>
            )}

            <Text
              style={{
                color: "#fff",
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
              style={[styles.buttonLogin, { backgroundColor: "#34E167" }]}
              onPress={() => navigation.navigate("MyTabs")}
            >
              <Text style={{ fontSize: 18, color: "#000" }}> Entrar </Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
