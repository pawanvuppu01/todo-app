import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, RefreshControl } from "react-native";
import TodoItem from "../components/TodoItem";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import { getTodos, addTodo, completeTodo } from "../api/todos";
import { AuthContext } from "../context/AuthContext";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";

export default function DashboardScreen({ navigation }) {
  const { token, user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadTodos = async () => {
    setLoading(true);
    try {
      const res = await getTodos(token);
      setTodos(res.data);
    } catch (e) {
      alert("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  const [creating, setCreating] = useState(false);
  const create = async () => {
    if (!task.trim()) return alert("Please enter a task title");
    setCreating(true);
    try {
      await addTodo(task, token);
      setAddModal(false);
      setTask("");
      await loadTodos();
    } catch (e) {
      alert("Failed to create task");
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (token) loadTodos();
  }, [token]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTodos();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Your Tasks</Text>
        <TouchableOpacity style={styles.profile} onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.profileText}>{user?.email?.charAt(0).toUpperCase() || "U"}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <TodoItem item={item} onComplete={() => completeTodo(item.id, token).then(loadTodos)} />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{loading ? "Loading..." : "No tasks yet — add a task!"}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setAddModal(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal visible={addModal} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>New Task</Text>
            <InputField label="Title" placeholder="What’s the plan?" value={task} onChangeText={setTask} />
            <Text style={{ color: colors.subtext, textAlign: 'right', marginTop: 6 }}>{task.length}/100</Text>

            <View>
              <ButtonPrimary label={creating ? "Adding…" : "Add"} onPress={create} loading={creating} />
              <ButtonPrimary label="Cancel" onPress={() => setAddModal(false)} variant="outline" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.title,
    fontWeight: "700",
    marginBottom: spacing.lg,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    backgroundColor: colors.card,
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 18,
    color: colors.text,
    fontWeight: "600",
  },
  empty: { marginTop: 80, alignItems: "center" },
  emptyText: { color: colors.subtext, fontSize: 16 },
  modalBtnDisabled: { opacity: 0.6 },
  fabText: {
    fontSize: 36,
    color: "#FFF",
  },
  modalBg: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: "#FFF",
    padding: spacing.lg,
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: spacing.md,
  },
  modalBtn: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    marginTop: spacing.md,
  },
  modalBtnText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
  },
  close: {
    marginTop: spacing.md,
    textAlign: "center",
    color: colors.danger,
    fontSize: 16,
  },
});
