import React, { useState, useEffect } from "react";
import { View, Text, Alert, Pressable, Image, FlatList } from "react-native";
import styles from "../components/Style";
import { apiRegisterKey } from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";


export default function KeySave({ navigation }) {
  const [key, setKey] = useState("")
  const [filteredKey, setFilteredKey] = useState([])
  const isFocused = useIsFocused()

  const LoadingKey = async () => {
    try {

      const id_client = await AsyncStorage.getItem("id_client")
      const token = await AsyncStorage.getItem("token")
      const id_key = await AsyncStorage.getItem("id_chave")
      const res = await apiRegisterKey.get(`/`,
        {
          headers: {
            "id-bank": "02",
            'Authorization': `Bearer ${token}`,
          },
        })
      setKey(res.data);
      
      const filterKey = res.data.filter(item => item.id_client.toString() === id_client);
    setFilteredKey(filterKey);
      

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
    <View style={{padding:16,justifyContent:"center",}}>
      <View
        style={{
          paddingBottom: 32,
          flexDirection: "row",
          gap: 0,
          alignItems: "center",
          justifyContent:"center",
        }}
      >
        <Image
          source={require("../images/LogoGreen.png")}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
        <Text style={styles.titleLogo}>iBank</Text>
      </View>

      <Text style={{fontSize:16,marginBottom:16}}>Chaves Pix: </Text>
      <FlatList
        data={filteredKey}
        keyExtractor={(item) => item.id_chave.toString()}
        renderItem={({ item }) => (
          <View >
            <Text style={[styles.input,{fontSize:18}]}> {item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
