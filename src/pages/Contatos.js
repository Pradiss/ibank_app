import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import styles from "../components/Style";
import { CardContacts } from "../components/CardContacts";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { apiClient, apiTransacao } from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Contacts({ navigation }) {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);
  const isFocused = useIsFocused();

  const LoadingHistory = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      const id_client = await AsyncStorage.getItem("id_client")
      const res = await apiClient.get(`/${id_client}`, {
        headers: {
          "id-bank": "02",
          'Authorization' : `Bearer/${token}`
        },
      });
      setHistory(res.data);
    } catch (e) {
      Alert.alert("Erro ao carregar Historico", e.message);
    }
  };
  useEffect(() => {
    if (isFocused) {
      LoadingHistory();
    }
  }, [isFocused]);

  return (
    <Pressable onPress={Keyboard.dismiss}>
    <View style={{ padding: 16 }}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do seu contato"
        value={search}
        onChangeText={setSearch}
      />
      {/* <View style={{flexDirection:"row" , gap:8}}>
                <TouchableOpacity onPress={() => navigation.navigate("ScreenSend")}>
                    <View style={{padding:12,borderWidth:1, borderColor:"#ccc",borderRadius:16,}}>
                    
                        <Text style={{fontSize:16,}}>Adicionar Contato</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ScreenSend")}>
                    <View style={{padding:12,borderWidth:1, borderColor:"#ccc",borderRadius:16,}}>
                    
                        <Text style={{fontSize:16,}}>Excluir Contato</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ScreenSend")}>
                    <View style={{padding:12,borderWidth:1, borderColor:"#ccc",borderRadius:16,}}>
                    
                        <Text style={{fontSize:16,}}>Favoritos</Text>
                    </View>
                </TouchableOpacity>

            </View>
        */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBlock: 12,
        }}
      >
        <Text style={styles.titleHome}>Contatos</Text>
        {/* <Text style={{fontSize:13, }}> Ver todos</Text> */}
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id_client.toString()}
        renderItem={({ item }) => (
          <CardContacts item={item} navigation={navigation} />
        )}
      />
    </View>
    </Pressable>
  );
}
