import react, { use, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../components/Style";
import AvatarProfile from "../components/AvatarProfile";
import { CardHistory } from "../components/CardHistory";
import axios from "axios";
import { Cards } from "../components/Cards";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { CarouselProfile } from "../components/CarouselProfile";
import { apiTransacao } from "../Services/Api";
import { apiClient } from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatReal } from "../mask/mascara";

export default function Home({ navigation }) {
  const [history, setHistory] = useState([]);
  const [users, setUsers] = useState([]);
  const [transacao, setTransacao] = useState([]);
  const isFocused = useIsFocused();
  const [showEye, setShowEye] = useState(false)

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
      setUsers(response.data);
    } catch (error) {
      Alert.alert("erro ao carregar usuario", error);
    }
  };

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

      setTransacao(Array.isArray(res?.data) ? res.data : []);

    } catch (e) {
      Alert.alert("Erro ao carregar histórico", e.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      LoadingUsers();
      LoadingHistory();
    }
  }, [isFocused]);

  const nomesUnicos = [];
  const contatosFiltrados =  [...transacao].reverse() .filter((item) => {
      const nome = item.recebedor_name;
      if (!nomesUnicos.includes(nome)) {
        nomesUnicos.push(nome);
        return true;
      }
      return false;
    })
    .slice(0, 5);

  return (
    <View style={{ paddingTop: 50, paddingHorizontal: 16 }}>
      <AvatarProfile navigation={navigation} />

      <Text
        style={{
          paddingTop: 18,
          paddingBottom: 8,
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        Meus Saldo
      </Text>
          <View style={{ flexDirection: "row",justifyContent:"space-between", alignItems:"center"  }}>
              <Text style={styles.price}>R${showEye ? formatReal(users.saldo) : "••••••"}</Text>
              <MaterialCommunityIcons
                style={styles.icon}
                name={showEye ? "eye" : "eye-off"}
                size={24}
                color="#000"
                onPress={() => setShowEye(!showEye)}
              /> 
            </View>

      <View style={{ marginTop: 12 }}></View>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Transferir Pix")}>
          <View style={styles.cardCategory}>
            <MaterialIcons
              style={styles.icon}
              name="pix"
              size={40}
              color="#000"
            />

            <Text style={{ fontSize: 14 }}>Transferir Pix</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Scan")}>
          <View style={styles.cardCategory}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="qrcode-scan"
              size={40}
              color="#000"
            />
            <Text style={{ fontSize: 14 }}>Ler o QrCode</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("KeyPix")}>
          <View style={styles.cardCategory}>
            <MaterialIcons
              style={styles.icon}
              name="key"
              size={40}
              color="#000"
            />

            <Text style={{ fontSize: 14 }}>Cadastro Pix</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ marginBlock: 12 }}></View>

      <Text style={styles.titleHome}>Transação Rápida</Text>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
      >
        <Pressable
          style={styles.buttonCircle}
          onPress={() => navigation.navigate("Transferir Pix")}
        >
          <MaterialCommunityIcons
            style={styles.icon}
            name="plus"
            size={24}
            color="#000"
          />
        </Pressable>

        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={contatosFiltrados}
          keyExtractor={(item) => item.id_transacao.toString()}
          renderItem={({ item }) => (
            <CarouselProfile item={item} navigation={navigation} />
          )}
        />
      </View>

      <View style={{ marginBlock: 12 }}></View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Text style={styles.titleHome}> Transações Recentes</Text>
        <Text
          style={{ fontSize: 13 }}
          onPress={() => navigation.navigate("Extrato")}
        >
          Ver todos
        </Text>
      </View>
      <FlatList
        data={[...transacao].reverse().slice(0, 3)}
        keyExtractor={(item) => item.id_transacao.toString()}
        renderItem={({ item }) => (
          <CardHistory item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}
