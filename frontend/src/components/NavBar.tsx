"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/AuthContext";
import Notifications from "@/components/Notifications";
import { navItems } from "@/utils/navItems";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isClient, setIsClient] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const userId = user?.userID;

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {/* Navbar superior */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white px-4 py-2 shadow flex items-center justify-between">
                <button className="p-2 focus:outline-none" onClick={toggleSidebar}>
                    <span className="material-icons">Menu</span>
                </button>
                <div className="flex items-center">
                    {/* Renderizar Notifications solo si userId existe */}
                    <h2 className="text-lg font-bold">Reservation System 1.0.0</h2>
                    {userId && <Notifications userId={userId} />}
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-40 h-full bg-gray-800 text-white transform transition-all duration-200 ease-in-out ${
                    isSidebarOpen ? "w-64" : "w-20"
                }`}
            >
                <nav className="pt-16 p-6">
                    <ul>
                        {navItems.map((item, index) => {
                            // Lógica para determinar si mostrar la ruta
                            if (!isClient) return null;
                            if (!user && item.auth) return null;
                            if (user && item.auth === "admin" && !user.admin) return null;

                            return (
                                <li
                                    key={index}
                                    className="mb-2 h-10 hover:bg-gray-700 rounded transition duration-200 flex items-center cursor-pointer"
                                    onClick={item.isLogout ? logout : undefined}
                                >
                                    {item.isLogout ? (
                                        <>
                                            <span className="text-lg m-1 text-red-500">{item.icon}</span>
                                            {isSidebarOpen && <span className="text-red-500">{item.name}</span>}
                                        </>
                                    ) : (
                                        <Link href={item.path} className="flex items-center w-full">
                                            <span className="text-lg m-1">{item.icon}</span>
                                            {isSidebarOpen && <span>{item.name}</span>}
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