import axios from "axios";
import getApiBaseUrl from "./config";

const API = process?.env?.REACT_NATIVE_API_URL || getApiBaseUrl;

const authHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const getTodos = (token) => axios.get(`${API}/todos`, authHeader(token));

export const addTodo = (title, token) => axios.post(`${API}/todos`, { title }, authHeader(token));

export const completeTodo = (id, token) => axios.patch(`${API}/todos/${id}`, {}, authHeader(token));
