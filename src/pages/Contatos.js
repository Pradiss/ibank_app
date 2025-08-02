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
      const token = await AsyncStorage.getItem("token");
      const id_client = await AsyncStorage.getItem("id_client");
      const id_transacao = await AsyncStorage.getItem("id_transacao");
      const res = await apiTransacao.get(`/${id_client}`, {
        headers: {
          "id-bank": "02",
          Authorization: `Bearer/${token}`,
        },
      });
      setHistory(Array.isArray(res?.data) ? res.data : []);
    } catch (e) {
      Alert.alert("Erro ao carregar Historico", e.message);
    }
  };
  useEffect(() => {
    if (isFocused) {
      LoadingHistory();
    }
  }, [isFocused]);

  const nomesUnicos = [];
const contatosFiltrados = history
  .filter((item) => {
    const nome = item.recebedor_name;
    const nomeFiltrado = nome?.toLowerCase().includes((search || "").toLowerCase());
    const aindaNaoAdicionado = !nomesUnicos.includes(nome);

    if (nomeFiltrado && aindaNaoAdicionado) {
      nomesUnicos.push(nome);
      return true;
    }

    return false;
  })
  .reverse() 
  .slice(0, 10);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          
        </View>

        <FlatList
          data={[...contatosFiltrados].reverse().slice(0,10)}
          keyExtractor={(item, index) =>
            item.id_client?.toString() || index.toString()
          }
          renderItem={({ item }) => (
            <CardContacts item={item} navigation={navigation} />
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
