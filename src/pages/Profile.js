import react,{useEffect, useState} from "react"
import { View, Text, Image ,Pressable, Alert} from "react-native" 
import { useIsFocused } from "@react-navigation/native"
import styles from "../components/Style"
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
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
         <View style={{paddingTop:60, alignItems:"center" , padding:16,}}>

            <Avatar.Image 
            source={{uri: client.foto}}
            style={{ width: 150, height: 150, borderRadius: 100, alignSelf: 'center', marginBlock: 36 }}
            />
            <Text style={{fontSize:38, fontWeight:500, paddingBottom:12,}}>Andrew Galante</Text>
            <Text style={{fontSize:20, fontWeight:400, color:"#55555"}}>erick.p436@gmail.com</Text>

           

            <View style={{paddingTop:32}}>
                <Pressable style={styles.buttonPerfil}>
                    <MaterialIcons style={styles.icon} name="person" size={40} color="#000"/>
                    <Text style={styles.textButtonPerfil}>Configurações</Text>
                </Pressable>

                <Pressable style={styles.buttonPerfil}>
                    <Text style={styles.textButtonPerfil}>Configurações</Text>
                </Pressable>

                <Pressable style={styles.buttonPerfil}>
                    <Text style={styles.textButtonPerfil}>Configurações</Text>
                </Pressable>

            </View>
            
                
        
            


       
           
        </View>
    )
        
}