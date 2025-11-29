import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import { AuthContext } from "../context/AuthContext";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";

export default function ProfileScreen({ navigation }) {
  const { logout, user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user && <Text style={styles.email}>{user.email}</Text>}

      <ButtonPrimary label="Log Out" onPress={logout} variant="danger" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.title,
    fontWeight: "700",
    marginBottom: spacing.xl,
  },
  email: {
    fontSize: 16,
    color: colors.subtext,
    marginBottom: spacing.lg,
  },
  btn: {
    backgroundColor: colors.danger,
    padding: spacing.md,
    borderRadius: 12,
  },
  btnText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
  },
});
