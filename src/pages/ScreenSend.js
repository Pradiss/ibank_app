import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "../components/Style";
import { apiClient, apiTransacao } from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { CardContacts } from "../components/CardContacts";
import { Button } from "react-native-paper";

export default function ScreenSend({ navigation }) {
  const [chave_pix, setChavePix] = useState("");
  const [users, setUsers] = useState([]);
  const [transacao, setTransacao] = useState([]);
  const [valor, setValor] = useState("");
  const [step, setStep] = useState(1);

  const isFocused = useIsFocused();

  const LoadingUsers = async () => {
    try {
      const id_client = await AsyncStorage.getItem("id_client");
      const token = await AsyncStorage.getItem("token");
      const res = await apiClient.get(`/${id_client}`, {
        headers: {
          "id-bank": "02",
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (e) {
      Alert.alert("Erro ao carregar usuários", e.message);
    }
  };
  const LoadingTransacao = async () => {
    try {
      const id_client = await AsyncStorage.getItem("id_client");
      const token = await AsyncStorage.getItem("token");
      const res = await apiTransacao.get(`/${id_client}`, {
        headers: {
          "id-bank": "02",
          Authorization: `Bearer ${token}`,
        },
      });
      setTransacao(res.data);
    } catch (e) {
      Alert.alert("Erro ao carregar usuários", e.message);
    }
  };

  const sendPix = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const pagador = await AsyncStorage.getItem("id_client");

      await apiTransacao.post(
        "/",
        {
          valor,
          pagador,
          chave_pix,
        },
        {
          headers: {
            "id-bank": "02",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigation.navigate("Resultado");
    } catch (e) {
      Alert.alert("Erro ao enviar Pix", e.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      LoadingUsers();
      LoadingTransacao();
    }
  }, [isFocused]);

  const steps = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={[styles.titleHome, { color: "#fff" }]}>
              Qual valor você quer transferir?
            </Text>
            <Text
              style={{
                paddingTop: 8,
                fontSize: 16,
                paddingBottom: 16,
                color: "#fff",
              }}
            >
              Saldo da conta R${" "}
              <Text style={{ color: "#34E167" }}>{users.saldo}</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Valor R$"
              keyboardType="numeric"
              placeholderTextColor="#888"
              value={valor}
              onChangeText={setValor}
            />
          </>
        );

      case 2:
        return (
          <>
            <Text style={{ fontSize: 26, fontWeight: "500", color: "#fff" }}>
              Para quem você quer transferir o Pix? R$
              <Text
                style={{ fontSize: 26, fontWeight: "400", color: "#34E167" }}
              >
                {" "}
                {valor}
              </Text>
            </Text>
            <Text style={{ paddingVertical: 8, fontSize: 16, color: "#fff" }}>
              Encontre um contato na sua lista ou inicie uma nova transferência
            </Text>
            <TextInput
              style={[styles.input, { marginTop: 16 }]}
              placeholder="Nome, CPF/CNPJ ou chave Pix"
              placeholderTextColor="#888"
              value={chave_pix}
              onChangeText={setChavePix}
            />
          </>
        );

      case 3:
        return (
          <View style={{ paddingVertical: 8, paddingBottom: 12 }}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                marginBottom: 12,
                fontSize: 24,
              }}
            >
              Transferindo
            </Text>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                marginBottom: 12,
                fontSize: 42,
              }}
            >
              R$ {valor}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                marginBottom: 12,
                fontSize: 16,
                justifyContent: "space-between",
                textTransform:"uppercase"
              }}
            >
              CPF/Chave Pix: {""}
              <Text style={{ color: "#34E167", fontWeight: "400" }}>
                {chave_pix}
              </Text>
            </Text>
            <View
              style={{
                marginBottom: 14,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "#999", fontWeight: "bold", fontSize: 16 }}>
                Pagador
              </Text>
              <Text style={{ color: "#999", fontWeight: "bold", fontSize: 16 }}>
                {transacao.recebedor_name}
              </Text>
            </View>
            <View
              style={{
                marginBottom: 14,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "#999", fontWeight: "bold", fontSize: 16 }}>
                Banco
              </Text>
              <Text style={{ color: "#999", fontWeight: "bold", fontSize: 16 }}>
                {transacao.banco_recebedor}
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          backgroundColor: "#232323",
          paddingTop: 56,
        }}
      >
        <View
          style={{
            paddingTop: 32,
            paddingBottom: 32,
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

        <View style={{ width: "100%" }}>{steps()}</View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          {step > 1 && (
            <Button
              mode="contained"
              onPress={() => setStep((s) => s - 1)}
              style={{
                backgroundColor: "transparent",
                width: "30%",
                padding: 4,
              }}
              labelStyle={{ color: "#fff", textDecorationLine: "underline" }}
            >
              Voltar
            </Button>
          )}

          {step < 3 && (
            <Button
              mode="contained"
              onPress={() => setStep((s) => s + 1)}
              style={{ backgroundColor: "#34E167", width: "50%", padding: 4 }}
              labelStyle={{ color: "#000" }}
              disabled={!valor || (step === 2 && !chave_pix)}
            >
              Avançar
            </Button>
          )}
          {step === 3 && (
            <Button
              mode="contained"
              onPress={sendPix}
              disabled={!chave_pix || !valor}
              style={{ width: "50%", padding: 4, backgroundColor: "#34E167" }}
              labelStyle={{ color: "#000" }}
            >
              Enviar
            </Button>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
