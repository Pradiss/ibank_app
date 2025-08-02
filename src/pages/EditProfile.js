import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Alert,
    TextInput,
    Pressable,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import styles from "../components/Style";
import { apiClient } from "../Services/Api";
import { useIsFocused } from "@react-navigation/native";
import { formatCPF, formatPhone } from "../mask/mascara";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfile({ navigation }) {
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
   
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [cpf, setCpf] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [location, setLocation] = useState("");
    const [cep, setCep] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    const isFocused = useIsFocused()

    const Edit = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            const id = await AsyncStorage.getItem("id_client")
            const response = await apiClient.put(
                `/${id}`,
                {
                    name,
                    email,
                    password,
                    phone,
                    cpf,
                    street,
                    number,
                    location,
                    cep,
                    city,
                    state,
                    country,
                },

                {
                    headers: {
                        "id-bank": "2",
                        "Authorization" : `Bearer ${token}`
                    },
                }
            );
            navigation.navigate("MyTabs", {screen: "Profile"});

          
        } catch (error) {
            Alert.alert("Erro ao Editar Perfil", error);
        }
    };

    const LoadingUsers = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            const id = await AsyncStorage.getItem("id_client")
            const res = await apiClient.get(`/${id}`, {
                headers: {
                    "id-bank": "02",
                    "Authorization": `Bearer ${token}`
                },
            });
            
            setName(res.data.name)
            setEmail(res.data.email)
            setPassword(res.data.password)
            setPhone(res.data.phone)
            setCpf(res.data.cpf)
            setStreet(res.data.street)
            setNumber(res.data.number)
            setLocation(res.data.location)
            setCep(res.data.cep)
            setCity(res.data.city)
            setState(res.data.state)
            setCountry(res.data.country)
        } catch (e) {
            Alert.alert("Erro ao carregar Historico", e);
        }
        
    };


    const cepChange = async (cepValue) => {
        setCep(cepValue); 
      
        const rawCep = cepValue.replace(/\D/g, "");
      
        if (rawCep.length === 8) {
          try {
            const response = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
            const data = await response.json();
      
            if (!data.erro) {
              setStreet(data.logradouro || "");
              setLocation(data.bairro || "");
              setCity(data.localidade || "");
              setState(data.uf || "");
            }
          } catch (erro) {
            console.warn("Erro ao consultar CEP:", erro);
          }
        }
      };
      

    useEffect(() => {
        if(isFocused){
            LoadingUsers()
        }

    },[isFocused])


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 40 }}>
                    <View style={{ alignItems: "center" }}>

                        <Image
                            source={require("../images/LogoGreen.png")}
                            style={{ width: 40, height: 40, marginBlock: 16, }}
                            resizeMode="contain"
                        />

                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Seu nome"
                            placeholderTextColor="#888"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Seu E-mail"
                            placeholderTextColor="#888"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Sua Senha"
                            placeholderTextColor="#888"
                            value={password}
                            onChangeText={setPassword}
                        />


                        <View
                            style={{ flexDirection: "row", gap: 16, paddingHorizontal: 6 }}
                        >
                            <TextInput

                                value={cpf}
                                placeholder="Digite seu cpf"
                                placeholderTextColor="#888"
                                onChangeText={(text) => setCpf(formatCPF(text))}
                                style={[styles.input, { width: "50%" }]}
                            />

                            <TextInput
                                style={[styles.input, { width: "50%" }]}
                                placeholder="Telefone"
                                placeholderTextColor="#888"
                                value={phone}
                                onChangeText={(text) => setPhone(formatPhone(text))}
                                keyboardType="phone-pad"
                            />
                        </View>

                        <View
                            style={{ flexDirection: "row", paddingHorizontal: 6, gap: 16 }}
                        >
                            <TextInput
                                style={[styles.input, { width: "60%" }]}
                                placeholder="Nome da Rua "
                                placeholderTextColor="#888"
                                value={street}
                                onChangeText={setStreet}
                            />
                            <TextInput
                                placeholder="CEP"
                                value={cep}
                                onChangeText={(text) => {
                                    setCep(text)
                                    cepChange(text)
                                  }}
                                style={[styles.input, { width: "40%" }]}
                            />
                        </View>

                        <View
                            style={{ flexDirection: "row", paddingHorizontal: 6, gap: 16 }}
                        >
                            <TextInput
                                style={[styles.input, { width: "70%" }]}
                                placeholder="Bairro"
                                placeholderTextColor="#888"
                                value={location}
                                onChangeText={setLocation}
                            />
                            <TextInput
                                placeholder="N°"
                                value={number}
                                onChangeText={setNumber}
                                keyboardType="numeric"
                                style={[styles.input, { width: "30%" }]}
                            />
                        </View>

                        <View
                            style={{ flexDirection: "row", paddingHorizontal: 6, gap: 16 }}
                        >
                            <TextInput
                                style={[styles.input, { width: "70%" }]}
                                placeholder="Cidade"
                                placeholderTextColor="#888"
                                value={city}
                                onChangeText={setCity}
                            />
                            <TextInput
                                style={[styles.input, { width: "30%" }]}
                                placeholder="Estado "
                                placeholderTextColor="#888"
                                value={state}
                                onChangeText={(text) =>
                                    setState(text.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2))
                                }
                            />
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Seu país"
                            placeholderTextColor="#888"
                            value={country}
                            onChangeText={setCountry}
                        />

                        <Pressable style={styles.buttonLogin} onPress={Edit}>
                            <Text style={{ fontSize: 18, color: "#fff" }}>Editar Perfil </Text>
                        </Pressable>

                        <Text  onPress={() => navigation.navigate("MyTabs",{screen:"Perfil"})}
                        style={{ fontSize: 14, marginTop: 16, fontWeight: 400, textDecorationLine: "underline" }}>
                            Voltar ao perfil
                        </Text>

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
