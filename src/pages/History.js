import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  Keyboard,
  Pressable,
} from "react-native";
import styles from "../components/Style";
import { CardHistory } from "../components/CardHistory";
import { apiTransacao, apiClient } from "../Services/Api";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatReal } from "../mask/mascara";

export default function History({ navigation }) {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState({});
  const [showEye, setShowEye] = useState(false);
  const isFocused = useIsFocused();

  const LoadingHistory = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id_client");
      const res = await apiTransacao.get(`${id}`, {
        headers: {
          "id-bank": "02",
          Authorization: `Bearer ${token}`,
        },
      });
      setHistory(Array.isArray(res?.data) ? res.data : []);
    } catch (e) {
      Alert.alert("Erro ao carregar histórico", e.message);
    }
  };

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
      setUsers(response?.data || {});
    } catch (error) {
      Alert.alert("Erro ao carregar usuário", error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      LoadingHistory();
      LoadingUsers();
    }
  }, [isFocused]);

  const filterExtract = history.filter((user) =>
    user.recebedor_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={filterExtract.reverse().slice(0, 7)}
          keyExtractor={(item) => item.id_transacao.toString()}
          renderItem={({ item }) => (
            <CardHistory item={item} navigation={navigation} />
          )}
          contentContainerStyle={{
            paddingBottom: 160,
            paddingHorizontal: 16,
            paddingTop: 20,
          }}
          ListHeaderComponent={
            <>
              <Text
                style={{ fontSize: 16, fontWeight: "500", marginBottom: 8 }}
              >
                Saldo Disponível{" "}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.price}>
                  {showEye ? formatReal(users.saldo) : "••••••"}
                </Text>
                <MaterialCommunityIcons
                  style={styles.icon}
                  name={showEye ? "eye" : "eye-off"}
                  size={24}
                  color="#000"
                  onPress={() => setShowEye(!showEye)}
                />
              </View>

              <Text
                style={[styles.titleHome, { paddingTop: 24, marginBottom: 8 }]}
              >
                Busque o extrato{" "}
              </Text>

              <TextInput
                style={styles.input}
                value={search}
                onChangeText={setSearch}
                placeholder="Procurar histórico"
              />

              <Text
                style={[styles.titleHome, { paddingTop: 8, paddingBottom: 8 }]}
              >
                Hoje
              </Text>
              <View
                style={{ borderBottomColor: "#ccc", borderBottomWidth: 1 }}
              />
            </>
          }
        />
      </View>
    </Pressable>
  );
}
