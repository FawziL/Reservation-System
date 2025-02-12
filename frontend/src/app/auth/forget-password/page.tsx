"use client";  // Marca el componente como Cliente
import { useState } from 'react';
import api from '@/services/api';
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/request-password-reset', { email });

            if (response.status === 200) {
                setMessage("¡Se ha enviado el correo de confirmación!");
                toast.success(
                    `Se ha enviado el correo de confirmación con éxito! 
                    Status: ${response.statusText}`,
                    {
                        position: "top-right",
                        autoClose: 3000,
                    }
                );
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
            <h1>Recuperar Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Enviar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ForgotPassword;