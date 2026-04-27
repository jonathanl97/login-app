//Not currently used.

import { useState } from "react";
//import { jwtDecode } from "jwt-decode";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    if (!tokenString) {
      return null;
    }

    const userToken = JSON.parse(tokenString);
    return userToken?.token;

    {
      /*
    if (!token) {
      return null;
    }

    try {
      const decoded = jwtDecode(token)
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        sessionStorage.removeItem('token');
        return null;
      }

      return token;
    } catch (error) {
      sessionStorage.removeItem('token');
      return null;
    }
    */
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const removeToken = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}
