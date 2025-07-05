import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native";
import styles from "../components/Style";

export default function FormRegister({ navigation }) {
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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    cpf: "",
    street: "",
    number: "",
    location: "",
    cep: "",
    city: "",
    state: "",
    country: "",
  });

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

  const nextPass = () => {
    if (step < 4) setStep(step + 1);
  };
  const passBefore = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const confirm = () => {
    console.log("Dados enviado", formData);
    Alert.alert("Formulario enviado com sucesso ");
  };

  const steps = () => {
    switch (step) {
      case 1:
        return (
          <>
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
          </>
        );
        case 2:
          return(
            <>


        </>
      )
    }
  };

  // #34E167 color verder
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ justifyContent: "space-between", flex: 1, alignContent: "center" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Image
              source={require("../images/pig.png")}
              style={{ width: 250, height: 350, paddingTop: 50 }}
              resizeMode="contain"
            />
          </View>

          <View style={styles.backgroundScreenBlack}>

            <SafeAreaView>
              <Text>Formulário Multi-Step</Text>
              <View>{steps()}</View>
              <Pressable style={styles.buttonForm} onPress={Register}>
                <Text style={{ fontSize: 18 }}>Avançar </Text>
              </Pressable>

            </SafeAreaView>
            <View
              style={{ flexDirection: "row", paddingBottom: 50, paddingTop: 12 }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  marginTop: 16,
                  fontWeight: 400,
                }}
              >
                Já tem uma conta?
              </Text>
              <Text
                style={{
                  color: "#34E167",
                  fontSize: 15,
                  marginTop: 16,
                  fontWeight: 400,
                  textDecorationLine: "underline"
                }}
                onPress={() => navigation.navigate("Login")}
              > Login
              </Text>
            </View>

            <Image
              source={require("../images/LogoGreen.png")}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  );
}
