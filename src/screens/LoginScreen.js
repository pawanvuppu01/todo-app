import { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import { loginRequest } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill email and password");
    setLoading(true);
    try {
      const res = await loginRequest({ email, password });
      login(res.data.access_token, res.data.user);
    } catch (e) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <InputField label="Email" placeholder="email@example.com" value={email} onChangeText={setEmail} />
      <InputField label="Password" placeholder="Password" secure value={password} onChangeText={setPassword} />

      <ButtonPrimary label="Login" onPress={handleLogin} loading={loading} />

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
