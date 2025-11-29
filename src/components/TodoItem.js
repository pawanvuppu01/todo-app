import { View, Text, StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function TodoItem({ item, onComplete }) {
  const renderRight = () => (
    <View style={styles.completeBox}>
      <Text style={styles.completeText}>Complete</Text>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRight} onSwipeableOpen={onComplete}>
      <View style={[styles.card, item.completed && styles.completed]}>
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 12,
    marginVertical: spacing.sm,
    elevation: 2,
  },
  completed: {
    opacity: 0.4,
  },
  text: {
    fontSize: 17,
    color: colors.text,
  },
  completeBox: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  completeText: {
    color: "#FFF",
    fontSize: 16,
  },
});
