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
                            <Link href="/auth/register">Register</Link>
                            <Link href="/auth/login">Login</Link>
                        </>
                    )}
                    {isClient && isAuthenticated && (
                        <>  
                            <Link href="/reservations">Reservations User</Link>
                            <Link href="/admin/reservations">Reservations Admin</Link>
                            <Link href="/admin/users">Users</Link>
                            <Link href="/admin/tables">Tables</Link>
                            <a onClick={logout}>Logout</a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
