"use client";  // Marca el componente como Cliente
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from "../../hooks/AuthContext";
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

const Reservations = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchReservations = async () => {
            
            if (user?.userID){
            const token = localStorage.getItem("token");
            try {
                const response = await api.get(`/reservations/${user.userID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReservations(Array.isArray(response.data) ? response.data : [response.data]);
                router.push("/reservations");
            } catch (err) {
                setError("Problem fetching reservations");
            }}        
        };
        fetchReservations();
    }, [user?.userID]);

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