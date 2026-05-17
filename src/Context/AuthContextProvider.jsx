
import { useState, useCallback, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

export default function AuthContextProvider({ children }) {
  const [userLogin, setuserLogin] = useState(
    localStorage.getItem("UserToken") || null
  );

  const decodeToken = useCallback((token) => {
    try {
      const { user } = jwtDecode(token);
      return user;
    } catch {
      return null;
    }
  }, []);

  const userId = useMemo(() => {
    if (userLogin) return decodeToken(userLogin);
    return null;
  }, [userLogin, decodeToken]);

  return (
    <AuthContext.Provider value={{ userLogin, setuserLogin, userId }}>
      {children}
    </AuthContext.Provider>
  );

}