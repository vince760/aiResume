import * as React from "react";
import { Text, View, StyleSheet, Link, Font } from "@react-pdf/renderer";
import IconText from "./IconText.jsx";
import DateRange from "./DateRange.jsx";
import Quicksand from "../../fonts/Quicksand_Book_Oblique.otf";
import OpenSans from "../../fonts/OpenSans_Condensed-Light.ttf";
Font.register({
  family: "Quicksand",
  fonts: [{ src: Quicksand }],
});
Font.register({
  family: "OpenSans",
  fonts: [{ src: OpenSans }],
});

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: "Quicksand",
    fontWeight: "bold",
  },
  metaInfoContainer: {
    flexDirection: "row",
    marginTop: 4,
    alignItems: "center",
  },
  workPlace: {
    fontSize: 10,
    fontFamily: "Quicksand",
    fontWeight: "bold",
  },
  description: {
    fontSize: 8,
    fontFamily: "OpenSans",
    marginTop: 4,
  },
  content: {
    marginTop: 10,
  },
});

const Title = ({ children, style }) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};

const WorkPlace = ({ children, url, style }) => {
  const commonStyle = [styles.workPlace, { color: "#2d3c42" }, style];

  if (url) {
    return (
      <Link src={url}>
        <Text style={commonStyle}>{children}</Text>
      </Link>
    );
  }

  return <Text style={commonStyle}>{children}</Text>;
};

export const WorkPost = ({
  style,
  title,
  companyName,
  companyUrl,
  location,

  description,
  children,
  dateRange,
}) => {
  return (
    <View style={style}>
      <Title>{title}</Title>
      <View style={styles.metaInfoContainer}>
        {companyName ? (
          <WorkPlace url={companyUrl}>{companyName}</WorkPlace>
        ) : null}
        <DateRange
          style={{ marginLeft: companyName ? "auto" : 0, marginRight: 16 }}
          dateRange={dateRange}
        />
        <IconText text={location} iconName="location" />
      </View>
      {description && (
        <Text style={[styles.description, { color: "#2d3c42" }]}>
          {description}
        </Text>
      )}
      {React.Children.count(children) > 0 ? (
        <View style={styles.content}>{children}</View>
      ) : null}
    </View>
  );
};

WorkPost.Title = Title;

WorkPost.WorkPlace = WorkPlace;
