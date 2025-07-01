import react,{useEffect, useState} from "react"
import { View, Text, TextInput,} from "react-native" 
import { CardContacts } from "../components/CardContacts"
import styles from "../components/Style"


export default function SendMoney(){

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
        <View>


            <View style={styles.containerTransaction}>
                <Text>Qual é o valor da transferencia?</Text>
                <TextInput style={styles.input} placeholder="Valor R$ " ></TextInput>
                <Text>Qual é o valor da transferencia?</Text>
                <TextInput style={styles.input} placeholder=" Your E-mail" ></TextInput>
                <TextInput style={styles.input} placeholder=" Your Password"  ></TextInput>

                <Pressable style={styles.buttonLogin} onPress={() => navigation.navigate("Result") }>
                  <Text style={{fontSize:18,color:"#fff"}} >Send</Text>
                </Pressable>

            </View>

            
            <View style={{flexDirection:"row", alignItems: "center",
                justifyContent:"space-between", marginBlock:18}}>
            <Text style={styles.titleHome}>Contacts</Text>
            {/* <Text style={{fontSize:13, }}> Ver todos</Text> */}

            </View>

            <FlatList
            data={history.slice(0, 4)}
            keyExtractor={(item) => item.idUsuario.toString()}
            renderItem={({item}) =>(
                <CardContacts 
                item={item}
                navigation={navigation}
                />
            )}
            />            

            
        </View>
    )
}