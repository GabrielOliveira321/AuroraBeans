import { createContext, useContext, useState } from "react";
import { loginApi, registerApi } from "../api/authApi";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const login = async ({ email, password }) => {
        if (!email || !password) return { success: false, message: "Informe e-mail e senha para entrar." };

        const result = await loginApi({ email, password });

        if (!result.success) {
            return result;
        }

        setToken(result.token);
        setUser(result.user);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        return { success: true };
    };

    const register = async ({ name, email, password }) => {
        if (!name || !email || !password) {
            return { success: false, message: "Preencha todos os campos." };
        }

        const result = await registerApi({ name, email, password });

        if (!result.success) {
            return result;
        }

        setToken(result.token);
        setUser(result.user);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        return { success: true };
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const updateUser = (newUserData) => {
        const updatedUser = { ...user, ...newUserData };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ token, user, login, register, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);