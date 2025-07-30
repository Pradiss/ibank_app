import react, {useState,useEffect} from "react"
import { View, Text,Alert, Pressable, Image, TextInput } from "react-native";
import styles from "../components/Style";
import { apiRegisterKey } from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditKeyPix({ navigation }) {

  const [keyAntiga, setKeyAntiga] = useState("")
  const [keyNova, setKeyNova] = useState("")

  const editKey = async () =>{
    try{
      const id_client = await AsyncStorage.getItem("id_client")
      const token = await AsyncStorage.getItem("token")
      const res = await apiRegisterKey.put(`/${id_client}`,
        {
          headers:{
            'id-bank' : "02",
            'Authorization' : `Bearer ${token}`
          }
        }
      )

      navigation.navigate("MyTabs")
    }catch(e){
      Alert.alert("Erro ao editar chave PIX", e.message)
    }
  }

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



      <TextInput
        style={styles.input}
        placeholder="Chave pix antiga"
        placeholderTextColor="#888"
        value={keyAntiga}
        onChangeText={setKeyAntiga}
      />

      <TextInput
        style={styles.input}
        placeholder="Chave pix nova"
        placeholderTextColor="#888"
        value={keyNova}
        onChangeText={setKeyNova}
      />

      <Pressable
        style={styles.buttonLogin}
        onPress={editKey}
      >
        <Text style={{ fontSize: 18, color: "#fff" }}> Editar Chave PIX</Text>
      </Pressable>
    </View>
  );
}
