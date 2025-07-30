import react, {useState,useEffect} from "react"
import { View, Text, Pressable, Image, TextInput, Alert } from "react-native";
import styles from "../components/Style";
import { apiRegisterKey } from "../Services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterChave({ navigation }) {
  
    const [name, setName] = useState([])
    
    const registerkey = async() =>{

        try{
            const id_client = await AsyncStorage.getItem("id_client")
            const token = await AsyncStorage.getItem("token")
            const res = await apiRegisterKey.post(`/`,
                {
                    id_client,
                    name
                },
                {
                    headers:{

                        'id-bank' :'02',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            navigation.navigate("MyTabs")
        }catch(e){
            Alert.alert("ERRO ao Cadastrar a chave pix", e.message)
        }
    }

    // const LoadingUsers = async () => {
    //     try{
    //         const 
    //     }
    // }

    return (
        <View style={styles.container}>
            <View
                style={{
                    paddingBottom: 32,
                    flexDirection: "row",
                    gap: 0,
                    alignItems: "center",
                }}
            >
                <Image
                    source={require("../images/LogoGreen.png")}
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                />
                <Text style={styles.titleLogo}>iBank</Text>
            </View>

            <Text style={styles.titleHome}>
                Cadastre sua nova chave PIX
            </Text>
            
            <TextInput
                style={[styles.input, { marginTop: 16 }]}
                placeholder="Email, CPF/CNPJ ou chave aleatória"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
            />
            
            <Pressable
                style={styles.buttonLogin}
                onPress={registerkey}
            >
                <Text style={{ fontSize: 18, color: "#fff" }}>Cadastrar Chave PIX</Text>
            </Pressable>
        </View>
    );
}
