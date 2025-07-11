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
  Alert,
} from "react-native";
import styles from "../components/Style";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiLogin } from "../Services/Api";

export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const Logar = async () => {
    if (!email && !password) {
      Alert.alert("Campos obrigatórios", "Preencha e-mail e senha.");
      return;
    }

    try {

      const res = await apiLogin.post(
       "/",
        { email, password },
        { headers: { 'id-bank': '02', 'Content-Type': 'application/json' } }
      )

      const token = res.data.token

      const id = res.data.id_client

      await AsyncStorage.setItem("token", token)
      await AsyncStorage.setItem("id_client", id.toString())



      navigation.reset({
        index: 0,
        routes: [{ name: "MyTabs" }],
      });

    } catch (e) {

      Alert.alert("Erro ao logar", e.message)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#232323" }}
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
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
            returnKeyType="next"
          />

          <TextInput
            style={styles.input}
            placeholder="Digite sua Senha"
            placeholderTextColor="#888"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            onSubmitEditing={Logar}

          />
          {password.length > 0 && password.length < 6 && (
            <Text style={{ color: "#34E167", marginBottom: 8 }}>
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
            onPress={Logar}
          >
            <Text style={{ fontSize: 18, color: "#000" }}> Entrar </Text>
          </Pressable>
          <View style={{ flexDirection: "row", paddingTop: 8, alignItems: "center", justifyContent: "center", }}>
            <Text style={{ fontSize: 14, color: "#fff", marginTop: 16, fontWeight: 400 }}>
              Não tem uma conta?
            </Text>
            <Text
              style={{
                color: "#34E167",
                fontSize: 15,
                marginTop: 16,
                fontWeight: 500,
                textDecorationLine: "underline",
              }}
              onPress={() => navigation.navigate("Create")}
            > Cadastrar-se
            </Text>
          </View>
        </View>

      </ScrollView>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
}
