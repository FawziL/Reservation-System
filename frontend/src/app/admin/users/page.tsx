"use client";  // Marca el componente como Cliente
import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useRouter } from "next/navigation";

interface User {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null); 
    const router = useRouter();

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

    const deleteTable = async (id: number) => {
        const token = localStorage.getItem("token");
        try {
          await api.delete(`/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsers(users.filter((user) => user.id !== id)); // Actualiza la lista local
        } catch (err) {
          console.error("Error deleting user:", err);
          setError("Error deleting user.");
        }
    };
    const editTable = (id: number) => {
        router.push(`/admin/users/${id}/edit`);

    };

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
                            <button
                                className="bg-blue-500 text-white px-4 py-1 rounded"
                                onClick={() => editTable(users.id)}
                                >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-1 rounded"
                                onClick={() => deleteTable(users.id)}
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

export default Users;