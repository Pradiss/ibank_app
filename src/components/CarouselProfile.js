import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./Style";

export function CarouselProfile({ item, navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("ScreenSend")}>
      <View style={styles.blocoCard}>
        <Avatar.Image
          size={46}
          source={require("../images/avatar.png")}
          style={{ alignSelf: "flex-start",backgroundColor:"#232323" }}
        />
        <Text style={{ fontSize: 14, fontWeight: 600 }}>{item.recebedor_name?.trim().split(/\s+/)[0]}</Text>
      </View>
    </TouchableOpacity>
  );
}
