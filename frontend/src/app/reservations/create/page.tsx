"use client";
import { useState } from "react";
import api from "@/services/api";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreateReservation = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        userID: user?.userID,
        reservationDate: '',
        table: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e: any) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const adjustedDate = new Date(formData.reservationDate).toISOString();
        try {
            const response = await api.post("/reservations", {
                ...formData,
                reservationDate: adjustedDate,
            });
            if (response.status === 201) {
                toast.success(
                    `Se ha creado tu reservación con éxito! 
                    Status: ${response.statusText}`,
                    {
                        position: "top-right",
                        autoClose: 3000,
                    }
                );
                router.push("/reservations");
            }
        } catch (err: any) {
            toast.error(`${err.response.statusText}: ${err.message}`, {
                position: "top-right",
                autoClose: 3000,
            });
            setError("Reservation failed. Try again.");
        }
    };

    return (
        <div className="container mt-6">
            <h1>Create a reservation</h1>
            <form onSubmit={handleSubmit} className="mt-3">
                <h2>Date:</h2>
                <input
                    type="datetime-local"
                    name="reservationDate"
                    placeholder="Date"
                    value={formData.reservationDate}
                    onChange={handleChange}
                    min={new Date().toISOString().slice(0, 16)} // Fecha mínima: ahora
                    required
                />

                <h2>Table:</h2>
                <input
                    type="text"
                    name="table"
                    placeholder="table"
                    value={formData.table}
                    onChange={handleChange}
                    required
                />

                {error && <p>{error}</p>}
                <button type="submit">Create a Table</button>
            </form>
        </div>
    );
};

export default CreateReservation;
