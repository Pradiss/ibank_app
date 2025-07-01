import {View, Text, TouchableOpacity} from "react-native"
import styles from "./Style"
import { Avatar } from "react-native-paper"
import { MaterialCommunityIcons } from '@expo/vector-icons';


export function CardCategory({item}){
    return(
         <TouchableOpacity onPress={() => navigation.navigate("")}>
            <View 
            style={styles.cardCategory}>
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