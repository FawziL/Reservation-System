"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/AuthContext";
import Notifications from "@/components/Notifications";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isClient, setIsClient] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const navItems = [
        { path: "/", name: "Home", icon: "🏠" },
        { path: "/auth/register", name: "Register", icon: "✍️", auth: false },
        { path: "/auth/login", name: "Login", icon: "🔑", auth: false },
        {
            path: "/reservations",
            name: "Reservations User",
            icon: "📅",
            auth: true,
        },
        {
            path: "/reservations/create",
            name: "Create Reservation",
            icon: "➕",
            auth: true,
        },
        {
            path: "/admin/reservations",
            name: "Reservations Admin",
            icon: "📋",
            auth: "admin",
        },
        { path: "/admin/users", name: "Users", icon: "👥", auth: "admin" },
        { path: "/admin/tables", name: "Tables", icon: "🪑", auth: "admin" },
        {
            path: "/admin/tables/create",
            name: "Create Table",
            icon: "🆕",
            auth: "admin",
        },
        {
            path: "/logout",
            name: "Logout",
            icon: "🚪",
            auth: true,
            isLogout: true, 
        },
    ];

    return (
        <>
            {/* Navbar superior */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white px-4 py-2 shadow flex items-center justify-between">
                <button
                    className="p-2 focus:outline-none"
                    onClick={toggleSidebar}
                >
                    <span className="material-icons">Menu</span>
                </button>
                <div className="flex items-center">
                    <Notifications />
                    <h1 className="text-lg font-bold">Reservation System 1.0.0</h1>
                </div>
                
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-40 h-full bg-gray-800 text-white transform transition-all duration-200 ease-in-out ${
                    isSidebarOpen ? "w-64" : "w-20"
                }`}
            >
                <nav className="pt-20 flex p-6">
                    <ul>
                        {navItems.map((item, index) => {
                            // Lógica para determinar si mostrar la ruta
                            if (!isClient) return null;
                            if (!user && item.auth) return null;
                            if (user && item.auth === "admin" && !user.admin)
                                return null;

                            // Si es la opción de Logout, manejamos su lógica especial
                            if (item.isLogout) {
                                return (
                                    <li
                                        key={index}
                                        className="mb-2 flex items-center h-12"
                                    >
                                        <span className="text-lg mr-2">
                                            {item.icon}
                                        </span>
                                        {isSidebarOpen && (
                                            <a
                                                onClick={logout}
                                                className="block py-2 px-4 rounded hover:bg-red-700 text-red-500 cursor-pointer"
                                            >
                                                {item.name}
                                            </a>
                                        )}
                                    </li>
                                );
                            }

                            // Para las demás rutas normales
                            return (
                                <li
                                    key={index}
                                    className="mb-2 flex items-center h-12"
                                >
                                    <span className="text-lg mr-2">
                                        {item.icon}
                                    </span>
                                    {isSidebarOpen && (
                                        <Link
                                            href={item.path}
                                            className="block py-2 px-4 rounded hover:bg-gray-700"
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
