import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import { MaterialIcons } from "@expo/vector-icons";

export default function TodoItem({ item, onComplete }) {
  const scale = React.useRef(new Animated.Value(1)).current;
  const animate = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.98, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };
  const renderRight = () => (
    <View style={styles.completeBox}>
      <MaterialIcons name="check" size={22} color="#fff" />
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRight} onSwipeableOpen={() => { animate(); onComplete(); }}>
      <Animated.View style={[styles.card, item.completed && styles.completed, { transform: [{ scale }] }]}> 
        <TouchableOpacity style={styles.left} onPress={() => { animate(); onComplete(); }}>
          {item.completed ? (
            <View style={styles.checked}><MaterialIcons name="check" size={20} color="#fff"/></View>
          ) : (
            <View style={styles.circle} />
          )}
        </TouchableOpacity>
        <Text style={[styles.text, item.completed && styles.textCompleted]}>{item.title}</Text>
      </Animated.View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 14,
    marginVertical: spacing.sm,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  completed: {
    opacity: 0.5,
  },
  text: {
    fontSize: 17,
    color: colors.text,
    flex: 1,
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
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  checked: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.success,
    justifyContent: "center",
    alignItems: "center",
  },
  left: {
    marginRight: spacing.md,
    padding: 2,
  },
  textCompleted: {
    textDecorationLine: "line-through",
    color: colors.subtext,
  },
});
