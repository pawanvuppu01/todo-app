
import axios from "axios";
import getApiBaseUrl from "./config";

const API = process?.env?.REACT_NATIVE_API_URL || getApiBaseUrl;

export const signupRequest = (data) => axios.post(\`\${API}/auth/signup\`, data);
export const loginRequest = (data) => axios.post(\`\${API}/auth/login\`, data);
