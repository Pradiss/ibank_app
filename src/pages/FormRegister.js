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
  Alert,
  TouchableOpacity,
} from "react-native";
import styles from "../components/Style";
import { Button } from "react-native-paper";

import { formatCEP, formatCPF, formatPhone, formatN, isEmailValid, formatUF } from "../mask/mascara";
import { apiClient } from "../Services/Api";

export default function FormRegister({ navigation }) {
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
      
     
    } catch (error) {
      Alert.alert("Erro ao criar um Usuario", error);
    }
  };

  const cepChange = async (cepValue) => {
    updateField("cep", cepValue);

    const rawCep = cepValue.replace(/\D/g, ""); // remove máscara

    if (rawCep.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${rawCep}/json/`
        )
        const data = await response.json();

        if (!data.erro) {
          updateField("street", data.logradouro)
          updateField("location", data.bairro)
          updateField("city", data.localidade)
          updateField("state", data.uf)
        }
      } catch (erro) {
        console.warn("Erro ao consultar CEP:", erro)
      }
    }
  }

const handleNextStep = () => {
  switch (step) {
    case 1:
      if (!formData.name.trim() || !formData.cpf.trim()) {
        Alert.alert("Campos obrigatórios", "Preencha o nome e o CPF.");
        return;
      }
      break;
    case 2:
      if (!formData.phone.trim() || !formData.cep.trim()) {
        Alert.alert("Campos obrigatórios", "Preencha o telefone e o CEP.");
        return;
      }
      break;
    case 3:
      if (!formData.street.trim() || !formData.number.trim() || !formData.location.trim()) {
        Alert.alert("Campos obrigatórios", "Preencha a rua, número e bairro.");
        return;
      }
      break;
    case 4:
      if (!formData.city.trim() || !formData.state.trim() || !formData.country.trim()) {
        Alert.alert("Campos obrigatórios", "Preencha cidade, estado e país.");
        return;
      }
      break;
    case 5:
      if (!formData.email.trim() || !formData.password.trim()) {
        Alert.alert("Campos obrigatórios", "Preencha e-mail e senha.");
        return;
      }
      if (!isEmailValid(formData.email)) {
        Alert.alert("E-mail inválido", "Digite um e-mail válido.");
        return;
      }
      if (formData.password.length < 6) {
        Alert.alert("Senha fraca", "A senha deve ter pelo menos 6 caracteres.");
        return;
      }
      break;
  }

  setStep((s) => s + 1); // avançar para a próxima etapa se passou na validação
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
              placeholderTextColor="#888"
            />

            <TextInput
              style={styles.input}
              placeholder="Digite seu CPF"
              placeholderTextColor="#888"
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
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => updateField("phone", formatPhone(text))}
            />

            <TextInput
              style={styles.input}
              placeholder="Digite seu CEP"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={formData.cep}
              onChangeText={(text) => {
                const masked = formatCEP(text);
                cepChange(masked);
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
                placeholderTextColor="#888"
                value={formData.street}
                onChangeText={(text) => updateField("street", text)}
              />
              <TextInput
                placeholder="N°"
                placeholderTextColor="#888"
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
              onChangeText={(text) => updateField("location", text)}
            />
          </>
        );
      case 4:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Digite sua Cidade"
              placeholderTextColor="#888"
              value={formData.city}
              onChangeText={(text) => updateField("city", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Seu Estado Ex: SP"
              placeholderTextColor="#888"
              value={formData.state}
              maxLength={2}
              onChangeText={(text) => updateField("state", formatUF(text))}
            />
            <TextInput
              style={styles.input}
              placeholder="País"
              placeholderTextColor="#888"
              value={formData.country}
              onChangeText={(text) => updateField("country", text)}
            />
          </>
        );
      case 5:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Seu E-mail"
              placeholderTextColor="#888"
              value={formData.email}
              onChangeText={(text) => updateField("email", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#888"
              value={formData.password}
              secureTextEntry
              onChangeText={(text) => updateField("password", text)}
            />
            {formData.password.length > 0 && formData.password.length < 6 && (
              <Text style={{ color: "red", marginBottom: 8 }}>
                A senha deve conter no mínimo 6 caracteres
              </Text>
            )}
          </>
        );
      case 6:
        return (
          <>
            <View style={{ paddingBlock: 8, paddingBottom:12}}>

              <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 12, fontSize: 24 , }}>
                Confirme seus dados:
              </Text>
              <Text style={styles.textRegister}>
                Nome: <Text style={{ color: '#34E167', fontWeight:400,  }}>{formData.name}</Text>
              </Text>
              <Text style={styles.textRegister}>
                Cpf: <Text style={{ color: '#34E167', fontWeight:400,  }}>{formData.cpf}</Text>
              </Text>
              <Text style={styles.textRegister}>
                Telefone: <Text style={{ color: '#34E167', fontWeight:400,  }}>{formData.phone}</Text>
              </Text>
              <Text style={styles.textRegister}>
                CEP: <Text style={{ color: '#34E167', fontWeight:400,  }}>{formData.cep}</Text>
              </Text>
              <Text style={styles.textRegister}>
                Rua: <Text style={{ color: '#34E167', fontWeight:400,  }}>{formData.street}, Nº {formData.number}</Text>
              </Text>
              <Text style={styles.textRegister}>
                Bairro: <Text style={{ color: '#34E167', fontWeight:400,  }}>{formData.location}</Text>
              </Text>
              <Text style={styles.textRegister}>
                Cidade: <Text style={{ color: '#34E167', fontWeight:400,  }}> {formData.city} - {formData.state}</Text>
              </Text>
              <Text style={styles.textRegister}>
                País: <Text style={{ color: '#34E167', fontWeight:400,  }}> {formData.country}</Text>
              </Text>
              <Text style={styles.textRegister}>
                E-mail: <Text style={{ color: '#34E167', fontWeight:400,  }}> {formData.email}</Text>
              </Text>

             
            </View>
          </>
        );
      default:
        return null;
    }
  };

  // #34E167 color verder
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ padding: 16, justifyContent: "flex-end", flex: 1, backgroundColor: "#232323" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <Image
            source={require("../images/image1.png")}
            style={{ width: 350, height: 150, marginBlock: 32 }}
            resizeMode="contain"
          />
          <Text style={{ marginBottom: 16, color: "white",fontSize:20 }}>Abra sua conta e envie Pix em segundos.</Text>
          <View
            style={{
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              marginBottom: 18,
            }}
          />
          <View>{steps()}</View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {step > 1 && (
              <Button
                mode="contained"
                onPress={() => setStep((s) => s - 1)}
                style={{ backgroundColor: "trasnparent", width: "30%", padding: 4, }}
                labelStyle={{ color: "#fff", textDecorationLine: "underline" }}
              >
                Voltar
              </Button>
            )}
            {step < 6 && (
              <Button
                mode="contained"
                onPress={handleNextStep}
                style={{ backgroundColor: "#34E167", width: "50%", padding: 4, }}
                labelStyle={{ color: "#000" }}
              >
                Avançar
              </Button>
            )}
            {step === 6 && (
              <Button
                mode="contained"
                onPress={Register}
                disabled={!isEmailValid(formData.email) || formData.password.length < 6}

                style={{ width: "50%", padding: 4, backgroundColor: "#34E167", }}
                labelStyle={{ color: "#000" }}
              >
                Enviar
              </Button>
            )}


          </View>
          <View style={{ flexDirection: "row", paddingTop: 8, alignItems: "center", justifyContent: "center", }}>
            <Text style={{ fontSize: 14, color: "#fff", marginTop: 16, fontWeight: 400 }}>
              Já tem uma conta?
            </Text>
            <Text
              style={{
                color: "#34E167",
                fontSize: 15,
                marginTop: 16,
                fontWeight: 500,
                textDecorationLine: "underline",
              }}
              onPress={() => navigation.navigate("Login")}
            > Login
            </Text>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginBlock: 12 }}>
            <Image
              source={require("../images/LogoGreen.png")}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />

          </View>

        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
