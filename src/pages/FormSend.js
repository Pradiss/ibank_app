import {View,Text, TextInput, Pressable} from "react-native"
import styles from "../components/Style"

export default  function FormSend(){
    return(
        <View>
             <View style={styles.containerTransaction}>
                <Text>Qual é o valor da transferencia?</Text>
                <TextInput style={styles.input} placeholder="Valor R$00,00 " ></TextInput>
                
        

                <Pressable style={styles.buttonTrasanction} onPress={() => navigation.navigate("Mytabs") }>
                  <Text style={{fontSize:18,color:"#fff"}} >Send</Text>
                </Pressable>

            </View>
      </View>
    )
}