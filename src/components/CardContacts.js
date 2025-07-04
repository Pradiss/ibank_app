import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./Style";

export function CardContacts({ item, navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("ScreenSend")}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBlock: 12,
          gap: 14,
        }}
      >
        <Avatar.Image
          size={50}
          source={require("../images/avatar.png")}
          style={{ alignSelf: "flex-start",backgroundColor:"#232323" }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>{item.name}</Text>
        </View>
        <MaterialCommunityIcons
          style={styles.icon}
          name="star-outline"
          size={24}
          color="#000"
        />
      </View>
    </TouchableOpacity>
  );
}
