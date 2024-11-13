"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../../services/api";

interface Params {
    id: string; // Define que el id será una cadena
}

const EditTable = ({ params }: { params: Params }) => {
    const { id } = params; // Obtiene el ID de la URL
    const [table, setTable] = useState({ tableNumber: "", seats: 0 });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchTable = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await api.get(`/tables/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTable(response.data);
            } catch (err) {
                setError("Error fetching table data.");
            }
        };

        fetchTable();
    }, [id]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await api.patch(`/tables/${id}`, table, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            router.push("/admin/tables"); // Redirige de vuelta a la lista de mesas
        } catch (err) {
            setError("Error updating table.");
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setTable({ ...table, [name]: value });
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-6">
            <h1>Edit Table</h1>
            <form onSubmit={handleSubmit} className="mt-3">
                <h2>Table Number:</h2>
                <input
                    type="text"
                    placeholder="Number of seats"
                    name="tableNumber"
                    value={table.tableNumber}
                    onChange={handleChange}
                />

                <h2>Seats:</h2>
                <input
                    type="number"
                    placeholder="Number of seats"
                    name="seats"
                    value={table.seats}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                >
                    Update Table
                </button>
            </form>
        </div>
    );
};

export default EditTable;
