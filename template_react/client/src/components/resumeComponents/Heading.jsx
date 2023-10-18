import { StyleSheet, Link, View, Text, Font } from "@react-pdf/renderer";
import IconText from "./IconText";
import Quicksand from "../../fonts/Quicksand_Book_Oblique.otf";
import QuickSandBold from "../../fonts/Quicksand_Bold_Oblique.otf";
Font.register({
  family: "Quicksand",
  fonts: [{ src: Quicksand }],
});
Font.register({
  family: "QuickSandBold",
  fonts: [{ src: QuickSandBold }],
});

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingBottom: 16,
    flexDirection: "row",
  },
  imageContainer: {
    position: "absolute",
    right: 0,
    top: -20,
  },
  image: {
    borderRadius: 99999,
  },
  title: {
    textTransform: "uppercase",
    fontSize: 20,
    fontFamily: "QuickSandBold",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: "QuickSandBold",
    fontWeight: "bold",
    color: "#FA0150",
  },
  infoContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  link: {
    marginRight: 16,
    textDecoration: "none",
    color: "#e9e9e9",
  },
});

export default function Heading({
  style,
  title,
  subtitle,
  avatarUrl,
  avatarSize = 100,
  subTitle,
  information: { phone, email, website, location },
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={{ margin: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.subTitle]}>{subtitle}</Text>
        <View style={styles.infoContainer}>
          <Link src={`tel:${phone}`} style={styles.link}>
            <IconText text={phone} iconName="call" />
          </Link>

          <Link src={`mailto:${email}`} style={styles.link}>
            <IconText text={email} iconName="atSymbol" />
          </Link>
          <Link src={website} style={styles.link}>
            <IconText text={website} iconName="linkedin" />
          </Link>
          <IconText text={location} iconName="location" />
        </View>
      </View>
    </View>
  );
}
