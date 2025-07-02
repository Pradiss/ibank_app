import react,{useEffect, useState} from "react"
import { View, Text, TextInput, Pressable ,FlatList} from "react-native" 
import { CardContacts } from "../components/CardContacts"
import styles from "../components/Style"
import { useIsFocused } from "@react-navigation/native"

export default function ScreenSend({navigation}){

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
        <View style={{paddingTop:56, paddingHorizontal:16}}>

            
            <Text style={styles.titleHome}>Para quem você quer transferir R$ 00,00? </Text>
            <Text>Encontre um contato na sua lista ou inicie uma nova transferencia</Text>
            <TextInput style={styles.input}  placeholder="Nome, CPF/CNPJ ou chave pix"/>


            <Text>Contatos frequentes</Text>


        
            <View style={{flexDirection:"row", alignItems: "center",
                justifyContent:"space-between", marginBlock:18}}>
            <Text style={styles.titleHome}>Contatos</Text>
                <Text style={{fontSize:13, }}> Ver todos</Text> 
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