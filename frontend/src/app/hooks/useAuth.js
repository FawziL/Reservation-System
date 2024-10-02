import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        router.push('/login'); // Redirigir a login al cerrar sesión
    };

    return { isAuthenticated, logout };
};
