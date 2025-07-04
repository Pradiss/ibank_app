import react, { useEffect, useState } from "react-native";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import styles from "../components/Style";

export default function FormRegister({ navigation }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    cpf: "",
    street: "",
    number: "",
    location: "",
    cep: "",
    city: "",
    state: "",
    country: "",
  });

  const nextPass = () => {
    if (step < 4) setStep(step + 1);
  };
  const passBefore = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const confirm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
            />
          </>
        );
    }
  };

  // #34E167 color verder
  return (
    <View style={styles.backgroundScreen}>
      <View>
        <Image
          source={require("../images/pig.png")}
          style={{ width: 250, height: 350, paddingTop: 50 }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.backgroundScreenBlack}>
        <Pressable
          style={styles.buttonForm}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ fontSize: 18 }}>Criar uma conta </Text>
        </Pressable>

        <View
          style={{ flexDirection: "row", paddingBottom: 50, paddingTop: 12 }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
              marginTop: 16,
              fontWeight: 400,
            }}
          >
            Já tem uma conta?
          </Text>
          <Text
            style={{
              color: "#34E167",
              fontSize: 15,
              marginTop: 16,
              fontWeight: 400,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            {" "}
            Login
          </Text>
        </View>

        <Image
          source={require("../images/LogoGreen.png")}
          style={{ width: 90, height: 40 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
