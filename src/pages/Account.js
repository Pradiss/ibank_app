
import { View,Text, TextInput, Pressable, Image } from "react-native"
import styles from "../components/Style"

export default function Create({navigation}){
    return(
         <View style={styles.backgroundScreen}>
            <View>
                    
                 <Image
                source={require('../images/pig.png')}
                style={{ width: 250, height: 350, paddingTop:50, }}
                resizeMode="contain"
                    /> 
            </View>
            

            
            
           <View style={styles.backgroundScreenBlack}>
                          

                <Text style={{fontSize:42, color:"#fff", marginTop:16, fontWeight:600 , textAlign:"center"}}>
                    Bem vindo ao iBank
                    
                </Text>
                <Text style={{fontSize:18, color:"#c7c7c7", marginTop:16, fontWeight:400, textAlign:"center", marginBottom:36}}>
                   Cadastre-se
                </Text>
                
                    <Pressable style={{ 
                    borderRadius:20,
                    width:320,
                    height:55,
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor: "#34E167",
                    padding:8,
                    borderColor: "#fff",
                    shadowColor: "#000",
                    shadowOffset: { width: 2, height: 6 },
                    shadowOpacity: 0.15, 
                    shadowRadius: 3, 
                    elevation: 5,
                     }} onPress={()=> navigation.navigate("Register")}>
                    <Text style={{fontSize:18}}>Criar uma conta </Text>
                    
                </Pressable>

               
                <View style={{flexDirection:"row" ,paddingBottom:50,paddingTop:12}}>
                    <Text style={{color:"#fff",fontSize:14, marginTop:16, fontWeight:400}}>
                        Já tem uma conta?
                    </Text>
                    <Text 
                    style={{color:"#34E167",fontSize:15, marginTop:16, fontWeight:400}} 
                    onPress={() => navigation.navigate("Login")}> Login</Text>
                </View>
                     <Image
                    source={require('../images/LogoGreen.png')}
                    style={{ width: 90, height: 40 }}
                    resizeMode="contain"
                        />   
           </View>
        </View>
    )
}