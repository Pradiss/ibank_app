import react, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Alert } from "react-native";
import styles from "../components/Style";
import { CardHistory } from "../components/CardHistory";
import { apiTransacao } from "../Services/Api";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function History({ item, navigation }) {
  const [history, setHistory] = useState([]);
  const isFocused = useIsFocused();

  const LoadingHistory = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      const id = await AsyncStorage.getItem("id_client")
      const res = await apiTransacao.get(`${id}`, {
        headers: {
          "id-bank": "02",
          "Authorization" : `Bearer ${token}`
        },
      });
      setHistory(res.data);
    } catch (e) {
      Alert.alert("Erro ao carregar Historico", e.message);
    }
  };
  useEffect(() => {
    if (isFocused) {
      LoadingHistory();
    }
  }, [isFocused]);

  return (
    <View style={{ padding: 16 }}>
      <Text
        style={{
          paddingTop: 18,
          paddingBottom: 8,
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        Saldo Disponivel
      </Text>
      <Text style={styles.price}>$ 31.298,92</Text>

      <Text style={[styles.titleHome, { paddingBlock: 16 }]}>Extrato </Text>
      <TextInput style={styles.input} placeholder="Procurar historico" />

      <Text style={[styles.titleHome, { paddingBlock: 16 }]}>Ontem </Text>
      <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }} />

      <FlatList
        data={history}
        keyExtractor={(item) => item.id_transacao.toString()}
        renderItem={({ item }) => (
          <CardHistory item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}
