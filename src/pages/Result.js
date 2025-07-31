import { View, Text, Alert, FlatList } from "react-native";
import styles from "../components/Style";
import react, { useState, useEffect } from "react";
import { apiTransacao } from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function Result() {
  const [transacao, setTransacao] = useState([])
  const isFocused = useIsFocused()

  const LoadingTransacao = async () => {
    try {
      const id_client = await AsyncStorage.getItem("id_client")
      const token = await AsyncStorage.getItem("token")
      const res = await apiTransacao.get(
        `/${id_client}`,

        {
          headers: {
            "id-bank": "02",
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setTransacao(res.data)
    } catch (e) {
      Alert.alert("erro ao carregar transacao", e.message)
    }
  };

  useEffect(() => {
    if (isFocused) {
      LoadingTransacao()
    }
  }, [isFocused])

  const ultimoPix =
    transacao.length > 0 ? transacao[transacao.length - 1] : null

  return (
    <View>
      {ultimoPix ? (
        <View style={{ marginBottom: 10 }}>
          <Text>Valor: {ultimoPix.valor}</Text>
          <Text>Status: {ultimoPix.status}</Text>
          <Text>Pagador: {ultimoPix.pagador_name}</Text>
          <Text>Recebedor: {ultimoPix.recebedor_name}</Text>
          <Text>Banco Pagador: {ultimoPix.banco_pagador}</Text>
          <Text>Banco Recebedor: {ultimoPix.banco_recebedor}</Text>
        </View>
      ) : (
        <Text>Nenhuma transação encontrada.</Text>
      )}
    </View>
  )
}
