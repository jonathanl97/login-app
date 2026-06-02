import { useCallback } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authed, setAuthed] = useState(null);

  const login = () => {
    setAuthed(true);
    console.log(authed);
  };

  const logout = () => {
    setAuthed(false);
    console.log(authed);
  };

  return (
    <AuthContext value={{ authed, login, logout }}>{children}</AuthContext>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
