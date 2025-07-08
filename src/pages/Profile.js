import react, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, Alert, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import styles from "../components/Style";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import axios from "axios";
import { apiClient } from "../Services/Api";

export default function Profile({ navigation }) {
  const [users, setUsers] = useState([]);

  const isFocused = useIsFocused();

  const LoadingUsers = async () => {
    try {
      const res = await apiClient.get("/", {
        headers: {
          "id-bank": "02",
        },
      });
      setUsers(res.data);
    } catch (e) {
      Alert.alert("Erro ao carregar Historico", e);
    }
  };
  useEffect(() => {
    if (isFocused) {
      LoadingUsers();
    }
  }, [isFocused]);

  return (
    <ScrollView style={{ paddingBottom: 100 }}>
      <View style={{ paddingTop: 60, alignItems: "center", padding: 16 }}>
        <Avatar.Image
          source={require("../images/avatar.png")}
          size={150}
          style={{
            borderRadius: 100,
            alignSelf: "center",
            marginBlock: 36,
            backgroundColor: "#fff"
          }}
        />
        <Text style={{ fontSize: 38, fontWeight: 500, paddingBottom: 12 }}>
          Erick Prado
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 400, color: "#a0a0a0" }}>
          erick.p436@gmail.com
        </Text>

        <View style={{ paddingTop: 32 }}>
          <Pressable
            style={[
              styles.buttonPerfil,
              { flexDirection: "row", justifyContent: "center", gap: 8 },
            ]}
          >
            <MaterialCommunityIcons
              style={styles.icon}
              name="account-arrow-right-outline"
              size={24}
              color="#000"
            />
            <Text style={styles.textButtonPerfil}>Editar Perfil</Text>
          </Pressable>

          <Pressable
            style={[
              styles.buttonPerfil,
              { flexDirection: "row", justifyContent: "center", gap: 8 },
            ]}
          >
            <MaterialCommunityIcons
              style={styles.icon}
              name="cog-outline"
              size={24}
              color="#000"
            />
            <Text style={styles.textButtonPerfil}>Configurações</Text>
          </Pressable>

          <Pressable
            style={[
              styles.buttonPerfil,
              { flexDirection: "row", justifyContent: "center", gap: 8 },
            ]}
          >
            <MaterialIcons
              style={styles.icon}
              name="help-outline"
              size={24}
              color="#000"
            />
            <Text style={styles.textButtonPerfil}>Suporte</Text>
          </Pressable>

          <Pressable
            style={[
              styles.buttonPerfil,
              { flexDirection: "row", justifyContent: "center", gap: 8 },
            ]}
            onPress={() => navigation.navigate("Login")}
          >
            <MaterialIcons
              style={[styles.icon, { color: "red" }]}
              name="logout"
              size={24}
              color="#000"
            />
            <Text style={{ color: "red", fontSize: 18, fontWeight: 500 }}
            >
              Logout
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
