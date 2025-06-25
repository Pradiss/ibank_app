import {View, Text, TouchableOpacity} from "react-native"
import { Avatar } from "react-native-paper"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "./Style";


export function CarouselProfile({item}){
    return(
        <TouchableOpacity onPress={() => navigation.navigate("")}>
            <View 
            style={{flexDirection:"row",
                    alignItems:"center",
                    marginBlock:8,
                    gap:8,
                    borderRadius:50,
                    borderWidth:1,
                    borderColor:"#ccc",
                    paddingHorizontal:6,
                    paddingRight:26,
                    paddingBlock:6,
                    marginHorizontal:8,
                    
                    }}>

                <Avatar.Image 
                    size={46} 
                    source={{uri: item.foto}} 
                    style={{ alignSelf: 'flex-start' }}     
                />
                <Text style={{fontSize:14 }}>{item.nome.split(" ")[0]}</Text>
            </View>
        </TouchableOpacity>
    )
}