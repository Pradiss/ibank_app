import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "../components/Style";
import { apiClient } from "../Services/Api";

export default function Register({ navigation }) {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [name, setName] = useState([]);
  const [phone, setPhone] = useState([]);
  const [cpf, setCpf] = useState([]);
  const [street, setStreet] = useState([]);
  const [number, setNumber] = useState([]);
  const [location, setLocation] = useState([]);
  const [cep, setCep] = useState([]);
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [country, setCountry] = useState([]);

  const Register = async () => {
    try {
      const response = await apiClient.post(
        "/",
        {
          name,
          email,
          password,
          phone,
          cpf,
          street,
          number,
          location,
          cep,
          city,
          state,
          country,
        },

        {
          headers: {
            "id-bank": "2",
          },
        }
      );
      navigation.navigate("Login");

      navigation.reset({
        index: 0,
        routes: [{ name: "MyTabs" }],
      });
    } catch (error) {
      Alert.alert("Erro ao criar um Usuario", error);
    }
  };

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    if (cleaned.length <= 10) {
      return cleaned
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return cleaned
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 70 }}>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                paddingBottom: 26,
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

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
            />

            <TextInput
              style={styles.input}
              placeholder="Seu E-mail"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              secureTextEntry //esconde a senha enquanto escreve
              onChangeText={setPassword}
            />

            <View
              style={{ flexDirection: "row", gap: 16, paddingHorizontal: 6 }}
            >
               <TextInput
                
                value={cpf}
                placeholder="Digite seu cpf"
                onChangeText={setCpf}
                style={styles.input}
              /> 

              <TextInput
                style={[styles.input, { width: "50%" }]}
                placeholder="Telefone"
                value={phone}
                onChangeText={(text) => setPhone(formatPhone(text))}
                keyboardType="phone-pad"
              />
            </View>

            <View
              style={{ flexDirection: "row", paddingHorizontal: 6, gap: 16 }}
            >
              <TextInput
                style={[styles.input, { width: "60%" }]}
                placeholder="Nome da Rua "
                value={street}
                onChangeText={setStreet}
              />
              {/* <TextInputMask
                placeholder="CEP"
                type={"zip-code"}
                value={cep}
                onChangeText={setCep}
                style={[styles.input, { width: "40%" }]}
              /> */}
            </View>

            <View
              style={{ flexDirection: "row", paddingHorizontal: 6, gap: 16 }}
            >
              <TextInput
                style={[styles.input, { width: "70%" }]}
                placeholder="Bairro"
                value={location}
                onChangeText={setLocation}
              />
              {/* <TextInputMask
                type={"custom"}
                placeholder="N°"
                options={{
                  mask: "99999",
                }}
                value={number}
                onChangeText={setNumber}
                keyboardType="numeric"
                style={[styles.input, { width: "30%" }]}
              /> */}
            </View>

            <View
              style={{ flexDirection: "row", paddingHorizontal: 6, gap: 16 }}
            >
              <TextInput
                style={[styles.input, { width: "70%" }]}
                placeholder="Cidade"
                value={city}
                onChangeText={setCity}
              />
              <TextInput
                style={[styles.input, { width: "30%" }]}
                placeholder="Estado "
                value={state}
                onChangeText={(text) =>
                  setState(text.replace(/[^a-zA-Z]/g, "").toUpperCase(0, 2))
                }
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Seu país"
              value={country}
              onChangeText={setCountry}
            />

            <Pressable style={styles.buttonLogin} onPress={Register}>
              <Text style={{ fontSize: 18, color: "#fff" }}>Cadastrar </Text>
            </Pressable>

            <View style={{ flexDirection: "row", paddingTop: 8 }}>
              <Text style={{ fontSize: 14, marginTop: 16, fontWeight: 400 }}>
                Já tem uma conta?
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 15,
                  marginTop: 16,
                  fontWeight: 500,
                  textDecorationLine: "underline",
                }}
                onPress={() => navigation.navigate("Login")}
              >
                {" "}
                Login
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
