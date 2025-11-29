import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function ButtonPrimary({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    marginTop: spacing.md,
  },
  label: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
