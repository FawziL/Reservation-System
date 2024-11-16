"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../../services/api";

interface Params {
    id: string;
}

const EditReservation = ({ params }: { params: Params }) => {
    const { id } = params; // Obtiene el ID de la URL
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        isAdmin: false,
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await api.patch(`/users/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            router.push("/admin/users"); // Redirige de vuelta a la lista de usuarios
        } catch (err) {
            setError("Error updating user.");
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "isAdmin" ? value === "true" : value, // Asegura que el valor sea booleano
        });
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='container mt-6'>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit} className='mt-3'>

                <h2>Username:</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username" 
                    value={formData.username}
                    onChange={handleChange}
                />

                <h2>Email:</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <h2>Admin:</h2>
                <select
                    name="isAdmin"
                    value={formData.isAdmin ? "true" : "false"} // Conversión de booleano a string para el select
                    onChange={handleChange}
                >
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select>

                {error && <p>{error}</p>}
                <button type="submit">Edit User</button>
            </form>
        </div>
    );
};

export default EditReservation;
