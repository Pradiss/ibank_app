import {View, Text, TouchableOpacity} from "react-native"
import { Avatar } from "react-native-paper"



export function CardHistory({item}){
    return(
        <TouchableOpacity onPress={() => navigation.navigate("")}>
            <View style={{flexDirection:"row", alignItems:"center", marginBlock:12, gap:10}}>
                <Avatar.Image 
                    size={50} 
                    source={{uri: item.foto}} 
                    style={{ alignSelf: 'flex-start' }}     
                />
                <View style={{flex:1}}>
                    <Text style={{fontSize:16, marginBottom:4,fontWeight:600 }}>{item.nome}</Text>
                    <Text style={{fontSize:14,color:"#a1a1a1"}}>{item.email}</Text>
                </View>
                <Text style={{color:"red",fontSize:16,}}>-${item.preco}</Text>
            </View>
        </TouchableOpacity>
    )
}