import react,{useEffect, useState} from "react"
import { View, Text, Pressable, FlatList, Alert, ScrollView,TouchableOpacity } from "react-native" 
import styles from "../components/Style"
import AvatarProfile from "../components/AvatarProfile"
import { CardHistory } from "../components/CardHistory"
import axios from "axios"
import { Cards } from "../components/Cards"
import { useIsFocused } from "@react-navigation/native"
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { CarouselProfile } from "../components/CarouselProfile"

export default function Home({navigation}){

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
        <View style={{paddingTop:50, padding:16}}>
            <AvatarProfile 
            navigation={navigation}
            />

            <Text style={{paddingTop:18,paddingBottom:8, fontSize:16,fontWeight:500}}>Wallet Balance</Text>
            <Text style={styles.price}>$ 31.298,92</Text>


            <View style={{marginTop:12}}></View>

            <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                <TouchableOpacity onPress={() => navigation.navigate("ScreenSend")}>
                    <View style={styles.cardCategory }>
                        
                        <MaterialIcons style={styles.icon} name="pix" size={40} color="#000"/>

                        <Text style={{fontSize:14}}>Transferir Pix</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Scan")}>
                    <View style={styles.cardCategory}>
                        <MaterialCommunityIcons style={styles.icon} name="qrcode-scan" size={40} color="#000"/>
                        <Text style={{fontSize:14}}>Ler  QrCode</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Editar Chave")}>
                    <View style={styles.cardCategory }>
                        
                        <MaterialIcons style={styles.icon} name="key" size={40} color="#000"/>

                        <Text style={{fontSize:14}}>Editar Chave 
                            
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{marginBlock:12}}></View>
        
            <Text style={styles.titleHome}>Transação Rápida</Text>

            <View style={{flexDirection:"row", alignItems:"center", marginTop:16}}>

            {/* <Pressable style={styles.buttonCircle}
                onPress={() => navigation.navigate("Pix")}>
                    <MaterialCommunityIcons style={styles.icon} name="plus" size={24} color="#000"/>
            </Pressable> */}

            <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={history}
            keyExtractor={(item) => item.idUsuario.toString()}
            renderItem={({item}) =>(
                <CarouselProfile
                item={item}
                navigation={navigation}
                />
            )}
            />
            </View>
            
            <View style={{marginBlock:12}}></View>

            <View style={{flexDirection:"row", alignItems: "center",
                justifyContent:"space-between", marginBottom:16}}>
            <Text style={styles.titleHome}> Transações Recentes</Text>
            <Text style={{fontSize:13, }} onPress={() => navigation.navigate("Extrato")} > Ver todos</Text>

            </View>
            <FlatList
            data={history.slice(0, 4)}
            keyExtractor={(item) => item.idUsuario.toString()}
            renderItem={({item}) =>(
                <CardHistory 
                item={item}
                navigation={navigation}
                />
            )}
            />
        
        </View>
    )
}