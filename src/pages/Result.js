import { View, Text, Alert, FlatList, Image } from "react-native";
import styles from "../components/Style";
import react, { useState, useEffect } from "react";
import { apiTransacao } from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, Button } from "react-native-paper";
import { formatReal } from "../mask/mascara";


export default function Result({ navigation }) {
  const [transacao, setTransacao] = useState([]);
  const isFocused = useIsFocused();

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
      Alert.alert("erro ao carregar transacao", e.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      LoadingTransacao();
    }
  }, [isFocused]);

  const ultimoPix =
    transacao.length > 0 ? transacao[transacao.length - 1] : null;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#232323",
        paddingHorizontal: 16,
        justifyContent: "space-around",
      }}
    >
      <View>
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
        {ultimoPix ? (
          <View style={{ marginBottom: 10 }}>
            <View style={{ marginBottom: 32 }}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 20,
                  marginBottom: 16,
                }}
              >
                Transferindo
              </Text>
              <Text style={[styles.price, { color: "#34E167", marginBottom: 8 }]}>
               R$ {formatReal(ultimoPix.valor)}
              </Text>
              <Text style={{ color: "#999", fontSize: 16 }}>
                para{" "}
                <Text
                  style={{ color: "#999", fontSize: 18, fontWeight: "bold", textTransform: "uppercase" }}
                >
                  {ultimoPix.recebedor_name}
                </Text>
              </Text>
            </View>

            <View style={{ marginBottom: 14 , justifyContent:"space-between", flexDirection:"row"}}>
              <Text style={{ color: "#999", fontWeight: "bold", fontSize: 16 }}>Pagador</Text>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }} >{ultimoPix.pagador_name}</Text>
            </View>

            <View style={{ marginBottom: 14 , justifyContent:"space-between", flexDirection:"row"}}>
              <Text style={{ color: "#999", fontWeight: "bold", fontSize: 16 }}>Recebedor</Text>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }} >{ultimoPix.recebedor_name}</Text>
            </View>

            <View style={{ marginBottom: 14 , justifyContent:"space-between", flexDirection:"row"}}>
              <Text style={{ color: "#999", fontWeight: "bold", fontSize: 16 }}>Instituição</Text>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }} >{ultimoPix.banco_pagador}</Text>
            </View>

            <View style={{ marginBottom: 14 , justifyContent:"space-between", flexDirection:"row"}}>
              <Text style={{ color: "#999", fontWeight: "bold", fontSize: 16 }}>Instituição recebedor </Text>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }} >{ultimoPix.banco_recebedor}</Text>
            </View>

            
          </View>
        ) : (
          <ActivityIndicator type={"large"} animating={true} color={"#34E167"}/>

        )}
      </View>

      <View>
        <View
          style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            marginVertical: 16,
          }}
        />
        <Button
          style={[styles.buttonLogin, { backgroundColor: "#34E167" }]}
          onPress={() => navigation.navigate("MyTabs")}
          mode="contained"
          labelStyle={{ fontSize: 18, color: "#000" }}
        >
          Voltar ao Início
        </Button>
      </View>
    </View>
  );
}
