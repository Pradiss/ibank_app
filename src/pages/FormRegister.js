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
  ScrollView,
} from "react-native";
import styles from "../components/Style";
import { Button } from "react-native-paper";
import { formatCEP,formatCPF,formatPhone,formatN } from "../mask/mascara";


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
        { ...formData },

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

  const cepChange = async (cepValue) => {
    updateField("cep", cepValue);

    if (cepValue.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cepValue}/json/`
        );
        const data = await response.json();

        if (!data.erro) {
          updateField("street", data.street);
          updateField("location", data.location);
          updateField("city", data.city);
          updateField("state", data.state);
        }
      } catch (erro) {
        console.warn("Erro ao consultar CEP:", erro);
      }
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
              value={formData.name}
              onChangeText={(valor) => updateField("name", valor)}
              placeholder="Digite seu nome"
            />

            <TextInput
              style={styles.input}
              placeholder="Digite seu CPF"
              keyboardType="numeric"
              value={formData.cpf}
              onChangeText={(text) => updateField("cpf", formatCPF(text))}
            />
          </>
        );
      case 2:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => updateField("phone", formatPhone(text))}
            />

            <TextInput
              style={styles.input}
              placeholder="Digite seu CEP"
              keyboardType="numeric"
              value={formData.cep}
              onChangeText={(text) => {
                const masked = formatCEP(text);
                updateField("cep", masked);
              }} // já busca endereço
            />
          </>
        );
      case 3:
        return (
          <>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TextInput
                style={[styles.input, { width: "72%" }]}
                placeholder="Digite sua Rua"
                value={formData.street}
                onChangeText={(text) => updateField("street",text)}
                
              />
              <TextInput
                placeholder="N°"
                value={formData.number}
                onChangeText={(text) => updateField("number", formatN(text))}
                keyboardType="numeric"
                style={[styles.input, { width: "25%" }]}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Digite seu bairro"
              value={formData.location}
              onChangeText={(text)=> updateField("location", text)}
             
            />
          </>
        );
      case 4:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Digite sua Cidade"
              value={formData.city}
              onChangeText={(text)=> updateField("city", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Seu Estado Ex: SP"
              value={formData.state}
              onChangeText={(text)=> updateField("state", text)}
              
            />
          </>
        );
    }
  };

  // #34E167 color verder
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "heigth"}
      style={{ padding: 16, justifyContent: "flex-end", flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <Text style={{ marginBottom: 8 }}>Formulário Multi-Step</Text>

          <View>{steps()}</View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {step > 1 && (
              <Button
                title="Voltar"
                mode="contained"
                onPress={() => setStep((s) => s - 1)}
                style={{ backgroundColor: "#000", width: "30%", padding: 4 }}
              >
                Voltar
              </Button>
            )}
            {step < 4 && (
              <Button
                title="Avançar"
                mode="contained"
                onPress={() => setStep((s) => s + 1)}
                style={{ backgroundColor: "#000", width: "50%", padding: 4 }}
              >
                Avançar
              </Button>
            )}
            {step === 4 && (
              <Button
                title="Enviar"
                mode="contained"
                onPress={Register}
                style={{ width: "50%", padding: 4 }}
              />
            )}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
