"use client";  // Marca el componente como Cliente
import { useState, useEffect } from 'react';
import api from '../../../services/api';

interface User {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
}

const Tables = () => {
    const [tables, setTables] = useState<User[]>([]);
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
                console.log(response.data)
                setTables(response.data);
            } catch (err) {
                setError('Invalid token');
            }
        };

        fetchTables();
    }, []);

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
                            <h2>Name: {tables.username}</h2>
                            <p>ID: {tables.id}</p>
                            <p>Email: {tables.email}</p>
                            <p>Admin: {tables.isAdmin==true ? "True": "False"}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tables;