import { View, Text, TextInput, Pressable} from "react-native"
import styles from "../components/Style"


export function Transaction(){
    return(
        <View style={styles.container}>
            <TextInput placeholder="Valor"/>

            <Pressable>
                <Text>Transferir</Text>
            </Pressable>
        </View>
    )
}