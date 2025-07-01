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
            const res = await axios.get("https://erick5457.c44.integrator.host/api/usuarios")
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
         <View style={{paddingTop:60, alignItems:"center"}}>

            <Avatar.Image 
            source={{uri: client.foto}}
            style={{ width: 150, height: 150, borderRadius: 100, alignSelf: 'center', marginTop: 20 }}
            />
            <Text>Erick Prado</Text>
            <Text>erick.p436@gmail.com</Text>

            <View style={{flexDirection:"row"}}>
                <Pressable>
                    <Text>Configurações</Text>
                </Pressable>
                <Pressable>
                    <Text>Editar Perfil</Text>
                </Pressable>
            </View>
            


       
           
        </View>
    )
        
}