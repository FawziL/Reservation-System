"use client";  // Marca el componente como Cliente
import { useState } from 'react';
import api from '../../services/api';

const Register = () => {
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
        }
        } catch (error) {
        setError('Registration failed. Try again.');
        }
    };

  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
            />
            </div>
            <div>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            </div>
            <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Register</button>
        </form>
    </div>
  );
};

export default Register;
