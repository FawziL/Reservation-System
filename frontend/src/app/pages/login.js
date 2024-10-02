import { useState } from 'react';
import api from '../services/api';
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token); // Guardar token
            router.push('/dashboard'); // Redirigir después del login
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
