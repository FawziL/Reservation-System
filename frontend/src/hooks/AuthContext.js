"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const login = (token) => {
        // Decodifica el token para obtener datos del usuario
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        // Guarda el token en el localStorage o en cookies
        localStorage.setItem('token', token);
        router.push("/");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        router.push("/auth/login");
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(jwtDecode(token));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};