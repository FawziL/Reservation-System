"use client";  // Marca el componente como Cliente
import { useState } from 'react';
import api from '../../../services/api';
import { useAuth } from '../../../hooks/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); 
    const { login } = useAuth();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post('/auth/login', { email, password });
            console.log(response.data.access_token);
            login(response.data.access_token);
        } catch (err) {
            toast.error("Invalid email or password", {
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
      </div>
  );
};

export default Login;