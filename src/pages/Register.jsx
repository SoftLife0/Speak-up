import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error , setError] = useState('');
    
    const { session, register} = UserAuth();
    const navigate = useNavigate();

    console.log(session)

    const  handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await register(email, password);
            if (result.success) {
                console.log("Account Registered", result);
                navigate('/dashboard');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className='max-w-md mx-auto pt-24'>
            <h2 className='font-bold pb-2'>Sign Up today!</h2>
            <p>Already have an account ? <Link to="/login" className='text-blue-500'>Sign In</Link> </p>
            <div className='flex flex-col gap-4'>
                <label htmlFor="email">Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='example@gmail.com' className='border border-gray-400 rounded-md p-2' />
                <label htmlFor="password">Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='********' className='border border-gray-400 rounded-md p-2' />
                <button type="submit" disabled={loading} className='bg-blue-500 text-dark rounded-md p-2 mt-3'>Sign Up</button>

                {error && <p className='text-red-500 pt-4'>{error}</p>}
            </div>
        </form>
    </div>
  )
}

export default Register