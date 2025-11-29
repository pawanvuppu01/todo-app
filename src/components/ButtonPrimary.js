import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function ButtonPrimary({ label, onPress, loading, variant = "primary" }) {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        variant === "outline" && styles.outline,
        variant === "danger" && styles.danger,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.label, variant === "outline" && styles.outlineLabel]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 14,
    marginTop: spacing.md,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 3,
  },
  outline: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  label: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
  },
  outlineLabel: {
    color: colors.text,
  },
});
