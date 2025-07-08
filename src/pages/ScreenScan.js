import { View, Text, TextInput } from "react-native";
import styles from "../components/Style";

export default function ScreenScan() {
  return (
    <View style={styles.container}>
      <Text>Digite o Codigo </Text>
      <TextInput placeholder="Digitar o codigo " style={styles.input} 
        placeholderTextColor="#888" />
    </View>
  );
}
