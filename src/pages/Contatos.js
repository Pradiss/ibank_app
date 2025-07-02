import {useEffect,useState} from "react"
import {ScrollView, View, Text, TextInput, Pressable, FlatList ,TouchableOpacity,Image} from "react-native"
import { useIsFocused } from "@react-navigation/native"
import styles from "../components/Style"
import axios from "axios"
import { CardContacts } from "../components/CardContacts"
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';


export function Contacts({navigation}){

    const [search,setSearch] = useState("")
    const [history, setHistory] = useState([])
    const isFocused = useIsFocused()

    const LoadingHistory = async () =>{
        try{
            const res = await axios.get("https://erick5457.c44.integrator.host/api/usuarios")
            setHistory(res.data)
        }catch(e){
            Alert.alert("Erro ao carregar Historico", e.message)
        }
    }
    useEffect(() => {
        
        if(isFocused){
            LoadingHistory()

        }
    },[isFocused])

   
 
    return(
        
        <View style={{padding:16}}>

            <TextInput style={styles.input} 
            placeholder="Digite o nome do seu contato" 
            value={search} 
            onChangeText={setSearch}
            />     
            <View style={{flexDirection:"row" , gap:8}}>
                <TouchableOpacity onPress={() => navigation.navigate("ScreenSend")}>
                    <View style={{padding:12,borderWidth:1, borderColor:"#ccc",borderRadius:16,}}>
                    
                        {/* <MaterialIcons style={styles.icon} name="pix" size={40} color="#000"/> */}
                        <Text style={{fontSize:16,}}>Adicionar Contato</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ScreenSend")}>
                    <View style={{padding:12,borderWidth:1, borderColor:"#ccc",borderRadius:16,}}>
                    
                        {/* <MaterialIcons style={styles.icon} name="pix" size={40} color="#000"/> */}
                        <Text style={{fontSize:16,}}>Excluir Contato</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ScreenSend")}>
                    <View style={{padding:12,borderWidth:1, borderColor:"#ccc",borderRadius:16,}}>
                    
                        {/* <MaterialIcons style={styles.icon} name="pix" size={40} color="#000"/> */}
                        <Text style={{fontSize:16,}}>Favoritos</Text>
                    </View>
                </TouchableOpacity>

            </View>
       

            <View style={{
                flexDirection:"row", 
                alignItems: "center",
                justifyContent:"space-between", 
                marginBlock:12}}>
                <Text style={styles.titleHome}>Contatos</Text>
                {/* <Text style={{fontSize:13, }}> Ver todos</Text> */}
            </View>

            <FlatList
            data={history}
            keyExtractor={(item) => item.idUsuario.toString()}
            renderItem={({item}) =>(
                <CardContacts 
                item={item}
                navigation={navigation}
                />
            )}
            />            
           
        </View>
    )
}