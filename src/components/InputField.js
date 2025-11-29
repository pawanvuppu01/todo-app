import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import typography from "../theme/typography";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function InputField({ label, placeholder, value, onChangeText, secure, error }) {
  const [isFocused, setFocused] = React.useState(false);
  return (
    <View style={{ marginBottom: spacing.md }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        value={value}
        secureTextEntry={secure}
        onChangeText={onChangeText}
        placeholderTextColor={colors.subtext}
        style={[styles.input, isFocused && styles.focused, error && styles.error]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
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
  label: {
    marginBottom: spacing.xs,
    color: colors.subtext,
    fontSize: typography.small,
  },
  focused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  error: {
    borderColor: colors.danger,
  },
  errorText: {
    marginTop: 4,
    color: colors.danger,
    fontSize: 13,
  },
});
