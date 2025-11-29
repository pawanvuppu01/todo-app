import axios from "axios";
const API = "http://127.0.0.1:8000";

export const getTodos = (token) =>
  axios.get(\`\${API}/todos\`, { headers: { token } });

export const addTodo = (title, token) =>
  axios.post(\`\${API}/todos\`, { title }, { headers: { token } });

export const completeTodo = (id, token) =>
  axios.patch(\`\${API}/todos/\${id}\`, {}, { headers: { token } });
