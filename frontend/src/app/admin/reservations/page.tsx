"use client";  // Marca el componente como Cliente
import { useState, useEffect } from 'react';
import api from '../../../services/api';
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
    reservationDate: string; // Usamos string para manejar la fecha
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
                const response = await api.get('/reservations');
                console.log(response.data)
                setReservations(response.data);
            } catch (err) {
                setError('Invalid email or password');
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
            setReservations(reservations.filter((reservation) => reservation.id !== id));
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
        <div className="container mt-6">
            <h1>Reservations</h1>
            {reservations.length === 0 ? (
                <p>No reservations found.</p>
            ) : (
                <div className='flex justify-around'>
                    {reservations.map((reservation) => (
                        <div key={reservation.id} className='bg-slate-500 rounded-lg p-2 pt-0 w-48'>
                            <h2>Reservation for {reservation.user.username}</h2>
                            <p>Date: {new Date(reservation.reservationDate).toLocaleString()}</p>
                            <p>Status: {reservation.status}</p>
                            <p>Table: {reservation.table.tableNumber} (Seats: {reservation.table.seats})</p>
                            <button
                                className="bg-blue-500 text-white px-4 py-1 rounded"
                                onClick={() => editReservation(reservation.id)}
                                >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-1 rounded"
                                onClick={() => deleteReservation(reservation.id)}
                                >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminReservations;