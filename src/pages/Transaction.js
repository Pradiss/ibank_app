import {useEffect,useState} from "react"
import {ScrollView, View, Text, TextInput, Pressable, FlatList ,TouchableOpacity,Image} from "react-native"
import { useIsFocused } from "@react-navigation/native"
import styles from "../components/Style"
import axios from "axios"
import { CardContacts } from "../components/CardContacts"
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';


export function Transaction({navigation}){

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
            placeholder="Nome, CPF/CNPJ ou chave pix" 
            value={search} 
            onChangeText={setSearch}
            />            
           
           
            <Text style={styles.titleHome}>Suggested</Text>

            <View style={{flexDirection:"row", paddingTop:16 }}>
                <TouchableOpacity onPress={() => navigation.navigate("")}>
                    <View style={styles.cardCategory }>
                        
                        <MaterialIcons style={styles.icon} name="pix" size={50} color="#000"/>

                        <Text style={{fontSize:18}}>Pix</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("")}>
                    <View style={styles.cardCategory}>
                        <MaterialCommunityIcons style={styles.icon} name="qrcode-scan" size={50} color="#000"/>
                        <Text style={{fontSize:18}}>Escanear</Text>
                    </View>
                </TouchableOpacity>

                
            
            </View>
            

            <View style={{flexDirection:"row", alignItems: "center",
                justifyContent:"space-between", marginBlock:18}}>
            <Text style={styles.titleHome}>Contacts</Text>
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