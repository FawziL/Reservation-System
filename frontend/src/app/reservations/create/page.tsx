"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreateReservation = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [tables, setTables] = useState([]);
    const [error, setError] = useState("");
    
    const [formData, setFormData] = useState({
        userID: user?.userID,
        reservationDate: "",
        tableID: ""
    });

    // Obtener las mesas disponibles
    useEffect(() => {
        const fetchTables = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await api.get("/tables", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTables(response.data);
            } catch (err: any) {
                toast.error(`Error fetching tables: ${err.response?.statusText || "Unknown error"}`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                setError("Error fetching tables.");
            }
        };

        fetchTables();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const adjustedDate = new Date(formData.reservationDate).toISOString();
        try {
            console.log(formData)
            const response = await api.post("/reservations", {
                ...formData,
                reservationDate: adjustedDate,
            });

            if (response.status === 201) {
                toast.success(`Reservación creada con éxito!`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                router.push("/reservations");
            }
        } catch (err: any) {
            toast.error(`${err.response?.statusText || "Error"}: ${err.message}`, {
                position: "top-right",
                autoClose: 3000,
            });
            setError("Reservation failed. Try again.");
        }
    };

    return (
        <div className="container mt-6">
            <h1>Create a Reservation</h1>
            <form onSubmit={handleSubmit} className="mt-3">
                <h2>Date:</h2>
                <input
                    type="datetime-local"
                    name="reservationDate"
                    value={formData.reservationDate}
                    onChange={handleChange}
                    min={new Date().toISOString().slice(0, 16)} // Fecha mínima: ahora
                    required
                />

                <h2>Select Table:</h2>
                <select
                    name="tableID"
                    value={formData.tableID}
                    onChange={handleChange}
                    required
                    className="w-full p-2 mt-2 border rounded-lg bg-gray-800 text-white border-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                    <option value="" disabled className="bg-gray-800 text-gray-400">Select a table</option>
                    {tables.map((table: any) => (
                        <option key={table.id} value={table.id} className="bg-gray-800 text-white">
                            {table.tableNumber}
                        </option>
                    ))}
                </select>

                {error && <p className="text-red-500">{error}</p>}
                <button type="submit">Create Reservation</button>
            </form>
        </div>
    );
};

export default CreateReservation;