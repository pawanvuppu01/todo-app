import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import TodoItem from "../components/TodoItem";
import InputField from "../components/InputField";
import { getTodos, addTodo, completeTodo } from "../api/todos";
import { AuthContext } from "../context/AuthContext";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function DashboardScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [task, setTask] = useState("");

  const loadTodos = async () => {
    const res = await getTodos(token);
    setTodos(res.data);
  };

  const create = async () => {
    await addTodo(task, token);
    setAddModal(false);
    setTask("");
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tasks</Text>

      <FlatList
        data={todos}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <TodoItem item={item} onComplete={() => completeTodo(item.id, token).then(loadTodos)} />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setAddModal(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal visible={addModal} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>New Task</Text>

            <InputField placeholder="Task title" value={task} onChangeText={setTask} />

            <TouchableOpacity style={styles.modalBtn} onPress={create}>
              <Text style={styles.modalBtnText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAddModal(false)}>
              <Text style={styles.close}>Cancel</Text>
            </TouchableOpacity>
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
    fontSize: 32,
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
