import React, { useState, useEffect } from "react";
import { View, Text, Alert, Pressable, Image, FlatList } from "react-native";
import styles from "../components/Style";
import { apiRegisterKey } from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function KeySave({ navigation }) {
  const [key, setKey] = useState("")
  const isFocused = useIsFocused()

  const LoadingKey = async () => {
    try {
      const id_client = await AsyncStorage.getItem("id_client")
      const token = await AsyncStorage.getItem("token");
      const id_key = await AsyncStorage.getItem("id_chave")
      const res = await apiRegisterKey.get(`/${id_key}`,
        {
        headers: {
          "id-bank": "02",
          'Authorization': `Bearer ${token}`,
        },
      })

      setKey(res.data);
     
    } catch (e) {
      Alert.alert("Erro ao Carregar Chave pix", e.message)
    }
  }

  useEffect(() => {
    if (isFocused) {
      LoadingKey()
    }
  }, [isFocused])

  return (
    <View style={styles.container}>
      <View
        style={{
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
        <Text style={styles.titleLogo}>iBank</Text>
      </View>

      <FlatList
        data={key}
        keyExtractor={(item) => item.id_chave.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text> {item.name}</Text>
            <Text> {item.id_client}</Text>
          </View>
        )}
      />
    </View>
  );
}
