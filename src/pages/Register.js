import react,{useEffect, useState} from "react"
import { View, Text, Pressable, TextInput, Image, Keyboard } from "react-native" 
import styles from "../components/Style"
import { TouchableWithoutFeedback } from "react-native-web"

export default function Register({navigation}){

    const [email,setEmail] = useState([])
    const [password,setPassword] = useState([])


    return( 
   
        <View style={styles.container}>

            <View style={{ paddingBottom:26, flexDirection:"row", gap:0, alignItems:"center"}}>
                <Image
                    source={require('../images/LogoGreen.png')}
                    style={{ width: 40, height: 40, }}
                    resizeMode="contain"
                        />
                <Text style={styles.titleLogo} >iBank</Text>
            </View>


            <TextInput style={styles.input} placeholder="Seu nome" ></TextInput>
            <TextInput style={styles.input} placeholder="Seu E-mail" value={email} onChangeText={setEmail}></TextInput>

            <TextInput style={styles.input} placeholder=" Your Password" ></TextInput>
            <TextInput style={styles.input} placeholder=" Your Password" ></TextInput>
            <TextInput style={styles.input} placeholder=" Your Password" ></TextInput>


            <Pressable style={styles.buttonLogin} onPress={() => navigation.navigate("Login") }>
                  <Text style={{fontSize:18,color:"#fff"}} >Cadastrar </Text>
            </Pressable>
            
             <View style={{flexDirection:"row" ,paddingBottom:50,paddingTop:12}}>
                    <Text style={{fontSize:14, marginTop:16, fontWeight:400}}>
                        Já tem uma conta?
                    </Text>
                    <Text 
                    style={{color:"#000",fontSize:15, marginTop:16, fontWeight:500, textDecorationLine:"underline"}} 
                    onPress={() => navigation.navigate("Login")}> Login</Text>
                </View>
            
        </View>
 
    )
}