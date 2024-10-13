"use client";  // Marca el componente como Cliente
import { useState } from 'react';
import api from '../../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); 

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token); // Guardar token
        } catch (err) {
            setError('Invalid email or password');
        }
    };

  return (
      <div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
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