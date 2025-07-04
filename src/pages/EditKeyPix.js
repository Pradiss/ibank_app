import {View,Text , Pressable, Image, TextInput} from "react-native"
import styles from "../components/Style"

export default  function EditKeyPix({navigation}){
    return(
        <View style={styles.container}>

            <View style={{ paddingBottom:32, flexDirection:"row", gap:0, alignItems:"center"}}>
                <Image
                    source={require('../images/LogoGreen.png')}
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                        />
                <Text style={styles.titleLogo} >iBank</Text>
            </View>
 
            {/* <Image
                source={require('../images/pig.png')}
                style={{ width: 200, height: 200, paddingBlock:32, }}
                resizeMode="contain"
                    />  */}

            <TextInput style={styles.input} placeholder="Chave pix antiga" />

            <TextInput style={styles.input} placeholder="Chave pix nova"/>

            
            <Pressable style={styles.buttonLogin} onPress={() => navigation.navigate("MyTabs") }>
                  <Text style={{fontSize:18,color:"#fff"}} > Editar chave</Text>
            </Pressable>
            
            
        </View>
    )
}