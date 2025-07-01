import react,{useEffect, useState} from "react"
import { View, Text, Pressable, FlatList, Alert, ScrollView } from "react-native" 
import styles from "../components/Style"
import AvatarProfile from "../components/AvatarProfile"
import { CardHistory } from "../components/CardHistory"
import axios from "axios"
import { Cards } from "../components/Cards"
import { useIsFocused } from "@react-navigation/native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
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


            <View style={{marginBlock:12}}></View>

            <View style={{flexDirection:"row", gap:12, alignItems:"center", justifyContent:"start"}}>
                <Pressable style={styles.buttonHome}
                onPress={() => navigation.navigate("Transaction")}>
                    <MaterialCommunityIcons style={styles.icon} name="arrow-up" size={24} color="#000"/>
                    <Text style={{fontSize:18}}>Enviar</Text>
                </Pressable>
            
                <Pressable style={styles.buttonHome}
                onPress={() => navigation.navigate("Pix")}>
                    <MaterialCommunityIcons style={styles.icon} name="arrow-down" size={24} color="#000"/>
                    <Text style={{fontSize:18}}>Receber</Text>
                </Pressable>

                <Pressable style={styles.buttonCircle}
                onPress={() => navigation.navigate("Pix")}>
                    <MaterialCommunityIcons style={styles.icon} name="menu" size={24} color="#000"/>
                </Pressable>
            </View>

            <View style={{marginBlock:12}}></View>
        
            <Text style={styles.titleHome}>Transação Rápida</Text>

            <View style={{flexDirection:"row", alignItems:"center", marginTop:16}}>

            <Pressable style={styles.buttonCircle}
                onPress={() => navigation.navigate("Pix")}>
                    <MaterialCommunityIcons style={styles.icon} name="plus" size={24} color="#000"/>
            </Pressable>

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
            <Text style={{fontSize:13, }} > Ver todos</Text>

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