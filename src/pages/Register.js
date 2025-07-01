import react,{useEffect, useState} from "react"
import { View, Text, TextInput, Pressable, Image } from "react-native" 
import styles from "../components/Style"

export default function Register({navigation}){

    const [email,setEmail] = useState([])
    const [password,setPassword] = useState([])
    const [name,setName] = useState([])


     
    return(
        <View  style={{flex:1, alignItems:"center", justifyContent:"center"}}>
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

            <TextInput style={styles.input} placeholder=" Seu nome " value={name} onChangeText={setName}></TextInput>
            <TextInput style={styles.input} placeholder=" Seu E-mail" value={email} onChangeText={setEmail}></TextInput>
            <TextInput style={styles.input} placeholder=" Sua Senha" value={password} onChangeText={setPassword} ></TextInput>
         

            <Pressable style={{ borderRadius:20,
                    width:320,
                    height:55,
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor: "#34E167",
                    padding:8,
                    borderColor: "#fff",
                    shadowColor: "#000",
                    shadowOffset: { width: 2, height: 6 },
                    shadowOpacity: 0.15, 
                    shadowRadius: 3, 
                    elevation: 5,}}

                    onPress={() => navigation.navigate("MyTabs") }>
                  <Text style={{fontSize:18,color:"#fff",}} > Get started </Text>
            </Pressable>

        </View>
    )
}