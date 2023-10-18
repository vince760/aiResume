import IconText from "./IconText";

export default function DateRange({ style, dateRange }) {
  return <IconText style={style} text={dateRange} iconName="calendar" />;
}
