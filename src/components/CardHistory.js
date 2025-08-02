import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

export function CardHistory({ item, navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Extrato", {item})}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBlock: 18,
          gap: 10,
        }}
      >
        <Avatar.Image
          size={50}
          source={require("../images/avatar.png")}
          style={{ alignSelf: "flex-start", backgroundColor: "#232323" }}
        />

        <View style={{ flex: 1, gap: 4 }}>
          <Text style={{ fontSize: 19, marginBottom: 4, fontWeight: 600 }}>
            Pix enviado
          </Text>
          <Text style={{ fontSize: 16, color: "#555" }}>
            {item.recebedor_name}
          </Text>
        </View>

        <View style={{flex:1, alignItems: "flex-end"  ,gap:8}}>
          <Text style={{ color: "#000", fontSize: 16 }}>R${item.valor}</Text>
          <Text style={{ color: "#555", fontSize: 14 }}>{item.data_hora}</Text>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          marginVertical: 10,
        }}
      />
    
    </TouchableOpacity>
  );
}
