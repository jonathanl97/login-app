import { useState, useEffect } from "react";
import { AuthContext } from "./useAuth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: null,
    firstName: null,
    email: null,
    signedIn: null,
  });

  useEffect(() => {
    login();
    console.log(user);
  }, []);

  const login = async () => {
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

  const logout = () => {
    setUser({ name: null, firstName: null, email: null, signedIn: false });
  };

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
};
