"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isClient, setIsClient] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {/* Navbar superior */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white px-4 py-2 shadow flex items-center justify-between">
                {/* Botón de hamburguesa */}
                <button
                    className="p-2 focus:outline-none"
                    onClick={toggleSidebar}
                >
                    <span className="material-icons">Menu</span>
                </button>
                <h1 className="text-lg font-bold">Navbar</h1>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-40 h-full bg-gray-800 text-white transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out w-64`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-lg font-bold">Menu</h2>
                    {/* Botón para cerrar el sidebar */}
                    <button
                        className="p-2 text-gray-400 hover:text-white focus:outline-none"
                        onClick={toggleSidebar}
                    >
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <nav className="p-4">
                    <ul>
                        <li className="mb-2">
                            <Link
                                href="/"
                                className="block py-2 px-4 rounded hover:bg-gray-700"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="/about"
                                className="block py-2 px-4 rounded hover:bg-gray-700"
                            >
                                About
                            </Link>
                        </li>
                        {isClient && !user && (
                            <>
                                <li className="mb-2">
                                    <Link
                                        href="/auth/register"
                                        className="block py-2 px-4 rounded hover:bg-gray-700"
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link
                                        href="/auth/login"
                                        className="block py-2 px-4 rounded hover:bg-gray-700"
                                    >
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                        {isClient && user && (
                            <>
                                <li className="mb-2">
                                    <Link
                                        href="/reservations"
                                        className="block py-2 px-4 rounded hover:bg-gray-700"
                                    >
                                        Reservations User
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link
                                        href="/reservations/create"
                                        className="block py-2 px-4 rounded hover:bg-gray-700"
                                    >
                                        Create Reservation
                                    </Link>
                                </li>
                                {/* Rutas exclusivas para administradores */}
                                {user.admin && (
                                    <>
                                        <li className="mb-2">
                                            <Link
                                                href="/admin/reservations"
                                                className="block py-2 px-4 rounded hover:bg-gray-700"
                                            >
                                                Reservations Admin
                                            </Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link
                                                href="/admin/users"
                                                className="block py-2 px-4 rounded hover:bg-gray-700"
                                            >
                                                Users
                                            </Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link
                                                href="/admin/tables"
                                                className="block py-2 px-4 rounded hover:bg-gray-700"
                                            >
                                                Tables
                                            </Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link
                                                href="/admin/tables/create"
                                                className="block py-2 px-4 rounded hover:bg-gray-700"
                                            >
                                                Create Table
                                            </Link>
                                        </li>
                                    </>
                                )}
                                <li className="mb-2">
                                    <a
                                        onClick={logout}
                                        className="block py-2 px-4 rounded hover:bg-red-700 text-red-500 cursor-pointer"
                                    >
                                        Logout
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
