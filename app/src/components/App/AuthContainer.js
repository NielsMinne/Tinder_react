import { createContext, useContext, useEffect, useState } from "react";
import LoginForm from "./Tinder/Login";

const KEY = "TINDER_USER";

const AuthContext = createContext();

const getUserFromStorage = () => {
  const user = localStorage.getItem(KEY);
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

const AuthContainer = ({ children }) => {
  const [user, setUser] = useState(getUserFromStorage());

  useEffect(() => {
    if (user) {
      localStorage.setItem(KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEY);
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  if (user) {
    return (
      <AuthContext.Provider value={{ user: user, logout: handleLogout }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return <LoginForm onLogin={handleLogin} />;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContainer;