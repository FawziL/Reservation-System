"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../hooks/AuthContext";
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

const Reservations = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchReservations = async () => {
            if (user?.userID) {
                const token = localStorage.getItem("token");
                try {
                    const response = await api.get(
                        `/reservations/${user.userID}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setReservations(
                        Array.isArray(response.data)
                            ? response.data
                            : [response.data]
                    );
                    router.push("/reservations");
                } catch (err:any) {
                    toast.error(`${err.response.statusText}: ${err.message}`, {
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
        <div className="container mx-auto mt-6 p-4">
            <h1 className="text-2xl font-bold mb-4">Reservations</h1>
            {reservations.length === 0 ? (
                <p className="text-gray-500">No reservations found.</p>
            ) : (
                <div className="flex justify-around">
                    <table className="w-5/7 bg-gray-800 shadow-md rounded-md overflow-hidden">
                        <thead className="text-white">
                            <tr>
                                <th className="py-2 px-4 text-left">User</th>
                                <th className="py-2 px-4 text-left">
                                    Reservation Date
                                </th>
                                <th className="py-2 px-4 text-left">Status</th>
                                <th className="py-2 px-4 text-left">
                                    Table Number
                                </th>
                                <th className="py-2 px-4 text-left">Seats</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation, index) => (
                                <tr
                                    key={reservation.id}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-gray-100"
                                            : "bg-white"
                                    } hover:bg-gray-200`}
                                >
                                    <td className="py-2 px-4 text-gray-700">
                                        {reservation.user.username}
                                    </td>
                                    <td className="py-2 px-4 text-gray-700">
                                        {new Date(
                                            reservation.reservationDate
                                        ).toLocaleString()}
                                    </td>
                                    <td className="py-2 px-4 text-gray-700">
                                        {reservation.status}
                                    </td>
                                    <td className="py-2 px-4 text-gray-700">
                                        {reservation.table.tableNumber}
                                    </td>
                                    <td className="py-2 px-4 text-gray-700">
                                        {reservation.table.seats}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Reservations;
