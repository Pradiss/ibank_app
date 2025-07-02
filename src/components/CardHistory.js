import {View, Text, TouchableOpacity} from "react-native"
import { Avatar } from "react-native-paper"



export function CardHistory({item,navigation}){
    return(
        <TouchableOpacity onPress={() => navigation.navigate("Extrato")}>
            <View style={{flexDirection:"row", alignItems:"center", marginBlock:18, gap:10}}>
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
                <View style={{borderBottomColor: '#ccc',borderBottomWidth:1,marginVertical: 10,}}/>
        </TouchableOpacity>
    )
}