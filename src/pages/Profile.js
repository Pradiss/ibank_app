import react,{useEffect, useState} from "react"
import { View, Text, Image ,Pressable, Alert} from "react-native" 
import { useIsFocused } from "@react-navigation/native"
import styles from "../components/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from "react-native-paper";
import axios from "axios";

export default function Profile({navigation}){
    const [client, setClient] = useState([])
    const isFocused = useIsFocused()


    const LoadingClient = async () =>{
        try{
            const res = await axios.get("https://limeiraweb.com.br/pixsenac/cliente",{
                headers:{
                    'id-bank': '2',
                }
            })
            console.log(headers)
            setClient(res.data)
            
        }catch(e){
            Alert.alert("Erro ao carregar Historico", e)
        }
    }
    useEffect(() => {
        
        if(isFocused){
            LoadingClient()

        }
    },[isFocused])
    
    return(
         <View style={{paddingTop:60}}>
{/* 
            <Avatar.Image 
            source={{uri: client.foto}}
            style={{ width: 150, height: 150, borderRadius: 100, alignSelf: 'center', marginTop: 20 }}
            />
            <Text>{client.nome}</Text> */}

  
           <Text>{client.name}</Text>
           
        </View>
    )
        
}