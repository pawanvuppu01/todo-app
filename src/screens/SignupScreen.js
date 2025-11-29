import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import { signupRequest } from "../api/auth";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const submit = async () => {
    if (!email || !password) return alert("Please fill the fields");
    setLoading(true);
    try {
      await signupRequest({ email, password });
      alert("Account created!");
      navigation.replace("Login");
    } catch (e) {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <InputField label="Email" placeholder="email@example.com" value={email} onChangeText={setEmail} />
      <InputField label="Password" placeholder="Strong password" secure value={password} onChangeText={setPassword} />

      <ButtonPrimary label="Sign Up" onPress={submit} loading={loading} />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.title,
    fontWeight: "700",
    marginBottom: spacing.xl,
  },
  link: {
    marginTop: spacing.md,
    color: colors.primary,
    textAlign: "center",
  },
});
