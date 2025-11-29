import axios from "axios";
const API = "http://127.0.0.1:8000";

export const signupRequest = (data) => axios.post(\`\${API}/auth/signup\`, data);
export const loginRequest = (data) => axios.post(\`\${API}/auth/login\`, data);
