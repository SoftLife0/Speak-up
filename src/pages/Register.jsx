import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/speaklogo.png';
import { apiService } from '../services/apiService';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [full_name, setFull_name] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const signupData = { email, password, full_name, role: "patient" };
        console.log("Data", signupData)

        try {
            const result = await apiService.post('/register', signupData);
            if (result.success) {
                alert("Registered successfully!");
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

                <h2 className='text-xl font-bold text-center pb-2'>Create an account</h2>
                <p className='text-center text-sm mb-4'> Already have an account ? <Link to="/login" className='text-blue-500'>Login</Link>
                </p>
                <div className='flex flex-col gap-4'>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border rounded-md p-2' placeholder='example@gmail.com' required />

                    <label>Full Name</label>
                    <input type="text" value={full_name} onChange={(e) => setFull_name(e.target.value)} className='border rounded-md p-2' placeholder='John Doe' required />
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        className='border rounded-md p-2' placeholder='********' required />
                    <button type="submit" disabled={loading} 
                        className='bg-blue-500 text-black rounded-md p-2 mt-3 hover:bg-blue-600 disabled:bg-gray-400'>
                        {loading ? 'Processing...' : 'Create Account'}
                    </button>
                    {error && <p className='text-red-600 text-center'>{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default Register;