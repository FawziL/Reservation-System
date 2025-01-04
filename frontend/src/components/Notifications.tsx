// components/Notifications.tsx
"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

type Notification = {
    id: number; // Se requiere un identificador único
    message: string;
    reservationId: number;
    userId: number;
};

const Notifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [readNotifications, setReadNotifications] = useState<number[]>([]); // IDs de notificaciones leídas

    useEffect(() => {
        const socket = io("http://localhost:8080");

        socket.on("new_notification", (data: Notification) => {
            console.log("Notificación recibida:", data);
            setNotifications((prev) => [...prev, data]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleNotificationClick = (id: number) => {
        if (!readNotifications.includes(id)) {
            setReadNotifications((prev) => [...prev, id]);
        }
    };

    return (
        <div className="relative">
            {/* Ícono de notificación */}
            <div
                className="cursor-pointer relative"
                onClick={toggleDropdown}
                aria-label="Notifications"
            >
                <img src="/notification.svg" alt="Notificaciones" width={28} height={28} />
                {/* Contador de notificaciones no leídas */}
                {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 rounded-full">
                        {notifications.filter((notif) => !readNotifications.includes(notif.id)).length}
                    </span>
                )}
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-4 w-72 bg-white border border-gray-300 rounded-lg shadow-lg z-50 text-black">
                    <div className="p-2">
                        <h3 className="text-lg font-semibold mb-2">Notificaciones:</h3>
                        {notifications.length > 0 ? (
                            <ul>
                                {notifications.map((notif) => (
                                    <li
                                        key={notif.id}
                                        className={`p-2 border-b hover:bg-gray-100 cursor-pointer ${
                                            readNotifications.includes(notif.id)
                                                ? "bg-gray-200"
                                                : "bg-white"
                                        }`}
                                        onClick={() => handleNotificationClick(notif.id)}
                                    >
                                        <div className="flex items-center">
                                            {/* Punto rojo si no ha sido leída */}
                                            {!readNotifications.includes(notif.id) && (
                                                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                            )}
                                            <div>
                                                <p className="text-sm">{notif.message}</p>
                                                <p className="text-xs text-gray-500">
                                                    Reserva ID: {notif.reservationId}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500 text-center">Sin notificaciones</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;

