import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = async (jwt) => {
    await AsyncStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem("token");
      if (stored) setToken(stored);
    };
    load();
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
