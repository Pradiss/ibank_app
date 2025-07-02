import react,{useEffect, useState} from "react"
import { View, Text, Pressable, TextInput, Image, Keyboard } from "react-native" 
import styles from "../components/Style"
import { TouchableWithoutFeedback } from "react-native-web"

export default function Register({navigation}){

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

            <TextInput style={styles.input} placeholder=" Your E-mail" value={email} onChangeText={setEmail}></TextInput>

            <TextInput style={styles.input} placeholder=" Your Password" value={password} onChangeText={setPassword} ></TextInput>

            <Text style={{color:"#000",fontSize:14,  fontWeight:400, textDecorationLine:"underline",}}>
                Esqueceu sua senha?
            </Text>

            <Pressable style={styles.buttonLogin} onPress={() => navigation.navigate("MyTabs") }>
                  <Text style={{fontSize:18,color:"#fff"}} > Get started </Text>
            </Pressable>
            
            
        </View>
 
    )
}