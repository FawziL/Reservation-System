"use client"; // Esto asegura que el componente es un Client Component

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
    const { isLoggedIn } = useAuth();
    const [isClient, setIsClient] = useState(false);

    // Verificar si estamos en el lado del cliente (necesario para el SSR de Next.js)
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/login">Login</Link>
                    {isClient && !isLoggedIn && (
                        <>
                            <Link href="/register">Register</Link>
                        </>
                    )}
                </div>
                {isClient && isLoggedIn && <LogoutButton />}
            </div>
        </nav>
    );
};

export default Navbar;
