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
      const res = await apiTransacao.get(`/${id_client}`,

        {
          headers: {
            headers: {
              'id-bank': '02',
              'Authorization': `Bearer ${token}`
            }
          }
        }
      )
      setTransacao(res.data)

    } catch (e) {
      Alert.alert("erro ao carregar transacao", e.message)
    }
  }

  useEffect(() => {
    if(isFocused){
      LoadingTransacao()
    }
  })

  return (
    <View>
      <FlatList
        data={transacao}
        keyExtractor={(item) => item.id_transacao.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text> {item.valor}</Text>
            <Text> {item.status}</Text>
            <Text> {item.pagador_name}</Text>
            <Text> {item.recebedor_name}</Text>
            <Text> {item.banco_pagador}</Text>
            <Text> {item.banco_recebedor}</Text>
          </View>
        )}
      />
    </View>
  );
}
