"use client";
import { useState, useEffect } from "react";
import api from "../../../services/api";
import { useRouter } from "next/navigation";

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

const AdminReservations = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await api.get("/reservations");
                console.log(response.data);
                setReservations(response.data);
            } catch (err) {
                setError("Problem fetching reservations.");
            }
        };

        fetchReservations();
    }, []);

    const deleteReservation = async (id: number) => {
        const token = localStorage.getItem("token");
        try {
            await api.delete(`/reservations/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReservations(
                reservations.filter((reservation) => reservation.id !== id)
            );
        } catch (err) {
            console.error("Error deleting reservation:", err);
            setError("Error deleting reservation.");
        }
    };

    const editReservation = (id: number) => {
        router.push(`/admin/reservations/${id}/edit`);
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto mt-6 p-4">
            <h1 className="text-2xl font-bold mb-4">Reservations</h1>
            {reservations.length === 0 ? (
                <p className="text-2xl font-bold mb-4 text-center">
                    No reservations found.
                </p>
            ) : (
                <div className="flex justify-around">
                    <table className="w-5/7 bg-gray-800 shadow-md rounded-lg overflow-hidden">
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
                                <th className="py-2 px-4 text-left">Actions</th>
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
                                    <td className="py-2 px-4 text-gray-800">
                                        {reservation.user.username}
                                    </td>
                                    <td className="py-2 px-4 text-gray-800">
                                        {new Date(
                                            reservation.reservationDate
                                        ).toLocaleString()}
                                    </td>
                                    <td className="py-2 px-4 text-gray-800">
                                        {reservation.status}
                                    </td>
                                    <td className="py-2 px-4 text-gray-800">
                                        {reservation.table.tableNumber}
                                    </td>
                                    <td className="py-2 px-4 text-gray-800">
                                        {reservation.table.seats}
                                    </td>
                                    <td className="py-2 px-4 flex gap-2">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                            onClick={() =>
                                                editReservation(reservation.id)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                            onClick={() =>
                                                deleteReservation(
                                                    reservation.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
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

export default AdminReservations;
