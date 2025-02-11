"use client";  
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/services/api";

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

            if (response.status === 200) {
                setMessage("Contraseña restablecida correctamente.");
                setTimeout(() => router.push("/login"), 2000); // Redirigir al login tras 2s
            } else {
                setMessage("Error al restablecer la contraseña.");
            }
        } catch (error) {
            setMessage("Error de conexión.");
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
