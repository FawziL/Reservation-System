"use client";  // Marca el componente como Cliente
import { useState } from 'react';
import { useRouter } from "next/navigation";
import api from '@/services/api';
import { useAuth } from '@/hooks/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); 
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data.access_token);

            if (response.status === 200) {
                toast.success(`Te has logueado con éxito! 
                    Status: ${response.statusText}`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                router.push("/");
            }
        } catch (err:any) {
            toast.error(`${err.response.statusText}: ${err.response.data.message}`, {
                position: "top-right",
                autoClose: 3000,
            });
            setError('Invalid email or password');
        }
    };

  return (
      <div className='container mt-6'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className='mt-3'>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <h2>Email:</h2>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <h2>Password:</h2>
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
            </form>
            <p className='text-center'>
                <a href="/auth/forget-password">Do you forget your password?</a>
            </p>
      </div>
  );
};

export default Login;