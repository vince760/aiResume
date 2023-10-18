import * as React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    fontFamily: "OpenSans",
    fontSize: 10,
  },
});

export const Resume = ({ children, style }) => {
  return (
    <Text style={[styles.container, { color: "#2d3c42" }, style]}>
      {children}
    </Text>
  );
};
