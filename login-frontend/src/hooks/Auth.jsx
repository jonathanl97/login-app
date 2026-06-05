import { useState, useEffect } from "react";
import { AuthContext } from "./useAuth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: null, email: null, signedIn: null });

  useEffect(() => {
    getUser();
    console.log(user);
  }, []);

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/getuser", {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const jsonResponse = await response.json();
      setUser(jsonResponse);
    } catch (err) {
      throw err;
    }
  };

  const login = async () => {
    //setUser({ ...user, signedIn: true });
    getUser();
    console.log(user);
  };

  const logout = () => {
    setUser({ name: null, email: null, signedIn: false });
  };

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
};
