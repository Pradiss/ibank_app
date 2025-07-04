import react,{useEffect, useState} from "react"
import { View, Text, TextInput , FlatList, Alert} from "react-native" 
import styles from "../components/Style"
import { CardHistory } from "../components/CardHistory"
import { apiClient } from "../Services/Api"
import { useIsFocused } from "@react-navigation/native"

export default function History({item, navigation}){
    const [history, setHistory] = useState([])
    const isFocused = useIsFocused()


    const LoadingHistory = async () =>{
        try{
            const res = await apiClient.get("/",{
                headers:{
                    'id-bank': '02',
                }
            })
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
        <View style={{padding:16}} >
            <Text style={{paddingTop:18,paddingBottom:8, fontSize:16,fontWeight:500}}>Saldo Disponivel</Text>
            <Text style={styles.price}>$ 31.298,92</Text>



            <Text style={[styles.titleHome, {paddingBlock:16}]}>Extrato </Text>
            <TextInput style={styles.input} placeholder="Procurar historico" />

            <Text style={[styles.titleHome, {paddingBlock:16}]}>Ontem </Text>
            <View style={{borderBottomColor: '#ccc',borderBottomWidth:1,}}/>

             <FlatList
            data={history}
            keyExtractor={(item) => item.id_client.toString()}
            renderItem={({item}) =>(
                <CardHistory 
                item={item}
                navigation={navigation}
                />
            )}
            />
        </View>
    )
}