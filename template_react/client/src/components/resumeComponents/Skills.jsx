import { Text, View, StyleSheet } from "@react-pdf/renderer";
// import { RoundedIcon } from "../rounded-icon";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "OpenSans",
    fontSize: 10,
  },
  description: {
    fontFamily: "OpenSans",
    fontSize: 8,
    marginTop: 2,
  },
});

export function Insight({ style, title, description, iconName }) {
  
  let skills = description.toString().replace(/,[s]*/g, ", ");

  return (
    <View style={[styles.container, style]}>
      {/* {iconName && (
        <RoundedIcon
          size={18}
          name={iconName}
          color={theme.colors.primary}
          style={{ marginRight: 6 }}
        />
      )} */}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.description, { color: "#2d3c42" }]}>{skills}</Text>
      </View>
    </View>
  );
}
