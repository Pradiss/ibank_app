import react,{useEffect, useState} from "react"
import { View, Text, Pressable, TextInput, Image, Keyboard } from "react-native" 
import styles from "../components/Style"
import { TouchableWithoutFeedback } from "react-native-web"

export default function Login({navigation}){

    const [email,setEmail] = useState([])
    const [password,setPassword] = useState([])


    return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <View>
                <Text style={styles.titleLogo} >iBank</Text>
                <Image 
                Source={require('../images/LogoGreen.png')}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
                />
            </View>

            <TextInput style={styles.input} placeholder=" Your E-mail" value={email} onChangeText={setEmail}></TextInput>
            <TextInput style={styles.input} placeholder=" Your Password" value={password} onChangeText={setPassword} ></TextInput>

            <Pressable style={styles.buttonLogin} onPress={() => navigation.navigate("MyTabs") }>
                  <Text style={{fontSize:18,color:"#fff"}} > Get started </Text>
            </Pressable>
            
            <Text></Text>
        </View>
    </TouchableWithoutFeedback>
    )
}