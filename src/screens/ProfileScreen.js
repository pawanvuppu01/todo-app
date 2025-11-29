import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function ProfileScreen({ navigation }) {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity style={styles.btn} onPress={logout}>
        <Text style={styles.btnText}>Log Out</Text>
      </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: "700",
    marginBottom: spacing.xl,
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
