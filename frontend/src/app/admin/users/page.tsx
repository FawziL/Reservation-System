"use client"; // Marca el componente como Cliente
import { useState, useEffect } from "react";
import api from "../../../services/api";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

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
            const token = localStorage.getItem("token");
            try {
                const response = await api.get("/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (err:any) {
                toast.error(`${err.response.statusText}: ${err.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                setError("Invalid token or error fetching users.");
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id: number) => {
        const token = localStorage.getItem("token");
        try {
            const response = await api.delete(`/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                toast.success(`Se ha eleminado el usuario con éxito! 
                    Status: ${response.statusText}`, {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
            setUsers(users.filter((user) => user.id !== id));
        } catch (err:any) {
            toast.error(`Error deleting user: ${err.response.statusText}`, {
                position: "top-right",
                autoClose: 3000,
            });
            setError("Error deleting user.");
        }
    };

    const editUser = (id: number) => {
        router.push(`/admin/users/${id}/edit`);
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-6">
            <h1>Users</h1>
            {users.length === 0 ? (
                <p className="text-2xl font-bold mb-4 text-center">
                    No Users found.
                </p>
            ) : (
                <div className="flex justify-around">
                    <table className="w-3/5 bg-gray-800 shadow-md rounded-lg overflow-hidden text-left">
                        <thead className="text-white">
                            <tr>
                                <th className="py-2 px-4 border-b">Username</th>
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Admin</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-gray-100"
                                            : "bg-white"
                                    } hover:bg-gray-200`}
                                >
                                    <td className="py-2 px-4 border-b text-gray-800">
                                        {user.username}
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-800">
                                        {user.id}
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-800">
                                        {user.email}
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-800">
                                        {user.isAdmin ? "True" : "False"}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                                            onClick={() => editUser(user.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-1 rounded"
                                            onClick={() => deleteUser(user.id)}
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

export default Users;
