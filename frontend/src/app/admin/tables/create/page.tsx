"use client";  // Marca el componente como Cliente
import { useState } from 'react';
import api from '../../../../services/api';
import { useRouter } from "next/navigation";

const Login = () => {
    const [tableNumber, setTableNumber] = useState('');
    const [seats, setSeats] = useState('');
    const [error, setError] = useState<string | null>(null); 
    const router = useRouter();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post('/tables', { tableNumber, seats });
            console.log(response.data);
            router.push("/admin/tables");
        } catch (err) {
            setError('Invalid data');
        }
    };

  return (
      <div className='container mt-6'>
          <h1>Create a table</h1>
          <form onSubmit={handleSubmit} className='mt-3'>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <h2>Position of seat:</h2>
                <input 
                    type="text" 
                    placeholder="Position" 
                    value={tableNumber} 
                    onChange={(e) => setTableNumber(e.target.value)} 
                />
                <h2>Number of seats:</h2>
                <input 
                    type="number" 
                    placeholder="Number of seats" 
                    value={seats} 
                    onChange={(e) => setSeats(e.target.value)} 
                />
                <button type="submit">Create a table</button>
          </form>
      </div>
  );
};

export default Login;