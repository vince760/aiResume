import * as React from "react";
import { View } from "@react-pdf/renderer";
import { WorkPost } from "./WorkPost";
import IconText from "./IconText";
import DateRange from "./DateRange";

export const EducationPost = ({
  style,
  title,
  almaMater,
  startAt,
  endAt,
  location,
  children,
  dateRange,
}) => {
  return (
    <View style={style}>
      <WorkPost.Title>{title}</WorkPost.Title>
      <WorkPost.WorkPlace style={{ marginTop: 4, marginBottom: 4 }}>
        {almaMater}
      </WorkPost.WorkPlace>
      <DateRange style={{ marginBottom: 4 }} dateRange={dateRange} />
      <IconText
        style={{ marginBottom: 4 }}
        iconName="location"
        text={location}
      />
      <View style={{ marginTop: 8 }}>{children}</View>
    </View>
  );
};
