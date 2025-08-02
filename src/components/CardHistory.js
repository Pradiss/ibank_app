import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { formatReal } from "../mask/mascara";

export function CardHistory({ item, navigation, meuNome }) {
  const foiEnviado = item.pagador_name === meuNome;
  const statusTexto = foiEnviado ? "Pix enviado" : "Pix recebido";
  const valorTexto = `${foiEnviado ? "-" : "+ "}R$${formatReal(item.valor)}`;
  const corValor = foiEnviado ? "#D23B3B" : "#000"; // vermelho ou verde

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ResultExtrato")}>
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
          <Text style={{ fontSize: 19, marginBottom: 4, fontWeight: "600" }}>
            {statusTexto}
          </Text>
          <Text style={{ fontSize: 16, color: "#555" }}>
            {item.recebedor_name}
          </Text>
        </View>

        <View style={{ flex: 1, alignItems: "flex-end", gap: 8 }}>
          <Text style={{ fontSize: 16, color: corValor }}>{valorTexto}</Text>
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
