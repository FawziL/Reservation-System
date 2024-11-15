"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../../services/api";

interface Params {
    id: string;
}

const EditReservation = ({ params }: { params: Params }) => {
    const { id } = params; // Obtiene el ID de la URL
    const [formData, setFormData] = useState({
        reservationDate: '',
        table: ''
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await api.patch(`/reservations/${id}`, formData, {
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
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
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
                name="reservationDate"
                placeholder="Date" 
                value={formData.reservationDate}
                onChange={handleChange}
            />

            <h2>Table:</h2>
            <input
                type="text"
                name="table"
                placeholder="table"
                value={formData.table}
                onChange={handleChange}
            />

            {error && <p>{error}</p>}
            <button type="submit">Edit Table</button>
        </form>
    </div>
    );
};

export default EditReservation;
