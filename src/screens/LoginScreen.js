import { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import { loginRequest } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginRequest({ email, password });
      login(res.data.access_token);
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField placeholder="Password" secure value={password} onChangeText={setPassword} />

      <ButtonPrimary label="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Create an Account</Text>
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
