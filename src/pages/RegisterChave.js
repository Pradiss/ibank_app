import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, Alert } from "react-native";
import styles from "../components/Style";
import { apiRegisterKey } from "../Services/Api";
import { apiClient } from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterChave({ navigation }) {
  const [selectedKey, setSelectedKey] = useState(null);
  const [options, setOptions] = useState({
    email: "",
    cpf: "",
    phone: ""
  });

const LoadingUsers = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id_client");

    const response = await apiClient.get(`/${id}`, {
      headers: {
        "id-bank": "02",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    // Ajuste os nomes conforme os campos reais da sua API
    setOptions({
      email: data.email || "",
      cpf: data.cpf || "",
      phone: data.phone || "",
    });
  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
    Alert.alert("Erro ao carregar usuário", error.message || "Erro desconhecido");
  }
};


  useEffect(() => {
    LoadingUsers();
  }, []);

  const registerkey = async () => {
    if (!selectedKey) {
      Alert.alert("Erro", "Selecione uma chave para cadastrar.");
      return;
    }

    try {
      const id_client = await AsyncStorage.getItem("id_client");
      const token = await AsyncStorage.getItem("token");

      await apiRegisterKey.post(
        `/`,
        {
          id_client,
          name: selectedKey, // a chave selecionada
        },
        {
          headers: {
            "id-bank": "02",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigation.navigate("MyTabs");
    } catch (e) {
      Alert.alert("ERRO ao Cadastrar a chave pix", e.message);
    }
  };

  return (
    <View style={{padding: 16 , flex: 1, justifyContent: "center"}}>
      <View style={{ paddingBottom: 32, flexDirection: "row", alignItems: "center" }}>
        <Image source={require("../images/LogoGreen.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
        <Text style={styles.titleLogo}>iBank</Text>
      </View>

      <Text style={[styles.titleHome,{paddingBottom:16}]}>Escolha uma chave PIX para cadastrar</Text>
     <Text style={{marginBottom: 8}}> Usar E-mail:</Text>
      {options.email && (
        <Pressable onPress={() => setSelectedKey(options.email)} style={[styles.input, selectedKey === options.email && { borderColor: "#34E167", borderWidth: 2 }]}>
          <Text style={{ color: "#000" }}>{options.email}</Text>
        </Pressable>
      )}
         <Text style={{marginBottom: 8}}> Usar CPF:</Text>
      {options.cpf && (
        <Pressable onPress={() => setSelectedKey(options.cpf)} style={[styles.input, selectedKey === options.cpf && { borderColor: "#34E167", borderWidth: 2 }]}>
          <Text style={{ color: "#000" }}>{options.cpf}</Text>
        </Pressable>
      )}
        <Text style={{marginBottom: 8}}> Usar Telefone:</Text>
      {options.phone && (
        
        <Pressable onPress={() => setSelectedKey(options.phone)} style={[styles.input, selectedKey === options.phone && { borderColor: "#34E167", borderWidth: 2 }]}>
          <Text style={{ color: "#000" }}>{options.phone}</Text>
        </Pressable>
      )}

      <Pressable style={styles.buttonLogin} onPress={registerkey}>
        <Text style={{ fontSize: 18, color: "#fff" }}>Cadastrar Chave PIX</Text>
      </Pressable>
    </View>
  );
}
