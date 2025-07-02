import {View, Text, TouchableOpacity} from "react-native"
import { Avatar } from "react-native-paper"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "./Style";


export function CarouselProfile({item, navigation}){
    return(
        <TouchableOpacity onPress={() => navigation.navigate("ScreenSend")}>
            <View 
            style={styles.blocoCard}>
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