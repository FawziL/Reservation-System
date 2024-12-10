"use client"; // Marca el componente como Cliente
import { useState, useEffect } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ConfirmModal from "@/components/ConfirmationModal"; // Asegúrate de tener el modal implementado

interface User {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
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

    const handleDeleteClick = (id: number) => {
        setSelectedUserId(id);
        setModalOpen(true); // Abre el modal
    };

    const handleConfirmDelete = async () => {
        if (selectedUserId === null) return;

        const token = localStorage.getItem("token");
        try {
            const response = await api.delete(`/users/${selectedUserId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                toast.success(`User deleted successfully.`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                setUsers(users.filter((user) => user.id !== selectedUserId));
            }
        } catch (err: any) {
            toast.error(`Error deleting user: ${err.response.statusText || "Unknown error"}`, {
                position: "top-right",
                autoClose: 3000,
            });
            setError("Error deleting user.");
        } finally {
            setModalOpen(false);
            setSelectedUserId(null);
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
                <p className="text-2xl font-bold mb-4 text-center">No Users found.</p>
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
                                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                    } hover:bg-gray-200`}
                                >
                                    <td className="py-2 px-4 border-b text-gray-800">{user.username}</td>
                                    <td className="py-2 px-4 border-b text-gray-800">{user.id}</td>
                                    <td className="py-2 px-4 border-b text-gray-800">{user.email}</td>
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
                                            onClick={() => handleDeleteClick(user.id)}
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
            <ConfirmModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this user? This action cannot be undone."
            />
        </div>
    );
};

export default Users;
