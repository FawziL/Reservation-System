"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "@/services/api";
import { Notification, NotificationsProps } from "@/types/notification";
import Image from "next/image";

const Notifications = ({ userId }: NotificationsProps) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [readNotifications, setReadNotifications] = useState<number[]>([]);

    // Cargar notificaciones almacenadas al montar el componente
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Obtener todas las notificaciones del usuario
                
                const allNotificationsResponse = await api.get(`notifications/user/${userId}`);

                const allNotifications = allNotificationsResponse.data
                
                setNotifications(allNotifications);

                // Obtener notificaciones no leídas
                const unreadResponse = await api.get(`/notifications/user/${userId}/unread`);

                const unreadNotifications = unreadResponse.data;

                // Determinar las notificaciones leídas
                const readIds = allNotifications
                    .filter(
                        (notif: Notification) =>
                            !unreadNotifications.some(
                                (unread: Notification) => unread.id === notif.id
                            )
                    )
                    .map((notif: Notification) => notif.id);

                setReadNotifications(readIds);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [userId]);

    // Conectar Socket.IO y escuchar nuevas notificaciones
    useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

        socket.on("new_notification", (data: Notification) => {
            console.log("Notificación recibida:", data);
            setNotifications((prev) => [data, ...prev]); // Añadir la nueva notificación al principio
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleNotificationClick = async (id: number) => {
        if (!readNotifications.includes(id)) {
            setReadNotifications((prev) => [...prev, id]);

            // Marcar la notificación como leída en el backend
            try {
                await api.patch(`/notifications/${id}/read`);
            } catch (error) {
                console.error("Error marking notification as read:", error);
            }
        }
    };

    // Filtrar notificaciones no leídas
    const unreadNotifications = notifications.filter(
        (notif) => !readNotifications.includes(notif.id)
    );

    return (
        <div className="relative">
            {/* Ícono de notificación */}
            <div
                className="cursor-pointer relative"
                onClick={toggleDropdown}
                aria-label="Notifications"
            >
                <Image src="/notification.svg" alt="Notificaciones" width={28} height={28} />
                {/* Contador de notificaciones no leídas */}
                {unreadNotifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 rounded-full">
                        {unreadNotifications.length}
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
                                {/* Mostrar notificaciones no leídas primero */}
                                {notifications
                                    .sort((a, b) => {
                                        const aIsRead = readNotifications.includes(a.id);
                                        const bIsRead = readNotifications.includes(b.id);
                                        return aIsRead === bIsRead ? 0 : aIsRead ? 1 : -1;
                                    })
                                    .map((notif) => (
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