import react, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../components/Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "../Services/Api";

export default function AvatarProfile({ navigation, item }) {
  const [users, setUsers] = useState("");

  useEffect(() => {
    const LoadingUsers = async () => {
      try {
        const id = await AsyncStorage.getItem("id_client")
        const token = await AsyncStorage.getItem("token")
        const res = await apiClient.get(
          `/${id}`,
          {
            headers: { "id-bank": " 02", "Authorization": `Bearer${token}` }
          })
        setUsers(res.data)

      } catch (e) {
        Alert.alert("erro ao carregar usuario", e.message)
      }
    }
    LoadingUsers()
  },)

  return (
    <View
      style={{
        flexDirection: "row",
        marginBlock: 8,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Avatar.Image
            size={50}
            source={require("../images/avatar.png")}
            style={{ alignSelf: "flex-start", backgroundColor: "#fff" }}
          />

          <View style={{ justifyContent: "center", padding: 8 }}>
            <Text>Bem Vindo !!</Text>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginTop: 4 }}
              onPress={() => navigation.navigate("Perfil")}
            >{users.name}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="eye"
          size={24}
          color="#000"
          onPress={() => navigation.navigate("Notification")}
        />
        
      </View>
    </View>
  );
}
