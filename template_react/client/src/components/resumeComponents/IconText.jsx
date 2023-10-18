import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { Icon } from "./Icon";
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "Oswald",
    fontSize: 8,
    marginLeft: 4,
  },
});

export default function IconText({ style, text, iconName }) {
  return (
    <View style={[styles.container, style]}>
      <Icon size={10} name={iconName} />
      <Text style={[styles.text, { color: "#929596" }]}>{text}</Text>
    </View>
  );
}
