import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error , setError] = useState('');
    
    const { session, login} = UserAuth();
    const navigate = useNavigate();

    console.log(session)

    const  handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await login(email, password);
            if (result.success) {
                console.log("Account Logged In", result);
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
            <h2 className='font-bold pb-2'>Login to your account!</h2>
            <p>Don't have an account ? <Link to="/register" className='text-blue-500'>Create Account</Link> </p>
            <div className='flex flex-col gap-4'>
                <label htmlFor="email">Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='example@gmail.com' className='border border-gray-400 rounded-md p-2' />
                <label htmlFor="password">Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='********' className='border border-gray-400 rounded-md p-2' />
                <button type="submit" disabled={loading} className='bg-blue-500 text-dark rounded-md p-2 mt-3'>Login</button>

                {error &&  <p className='text-red-600 pt-4'>{error}</p>}
            </div>
        </form>
    </div>
  )
}

export default Login