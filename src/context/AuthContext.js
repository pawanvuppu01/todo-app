import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import getApiBaseUrl from "../api/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (jwt, userObj = null) => {
    await AsyncStorage.setItem("token", jwt);
    setToken(jwt);
    if (userObj) setUser(userObj);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem("token");
      if (stored) {
        setToken(stored);
        try {
          const res = await axios.get(`${getApiBaseUrl}/auth/me`, { headers: { Authorization: `Bearer ${stored}` } });
          setUser(res.data);
        } catch (e) {
          // ignore
        }
      }
    };
    load();
  }, []);

  // Debug helper: log API base URL so it's clear what the app will call while developing.
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(`[AuthContext] API Base: ${getApiBaseUrl}`);
  }

  // Set axios base URL for convenience
  axios.defaults.baseURL = getApiBaseUrl;

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
