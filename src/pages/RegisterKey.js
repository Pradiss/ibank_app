import { View, Text, Pressable, Image, TextInput } from "react-native";
import styles from "../components/Style";

export default function RegisterKey({ navigation }) {

    const [key, setKey] = useState([])

    return (
        <View style={styles.container}>
            <View
                style={{
                    paddingBottom: 32,
                    flexDirection: "row",
                    gap: 0,
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

            <Text style={styles.titleHome}>
                Cadastre sua nova chave PIX
            </Text>
            
            <TextInput
                style={[styles.input, { marginTop: 16 }]}
                placeholder="Nome, CPF/CNPJ ou chave pix"
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Chave pix"
                placeholderTextColor="#888"
            />

            <Pressable
                style={styles.buttonLogin}
                onPress={() => navigation.navigate("MyTabs")}
            >
                <Text style={{ fontSize: 18, color: "#fff" }}> Editar chave</Text>
            </Pressable>
        </View>
    );
}
