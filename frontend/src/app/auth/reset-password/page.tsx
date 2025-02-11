"use client";  
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/services/api";
import { toast } from "react-toastify";

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const token = searchParams.get("token"); // Obtiene el token desde la URL

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            setMessage("Token no válido o expirado.");
            return;
        }

        try {
            const response = await api.post("/auth/reset-password", { token, newPassword });
            if (response.status === 201) {
                setMessage("¡Contraseña restablecida correctamente.!");
                toast.success(
                    `Se ha restablecida correctamente la contraseña con éxito! 
                    Status: ${response.statusText}`,
                    {
                        position: "top-right",
                        autoClose: 3000,
                    }
                );
                setTimeout(() => router.push("/auth/login"), 3000);
            }

        } catch (err:any) {
            const errorMessage = err.response?.data?.message || 'Unexpected error';

            toast.error(`${err.response?.statusText || 'Error'}: ${errorMessage}`, {
                position: 'top-right',
                autoClose: 3000,
            });
            setMessage(errorMessage);
        }
    };

    return (
        <div>
            <h1>Restablecer Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Restablecer</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
