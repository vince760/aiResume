import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingBottom: 65,
    textAlign: "center",
    color: "black",
  },

  page: {
    color: "black",

    alignContent: "center",
    alignItems: "center",
    margin: "auto",

    textAlign: "center",
  },

  title: {
    color: "black",
    fontSize: 24,
    fontFamily: "Oswald",
    textAlign: "bottom",
  },
  position: {
    color: "black",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
    objectPosition: "center",
  },

  borderBox: {
    border: "2px solid black",
    textAlign: "center",
    justifyContent: "center",
    paddingHorizontal: "130px",
    marginTop: "20px",
    alignItems: "center",
  },

  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },

  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },

  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },

  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },

  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export { styles };
