"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import api from '@/services/api';
import { toast } from 'react-toastify';

const Register = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e: any) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
        const response = await api.post('/auth/register', formData);
        if (response.status === 201) {
            toast.success(`Te has registrado con éxito! 
                Status: ${response.statusText}`, {
                position: "top-right",
                autoClose: 3000,
            });
            router.push("/auth/login");
        }
        } catch (err:any) {
            toast.error(`${err.response.statusText}: ${err.response.data.message}`, {
                position: "top-right",
                autoClose: 3000,
            });
        setError('Registration failed. Try again.');
        }
    };

  return (
    <div className='container mt-6'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className='mt-3'>
            <h2>Username:</h2>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
            />

            <h2>Email:</h2>
            <input
                type="email"
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                required
            />

            <h2>Password:</h2>
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            {error && <p>{error}</p>}
            <button type="submit">Register</button>
        </form>
    </div>
  );
};

export default Register;
