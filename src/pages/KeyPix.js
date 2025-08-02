import { View, Text, Pressable, Image, TextInput,TouchableWithoutFeedback,Keyboard } from "react-native";
import styles from "../components/Style";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";


export default function KeyPix({ navigation }) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View
                    style={{
                        paddingBottom: 32,
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                    }}
                >
                    <Image
                        source={require("../images/LogoGreen.png")}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                    />
                    <Text style={styles.titleLogo}>iBank</Text>
                </View>

                <Pressable
                    onPress={() => navigation.navigate("Editar Chave")}
                    style={[
                        styles.buttonPerfil,
                        { flexDirection: "row", justifyContent: "center", gap: 8 },
                    ]}
                >
                    <MaterialCommunityIcons
                        style={styles.icon}
                        name="key-outline"
                        size={24}
                        color="#000"
                    />
                    <Text style={styles.textButtonPerfil}>Editar Chave</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("Cadastrar Chave")}
                    style={[
                        styles.buttonPerfil,
                        { flexDirection: "row", justifyContent: "center", gap: 8 },
                    ]}
                >
                    <MaterialIcons
                        style={styles.icon}
                        name="key"
                        size={24}
                        color="#000"
                    />
                    <Text style={styles.textButtonPerfil}>Cadastrar Chave</Text>
                </Pressable>

                {/* <Pressable
                    onPress={() => navigation.navigate("RegisterKey")}
                    style={[
                        styles.buttonPerfil,
                        { flexDirection: "row", justifyContent: "center", gap: 8 },
                    ]}
                >
                    <MaterialIcons
                        style={styles.icon}
                        name="key"
                        size={24}
                        color="#000"
                    />
                    <Text style={styles.textButtonPerfil}>Cadastrar Chave Aleatória</Text>
                </Pressable> */}

                <Pressable
                    onPress={() => navigation.navigate("Chaves Pix")}
                    style={[
                        styles.buttonPerfil,
                        { flexDirection: "row", justifyContent: "center", gap: 8 },
                    ]}
                >
                    <MaterialCommunityIcons
                        style={styles.icon}
                        name="heart-circle"
                        size={24}
                        color="#000"
                    />
                    <Text style={styles.textButtonPerfil}>Chaves Salvas</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    );
}
