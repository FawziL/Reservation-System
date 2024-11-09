"use client";  // Marca el componente como Cliente
import { useState } from 'react';
import api from '../../../services/api';

const CreateReservation = () => {
    const [table, setTable] = useState('');
    const [date, setDate] = useState('');
    //obtener el user id y enviarlo para procesar la solicitud
    const [error, setError] = useState<string | null>(null); 

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post('/reservations', { table, date, /*serid//*/ });
            console.log(response.data)
        } catch (err) {
            setError('Invalid table or date');
        }
    };

    return (
        <div className='container mt-6'>
            <h1>Create a reservation!</h1>
            <form onSubmit={handleSubmit} className='mt-3'>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <h2>table:</h2>
                    <input 
                        type="table" 
                        placeholder="table" 
                        value={table} 
                        onChange={(e) => setTable(e.target.value)} 
                    />
                    <h2>date:</h2>
                    <input 
                        type="date" 
                        placeholder="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                    />
                    <button type="submit">Login</button>
            </form>
        </div>
  );
};

export default CreateReservation;