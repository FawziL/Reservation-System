"use client";  // Marca el componente como Cliente
import { useState, useEffect } from 'react';
import api from '../../../services/api';

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

const Reservations = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState<string | null>(null); 

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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reservations;