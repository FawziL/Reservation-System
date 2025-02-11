"use client";  // Marca el componente como Cliente
import { useState } from 'react';
import api from '@/services/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/request-password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.status === 200) {
                setMessage('Se ha enviado un correo con instrucciones para restablecer tu contraseña.');
            } else {
                setMessage('Error al solicitar la recuperación de contraseña.');
            }
        } catch (error) {
            setMessage('Error de conexión.');
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