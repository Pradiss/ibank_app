import react, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import styles from "../components/Style";
import { apiClient, apiTransacao } from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { CardContacts } from "../components/CardContacts";



export default function ScreenSend({ navigation }) {

  const [chave_pix, setChavePix] = useState([])
  const [users, setUsers] = useState([])
  const [valor, setValor] = useState([])
  const isFocused = useIsFocused()

  const LoadingUsers = async () => {
    try {
      const id_client = await AsyncStorage.getItem("id_client")
      const token = await AsyncStorage.getItem("token")
      const res = await apiClient.get(`/`,


        {
          headers: {
            'id-bank': '02',
            'Authorization': `Bearer ${token}`
          }
        })
      setUsers(res.data)
    } catch (e) {
      Alert.alert("Erro ao carregar usuario", e.message)
    }
  }


  const sendPix = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      const pagador = await AsyncStorage.getItem("id_client")
      const res = await apiTransacao.post("/",
        {
          valor,
          pagador,
          chave_pix,
        },
        {
          headers: {
            'id-bank': '02',
            'Authorization': `Bearer ${token}`
          }
        })

      navigation.navigate("Resultado")
    } catch (e) {
      Alert.alert("erro ao enviar pix", e.message)
    }
  }

  useEffect(() => {

    if (isFocused) {

      LoadingUsers()
    }
  }, [isFocused])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ paddingHorizontal: 16, alignItems: "center", marginTop: 16 }}>
        <Image
          source={require("../images/pig.png")}
          style={{ width: 200, height: 200, paddingBlock: 32 }}
          resizeMode="contain"
        />

        <Text style={styles.titleHome}>
          Para quem você quer transferir o pix?
        </Text>
        <Text style={{ paddingBlock: 8, paddingHorizontal: 16 }}>
          Encontre um contato na sua lista ou inicie uma nova transferencia
        </Text>
        <TextInput
          style={[styles.input, { marginTop: 16 }]}
          placeholder="Nome, CPF/CNPJ ou chave pix"
          placeholderTextColor="#888"
          value={chave_pix}
          onChangeText={setChavePix}

        />

        <TextInput style={styles.input}
          placeholder="Valor R$"
          keyboardType="numeric"
          placeholderTextColor="#888"
          value={valor}
          onChangeText={setValor}
        />
        <Pressable
          style={{
            borderRadius: 20,
            width: "100%",
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 32,
            backgroundColor: "black",
            padding: 8,
            color: "white",
          }}
          onPress={sendPix}
        >
          <Text style={{ fontSize: 18, color: "#fff" }}>Enviar Pix </Text>
        </Pressable>
        {/* <FlatList
        data={users}
        keyExtractor={(item) => item.id_client.toString()}
        renderItem={({ item }) => (
          <CardContacts item={item} navigation={navigation} />
          )}
          /> */}

      </View>
    </TouchableWithoutFeedback>
  );
}
