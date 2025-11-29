import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import { signupRequest } from "../api/auth";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      await signupRequest({ email, password });
      alert("Account created!");
      navigation.replace("Login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField placeholder="Password" secure value={password} onChangeText={setPassword} />

      <ButtonPrimary label="Sign Up" onPress={submit} />

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
    fontSize: 32,
    fontWeight: "700",
    marginBottom: spacing.xl,
  },
  link: {
    marginTop: spacing.md,
    color: colors.primary,
    textAlign: "center",
  },
});
