"use client";  // Marca el componente como Cliente
import { useState, useEffect } from 'react';
import api from '../../../services/api';

interface Tables {
    id: number;
    tableNumber: string;
    seats: number;
}

const Tables = () => {
    const [tables, setTables] = useState<Tables[]>([]);
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const fetchTables = async () => {
            const token = localStorage.getItem('token'); 
            try {
                const response = await api.get('/tables', {
                    headers: {
                        Authorization: `Bearer ${token}` // Añade el token en el encabezado
                    }
                });
                setTables(response.data);
            } catch (err) {
                setError('Invalid token');
            }
        };

        fetchTables();
    }, []);

    const deleteTable = async (id: number) => {
        const token = localStorage.getItem("token");
        try {
          await api.delete(`/tables/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTables(tables.filter((table) => table.id !== id)); // Actualiza la lista local
        } catch (err) {
          console.error("Error deleting table:", err);
          setError("Error deleting table.");
        }
    };

    const editTable = (id: number) => {
        // Redirigir a la página de edición de la tabla
        window.location.href = `/admin/tables/${id}/edit`; // Actualiza la ruta según tu estructura
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-6">
            <h1>Tables</h1>
            {tables.length === 0 ? (
                <p>No Tables found.</p>
            ) : (
                <div className='flex justify-around'>
                    {tables.map((tables) => (
                        <div key={tables.id} className='bg-slate-500 rounded-lg p-2 pt-0 w-72'>
                            <h2>Name of table: {tables.tableNumber}</h2>
                            <p>ID: {tables.id}</p>
                            <p>Seats: {tables.seats}</p>
                            <button
                            className="bg-blue-500 text-white px-4 py-1 rounded"
                            onClick={() => editTable(tables.id)}
                            >
                            Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-1 rounded"
                                onClick={() => deleteTable(tables.id)}
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

export default Tables;