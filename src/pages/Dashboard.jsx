import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Dashboard = () => {
    const navigate = useNavigate()
    const { session, logout} = UserAuth()
    console.log(session)

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout()
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <h5>Welcome, {session?.user?.email}</h5>
        <div>
            <p className='hover:cursor-pointer border inline-block px-4 py-3 mt-4' onClick={handleLogout}>
                Sign out
            </p>
        </div>
    </div>
  )
}

export default Dashboard