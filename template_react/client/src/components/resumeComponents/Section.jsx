import * as React from "react";

import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 9,
    textTransform: "uppercase",
    fontFamily: "Quicksand",
    fontWeight: "bold",
  },
  separator: {
    height: 2,
    marginTop: 1,
    marginBottom: 12,
  },
});

export default function Section  ({ style, title, spacing, children })  {
  const childCount = React.Children.count(children);

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, { color: "#2d3c42" }]}>{title}</Text>
      <View style={[styles.separator, { backgroundColor: "#2d3c42" }]} />
      {React.Children.map(children, (child, index) => {
        const mb = index + 1 === childCount ? 0 : spacing;
        const style = { marginBottom: mb };

        // @ts-expect-error
        return mb ? React.cloneElement(child, { style }) : child;
      })}
    </View>
  );
};
