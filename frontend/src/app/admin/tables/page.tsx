"use client"; // Marca el componente como Cliente
import { useState, useEffect } from "react";
import api from "../../../services/api";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

interface Tables {
    id: number;
    tableNumber: string;
    seats: number;
}

const Tables = () => {
    const [tables, setTables] = useState<Tables[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchTables = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await api.get("/tables", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTables(response.data);
            } catch (err:any) {
                toast.error(`Error fetching tables: ${err.response.statusText}
                    Status code: ${err.response.status}`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                setError("Invalid token or error fetching tables.");
            }
        };

        fetchTables();
    }, []);

    const deleteTable = async (id: number) => {
        const token = localStorage.getItem("token");
        try {
            const response = await api.delete(`/tables/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                toast.success(`Se ha eliminado la mesa con éxito! 
                    Status: ${response.statusText}`, {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
            setTables(tables.filter((table) => table.id !== id));
        } catch (err:any) {
            toast.error(`Error deleting table: ${err.response.statusText}`, {
                position: "top-right",
                autoClose: 3000,
            });
            setError("Error deleting table.");
        }
    };

    const editTable = (id: number) => {
        router.push(`/admin/tables/${id}/edit`);
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-6">
            <h1>Tables</h1>
            {tables.length === 0 ? (
                <p className="text-2xl font-bold mb-4 text-center">
                    No Tables found.
                </p>
            ) : (
                <div className="flex justify-around">
                    <table className="w-3/8 bg-gray-800 shadow-md rounded-lg overflow-hidden text-left">
                        <thead className="text-white">
                            <tr>
                                <th className="py-2 px-4 border-b">
                                    Table Number
                                </th>
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">Seats</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tables.map((table, index) => (
                                <tr
                                    key={table.id}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-gray-100"
                                            : "bg-white"
                                    } hover:bg-gray-200`}
                                >
                                    <td className="py-2 px-4 border-b text-gray-800">
                                        {table.tableNumber}
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-800">
                                        {table.id}
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-800">
                                        {table.seats}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                                            onClick={() => editTable(table.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-1 rounded"
                                            onClick={() =>
                                                deleteTable(table.id)
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

export default Tables;
