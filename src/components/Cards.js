import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Style";

export function Cards({ item }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("")}>
      <View style={styles.blocoCard}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
