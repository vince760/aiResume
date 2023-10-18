import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Icon } from "./Icon";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 2,
  },
  text: {
    fontSize: 8,
    fontFamily: "OpenSans",
    flex: 1,
  },
});

export function ListItem({ style, children }) {
  return (
    <View style={[styles.container, style]}>
      <Icon name="dot" size={3.5} style={{ margin: 4, marginRight: 8 }} />
      <Text style={[styles.text, { color: "#2d3c42" }]}>
        {children.replace(/\xa0/g, " ")}
      </Text>
    </View>
  );
}
