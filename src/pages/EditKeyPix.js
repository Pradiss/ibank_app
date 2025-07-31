import react, { useState, useEffect } from "react"
import { View, Text, Alert, Pressable, Image, TextInput } from "react-native";
import styles from "../components/Style";
import { apiRegisterKey } from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function EditKeyPix({ navigation }) {

  const [name, setName] = useState("")
  const [keyNova, setKeyNova] = useState("")
  const isFocused = useIsFocused()

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
        value={name}
        onChangeText={setName}
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
        onPress={""}
      >
        <Text style={{ fontSize: 18, color: "#fff" }}> Editar Chave PIX</Text>
      </Pressable>
    </View>
  );
}
