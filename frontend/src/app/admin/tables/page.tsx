"use client"; // Marca el componente como Cliente
import { useState, useEffect } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import ConfirmModal from "@/components/ConfirmationModal"; // Importa el modal reutilizable
import { Table } from "@/types/table";

const Tables = () => {
    const [tables, setTables] = useState<Table[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false); 
    const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
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
                toast.success(
                    `Se ha eliminado la mesa con éxito! 
                    Status: ${response.statusText}`,
                    {
                        position: "top-right",
                        autoClose: 3000,
                    }
                );
            }
            setTables(tables.filter((table) => table.id !== id));
        } catch (err: any) {
            toast.error(`Error deleting table: ${err.response.statusText}`, {
                position: "top-right",
                autoClose: 3000,
            });
            setError("Error deleting table.");
        }
        setModalOpen(false);
    };

    const editTable = (id: number) => {
        router.push(`/admin/tables/${id}/edit`);
    };

    const handleDeleteClick = (id: number) => {
        setSelectedTableId(id);
        setModalOpen(true); // Abre el modal
    };

    const handleConfirmDelete = () => {
        if (selectedTableId !== null) {
            deleteTable(selectedTableId);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {tables.length === 0 ? (
                <p className="text-2xl font-bold mb-4 text-center">
                    No Tables found.
                </p>
            ) : (
                <div className="reserv">
                    <h1 className="text-2xl font-semibold text-start">Panel de Mesas</h1>
                    <div className="mb-6 mt-4 flex justify-between items-center">
                        <div className="flex space-x-4 bg-white p-2 rounded-lg shadow-md">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Crear Mesa</button>
                        </div>
                        <div className="bg-white p-2 rounded-lg shadow-md flex items-center justify-between">
                            <span className="text-lg font-medium text-black">Mesas Totales: {tables.length}</span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-black">Mesas</h3>
                        <div className="overflow-x-auto  min-h-64">
                            <table className="w-3/8 bg-gray-800 shadow-md rounded-lg overflow-hidden text-left">
                                <thead className="text-white">
                                    <tr>
                                        <th className="py-2 px-4 border-b">
                                            Table Name
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
                                                {table.tableName}
                                            </td>
                                            <td className="py-2 px-4 border-b text-gray-800">
                                                {table.id}
                                            </td>
                                            <td className="py-2 px-4 border-b text-gray-800">
                                                {table.seats}
                                            </td>
                                            <td className="py-2 px-4 text-gray-700 flex space-x-2">
                                                <button
                                                    className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                                                    onClick={() => editTable(table.id)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-4 py-1 rounded"
                                                    onClick={() =>
                                                        handleDeleteClick(table.id)
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
                    </div>
                </div>
            )}
            <ConfirmModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this table? This action cannot be undone."
            />
        </>
    );
};

export default Tables;
