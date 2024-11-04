"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <nav className="bg-gray-800">
            <div className="p-4">
                <div className="flex justify-around">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    {isClient && !isAuthenticated && (
                        <>
                            <Link href="/register">Register</Link>
                            <Link href="/login">Login</Link>
                        </>
                    )}
                    {isClient && isAuthenticated && (
                        <>
                            <Link href="/reservations">Reservations</Link>
                            <a onClick={logout}>Logout</a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
