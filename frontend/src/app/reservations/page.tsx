"use client";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

interface User {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
}

interface Table {
    id: number;
    tableNumber: string;
    seats: number;
}

interface Reservation {
    id: number;
    reservationDate: string;
    status: string;
    user: User;
    table: Table;
}

const ReservationDashboard = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchReservations = async () => {
            if (user?.userID) {
                const token = localStorage.getItem("token");
                try {
                    const response = await api.get(`/reservations/${user.userID}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                  });
                  setReservations(Array.isArray(response.data) ? response.data : [response.data]);
                } catch (err: any) {
                    toast.error(`${err.response?.statusText}: ${err.message}`, {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    setError("Problem fetching reservations");
                }
            }
        };
        fetchReservations();
    }, [user?.userID]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-6 min-h-90 text-black">
            <h2 className="text-2xl font-semibold text-start">Panel de Reservas</h2>
            <div className="mb-6 mt-4 flex justify-between items-center">
                <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-md ">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => router.push("/reservations/create")}>
                        Crear Reserva
                    </button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <span className="text-lg font-medium text-black">Reservas Totales: </span>
                    <span className="text-xl font-semibold text-black">{reservations.length}</span>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-black">Últimas 10 Reservas</h3>
                <p className="text-gray-500 mb-4">A continuación se muestran las últimas 10 reservas realizadas en el sistema.</p>
            <div className="overflow-x-auto  min-h-64">
                <table className="w-full bg-gray-800 shadow-md rounded-md overflow-hidden">
                    <thead className="text-white">
                        <tr>
                            <th className="py-2 px-4 text-left">User</th>
                            <th className="py-2 px-4 text-left">Reservation Date</th>
                            <th className="py-2 px-4 text-left">Status</th>
                            <th className="py-2 px-4 text-left">Table Number</th>
                            <th className="py-2 px-4 text-left">Seats</th>
                        </tr>
                    </thead>
                    <tbody>
                    {reservations.slice(0, 10).map((reservation, index) => (
                        <tr key={reservation.id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
                            <td className="py-2 px-4 text-gray-700">{reservation.user.username}</td>
                            <td className="py-2 px-4 text-gray-700">{new Date(reservation.reservationDate).toLocaleString()}</td>
                            <td className="py-2 px-4 text-gray-700">{reservation.status}</td>
                            <td className="py-2 px-4 text-gray-700">{reservation.table.tableNumber}</td>
                            <td className="py-2 px-4 text-gray-700">{reservation.table.seats}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
    );
};

export default ReservationDashboard;
