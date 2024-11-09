"use client";  // Marca el componente como Cliente
import { useState, useEffect } from 'react';
import api from '../../../services/api';

interface User {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token'); 
            try {
                const response = await api.get('/users', {
                    headers: {
                        Authorization: `Bearer ${token}` // Añade el token en el encabezado
                    }
                });
                console.log(response.data)
                setUsers(response.data);
            } catch (err) {
                setError('Invalid token');
            }
        };

        fetchUsers();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-6">
            <h1>Users</h1>
            {users.length === 0 ? (
                <p>No Users found.</p>
            ) : (
                <div className='flex justify-around'>
                    {users.map((users) => (
                        <div key={users.id} className='bg-slate-500 rounded-lg p-2 pt-0 w-72'>
                            <h2>Name: {users.username}</h2>
                            <p>ID: {users.id}</p>
                            <p>Email: {users.email}</p>
                            <p>Admin: {users.isAdmin==true ? "True": "False"}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Users;