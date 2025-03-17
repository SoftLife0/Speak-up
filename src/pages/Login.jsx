import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import logo from '../assets/images/speaklogo.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { login } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-lg w-120'>
                <div className="flex justify-center">
                    <img src={logo} alt="logo" className="w-24 mb-5" />
                </div>

                <h2 className='text-xl font-bold text-center pb-2'>Login to Your Account</h2>
                <p className='text-center text-sm mb-4'>
                    Don't have an account ? <Link to="/register" className='text-blue-500'>Sign Up</Link>
                </p>
                <div className='flex flex-col gap-4'>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                        className='border rounded-md p-2' placeholder='example@gmail.com' required />
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        className='border rounded-md p-2' placeholder='********' required />
                    <button type="submit" disabled={loading} 
                        className='bg-blue-500 text-black rounded-md p-2 mt-3 hover:bg-blue-600 disabled:bg-gray-400'>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className='text-red-600 text-center'>{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default Login;