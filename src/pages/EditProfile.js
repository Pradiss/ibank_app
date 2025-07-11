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

export default function EditProfile({ navigation }) {
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState([]);
   
    const [name, setName] = useState([]);
    const [phone, setPhone] = useState([]);
    const [cpf, setCpf] = useState([]);
    const [street, setStreet] = useState([]);
    const [number, setNumber] = useState([]);
    const [location, setLocation] = useState([]);
    const [cep, setCep] = useState([]);
    const [city, setCity] = useState([]);
    const [state, setState] = useState([]);
    const [country, setCountry] = useState([]);

    const Edit = async () => {
        try {
            const response = await apiClient.put(
                "/",
                {
                    name,
                    email,
                   
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
                    },
                }
            );
            navigation.navigate("Login");

            navigation.reset({
                index: 0,
                routes: [{ name: "MyTabs" }],
            });
        } catch (error) {
            Alert.alert("Erro ao criar um Usuario", error);
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
            setUsers(res.data);
        } catch (e) {
            Alert.alert("Erro ao carregar Historico", e);
        }
        LoadingUsers();
    };



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 70 }}>
                    <View style={{ alignItems: "center" }}>

                        <Image
                            source={require("../images/LogoGreen.png")}
                            style={{ width: 40, height: 40, marginBlock: 32, }}
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

                        {/* <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            placeholderTextColor="#888"
                            value={password}
                            secureTextEntry //esconde a senha enquanto escreve
                            onChangeText={setPassword}
                        /> */}

                        <View
                            style={{ flexDirection: "row", gap: 16, paddingHorizontal: 6 }}
                        >
                            <TextInput

                                value={cpf}
                                placeholder="Digite seu cpf"
                                placeholderTextColor="#888"
                                onChangeText={formatCPF(setCpf)}
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
                                onChangeText={setCep}
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
                                    setState(text.replace(/[^a-zA-Z]/g, "").toUpperCase(0, 2))
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

                        <Text style={{ fontSize: 14, marginTop: 16, fontWeight: 400, textDecorationLine: "underline" }}>
                            Voltar ao perfil
                        </Text>

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
