import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as authService from "../services/authService.js";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkSession = useCallback(async () => {
    setLoading(true);
    try {
      const currentAdmin = await authService.getCurrentAdmin();
      setAdmin(currentAdmin);
    } catch (error) {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    const handleSessionExpired = () => {
      setAdmin(null);
    };

    window.addEventListener("auth:session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("auth:session-expired", handleSessionExpired);
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const loggedInAdmin = await authService.login(email, password);
    setAdmin(loggedInAdmin);
    return loggedInAdmin;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setAdmin(null);
  }, []);

  const value = useMemo(
    () => ({
      admin,
      loading,
      isAuthenticated: Boolean(admin),
      login,
      logout,
      refreshSession: checkSession,
    }),
    [admin, loading, login, logout, checkSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider.");
  }

  return context;
};
