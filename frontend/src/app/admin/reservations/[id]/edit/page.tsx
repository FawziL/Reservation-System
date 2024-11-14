"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../../services/api";

interface Params {
    id: string;
}

const EditReservation = ({ params }: { params: Params }) => {
    const { id } = params; // Obtiene el ID de la URL
    const [reservation, setReservation] = useState({ date: "", table: "" });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    /*useEffect(() => {
        const fetchReservation = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await api.get(`/reservations/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReservation(response.data);
            } catch (err) {
                setError("Error fetching reservation data.");
            }
        };

        fetchReservation();
    }, [id]);*/

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await api.patch(`/reservations/${id}`, reservation, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            router.push("/admin/reservations"); // Redirige de vuelta a la lista de mesas
        } catch (err) {
            setError("Error updating Reservation.");
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setReservation({ ...reservation, [name]: value });
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='container mt-6'>
        <h1>Edit reservation</h1>
        <form onSubmit={handleSubmit} className='mt-3'>

            <h2>Date:</h2>
            <input
                type="date"
                name="date"
                placeholder="Date" 
                value={reservation.date}
                onChange={handleChange}
            />

            <h2>Table:</h2>
            <input
                type="text"
                name="table"
                placeholder="table"
                value={reservation.table}
                onChange={handleChange}
            />

            {error && <p>{error}</p>}
            <button type="submit">Edit Table</button>
        </form>
    </div>
    );
};

export default EditReservation;
