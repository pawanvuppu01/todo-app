import { TextInput, StyleSheet } from "react-native";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function InputField({ placeholder, value, onChangeText, secure }) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      secureTextEntry={secure}
      onChangeText={onChangeText}
      placeholderTextColor={colors.subtext}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 12,
    fontSize: 17,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
});
