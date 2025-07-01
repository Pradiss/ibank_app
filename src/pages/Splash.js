import react, {useState,useEffect} from "react"
import {View, Text, Image} from "react-native" 
import styles from "../components/Style"
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function Splash({navigation}){

    useEffect(() =>{
        const timer = setTimeout(() =>{
            navigation.replace('Create')
        }, 2400)
        
        return() => clearTimeout(timer)
    },[])
    return(
        <View style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:"#1FAA8E"}}>
            <Text style={styles.titleLogo}>iBank</Text>
            <ActivityIndicator type={"large"} animating={true} color={"white"} />
        </View>
    )
}