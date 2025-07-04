import react,{useEffect, useState} from "react"
import { View, Text, Pressable, TextInput, Image, Keyboard } from "react-native" 
import styles from "../components/Style"
import { TouchableWithoutFeedback } from "react-native-web"

export default function ForwardPassword({navigation}){

    const [email,setEmail] = useState([])
    const [password,setPassword] = useState([])


    return(
   
        <View style={styles.container}>

            <View style={{ paddingBottom:8, flexDirection:"row", gap:0, alignItems:"center"}}>
                <Image
                    source={require('../images/LogoGreen.png')}
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                        />
                <Text style={styles.titleLogo} >iBank</Text>
            </View>

            <Image
                source={require('../images/pig.png')}
                style={{ width: 200, height: 200, paddingBlock:32, }}
                resizeMode="contain"
                    /> 

            <TextInput style={styles.input} placeholder="Digite sua Senha Nova" />

            <TextInput style={styles.input} placeholder="Confirme sua Senha"  />

            

            <Pressable style={styles.buttonLogin} onPress={() => navigation.navigate("Login") }>
                  <Text style={{fontSize:18,color:"#fff"}} > Mudar senha </Text>
            </Pressable>
            
            
        </View>
 
    )
}