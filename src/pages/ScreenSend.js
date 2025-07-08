import react, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import styles from "../components/Style";

export default function ScreenSend({ navigation }) {
  return (


    <View style={{ paddingHorizontal: 16, alignItems: "center" }}>
      <Image
        source={require("../images/pig.png")}
        style={{ width: 200, height: 200, paddingBlock: 32 }}
        resizeMode="contain"
      />

      <Text style={styles.titleHome}>
        Para quem você quer transferir o pix?{" "}
      </Text>
      <Text style={{ paddingBlock: 8, paddingHorizontal: 16 }}>
        Encontre um contato na sua lista ou inicie uma nova transferencia
      </Text>
      <TextInput
        style={[styles.input, { marginTop: 16 }]}
        placeholder="Nome, CPF/CNPJ ou chave pix"
        placeholderTextColor="#888"
      />

      <TextInput style={styles.input} placeholder="Valor R$"
        placeholderTextColor="#888" />
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
        onPress={() => navigation.navigate("Resultado")}
      >
        <Text style={{ fontSize: 18, color: "#fff" }}>Enviar Pix </Text>
      </Pressable>
    </View>
  );
}
