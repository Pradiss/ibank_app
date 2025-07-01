import react,{useEffect, useState} from "react"
import { View, Text, TextInput , FlatList, Alert} from "react-native" 
import styles from "../components/Style"
import axios from "axios"
import { CardHistory } from "../components/CardHistory"
import { useIsFocused } from "@react-navigation/native"

export default function History({item, navigation}){
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
        <View style={{padding:16}} >
            <TextInput style={styles.input} placeholder="Search Transaction" />

            <Text style={styles.titleHome}> Today </Text>

             <FlatList
            data={history}
            keyExtractor={(item) => item.idUsuario.toString()}
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