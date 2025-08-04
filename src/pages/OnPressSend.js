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
import { formatReal } from "../mask/mascara";

export default function OnPressSend({ navigation , route}) {
  const [chave_pix, setChavePix] = useState("");
  const [users, setUsers] = useState([]);
  const [transacao, setTransacao] = useState([]);
  const [valorPix, setValor] = useState("");
  const [step, setStep] = useState(1);
  const {nome, chavePix} = route.params
  const isFocused = useIsFocused();

  const LoadingUsers = async () => {
    try {
      const id_client = await AsyncStorage.getItem("id_client");
      const token = await AsyncStorage.getItem("token");
      const res = await apiClient.get(`/${id_client}`, {
        headers: {
          "id-bank": "02",
          'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
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
          valorPix,
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
      if(chavePix){
        setChavePix(chavePix)
      }
    }

  }, [isFocused]);

  const steps = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={[styles.titleHome, { color: "#fff" }]}>
              Qual valorPix você quer transferir?
            </Text>
            <Text
              style={{
                paddingTop: 8,
                fontSize: 16,
                paddingBottom: 16,
                color: "#fff",
              }}
            >
              Saldo da conta {" "}
              <Text style={{ color: "#34E167" }}>{formatReal(users.saldo)}</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Valor R$"
              keyboardType="numeric"
              placeholderTextColor="#888"
              value={valorPix}
              onChangeText={setValor}
            />
          </>
        )

      case 2:
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
             <Text style={{ color: "#34E167" }}> {" "}{ formatReal(valorPix)}</Text>
            </Text>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                marginBottom: 12,
                fontSize: 16,
                justifyContent: "space-between",
                
              }}
            >
              CPF/Chave Pix: {""}
              <Text style={{ color: "#34E167", fontWeight: "400"  }}>
                {chavePix}
              </Text>
            </Text>
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

          {step < 2 && (
            <Button
              mode="contained"
              onPress={() => setStep((s) => s + 1)}
              style={{ backgroundColor: "#34E167", width: "50%", padding: 4 }}
              labelStyle={{ color: "#000" }}
              disabled={!valorPix || (step === 2 && !chave_pix)}
            >
              Avançar
            </Button>
          )}
          {step === 2 && (
            <Button
              mode="contained"
              onPress={sendPix}
              disabled={!chave_pix || !valorPix}
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
