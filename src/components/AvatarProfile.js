import react,{useEffect, useState} from "react"
import { View, Text, TouchableOpacity} from "react-native" 
import { Avatar } from "react-native-paper"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "../components/Style"

export default function AvatarProfile(){

    const [users,setUsers] = useState("")


    return(
        <View style={{flexDirection:"row", marginBlock:8, alignItems:"center", justifyContent:"space-between" }}>
            
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <View style={{flexDirection:"row",justifyContent:"center"}}>
                <Avatar.Image 
                size={50} 
                source={require('../images/avatar.png')} 
                style={{ alignSelf: 'flex-start' }}     
                />
                <View style={{justifyContent:"center", padding:8,}}>
                     <Text >Welcome</Text>
                    <Text  style={{fontSize: 18, fontWeight: 'bold', marginTop:4}} onPress={() => navigation.navigate("Profile")}> Hi, Erick </Text>
                </View>
        </View>
        </TouchableOpacity>
       
        <View style={{flexDirection:"row",gap:8}}>
            <MaterialCommunityIcons style={styles.icon} name="eye" size={24} color="#000"
            onPress={() => navigation.navigate("Notification")}
            />
            
            <MaterialCommunityIcons style={styles.icon} name="bell" size={24} color="#000"
            onPress={() => navigation.navigate("Notification")}
            />

        </View>
        </View>
    )
}