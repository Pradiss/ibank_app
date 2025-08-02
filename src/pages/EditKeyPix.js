import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, Alert } from "react-native";
import styles from "../components/Style";
import { apiRegisterKey, apiClient } from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditKeyPix({ navigation }) {
  const [currentKey, setCurrentKey] = useState(""); // chave atual
  const [selectedKey, setSelectedKey] = useState(""); // nova chave selecionada
  const [options, setOptions] = useState({ cpf: "", phone: "" });
  const [idChave, setIdChave] = useState(null);

  const loadData = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const id_chave = await AsyncStorage.getItem("id_chave");
    const id_client = await AsyncStorage.getItem("id_client");

    // Buscar chave atual
    const chaveRes = await apiRegisterKey.get(`/${id_chave}`, {
      headers: {
        "id-bank": "02",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Resposta da chave PIX:", chaveRes.data);

    // proteção caso venha aninhado
    const keyName = chaveRes?.data?.name || chaveRes?.data?.data?.name;
    const keyId = chaveRes?.data?.id_chave || chaveRes?.data?.data?.id_chave;

    setCurrentKey(keyName);
    setIdChave(keyId);

    // Buscar dados do cliente
    const userRes = await apiClient.get(`/${id_client}`, {
      headers: {
        "id-bank": "02",
        Authorization: `Bearer ${token}`,
      },
    });

    setOptions({
      cpf: userRes.data.cpf || "",
      phone: userRes.data.phone || "",
    });
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    Alert.alert("Erro", "Falha ao carregar dados do cliente.");
  }
};


  useEffect(() => {
    loadData();
  }, []);

  const editKey = async () => {
    if (!selectedKey) {
      Alert.alert("Erro", "Selecione uma nova chave para substituir.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const id_client = await AsyncStorage.getItem("id_client");
      const id_chave = await AsyncStorage.getItem("id_chave")

      await apiRegisterKey.put( 
        `/${id_chave}`,
        {
          id_client,
          name: selectedKey,
        },
        {
          headers: {
            "id-bank": "02",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Sucesso", "Chave PIX atualizada!");
      navigation.navigate("MyTabs");
    } catch (e) {
      console.error("Erro ao editar chave:", e);
      Alert.alert("Erro", "Não foi possível atualizar a chave PIX.");
    }
  };

  return (
    <View style={{ padding: 16, flex: 1, justifyContent: "center" }}>
      <View style={{ paddingBottom: 32, flexDirection: "row", alignItems: "center" }}>
        <Image source={require("../images/LogoGreen.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
        <Text style={styles.titleLogo}>iBank</Text>
      </View>

      <Text style={[styles.titleHome, { paddingBottom: 16 }]}>Editar sua chave PIX</Text>

      <Text style={{ marginBottom: 6, color: "#000" }}>Chave atual:</Text>
      <View style={[styles.input, { backgroundColor: "#ccc", marginBottom: 16 }]}>
        <Text style={{ color: "#000" }}>{currentKey || "Carregando..."}</Text>
      </View>

      <Text style={{ marginBottom: 6, color: "#000" }}>Substituir por:</Text>

      {options.cpf ? (
        <Pressable
          onPress={() => setSelectedKey(options.cpf)}
          style={[
            styles.input,
            selectedKey === options.cpf && { borderColor: "#34E167", borderWidth: 2 },
          ]}
        >
          <Text style={{ color: "#000" }}>{options.cpf}</Text>
        </Pressable>
      ) : null}

      {options.phone ? (
        <Pressable
          onPress={() => setSelectedKey(options.phone)}
          style={[
            styles.input,
            selectedKey === options.phone && { borderColor: "#34E167", borderWidth: 2 },
          ]}
        >
          <Text style={{ color: "#000" }}>{options.phone}</Text>
        </Pressable>
      ) : null}

      <Pressable style={styles.buttonLogin} onPress={editKey}>
        <Text style={{ fontSize: 18, color: "#fff" }}>Salvar alteração</Text>
      </Pressable>
    </View>
  );
}
