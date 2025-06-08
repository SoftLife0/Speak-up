import { useState, useEffect, use } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext'
import { apiService } from '../services/apiService'


const Dashboard = ({user}) => {
    const navigate = useNavigate()
    const { logoutUser } = useUser()

    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [shouldRefetch, setShouldRefecth] = useState(false);

    const fetchSummary = async () => {
        setLoading(true)
        setShouldRefecth(true)

        try {
            const response = await apiService.get('/dashboard');
            setSummary(response.data);
        } catch (error) {
            setError(error.message);
            
        } finally {
            setLoading(false)
            setShouldRefecth(false)
        }
    };

    useEffect(() => {
        if (shouldRefetch) {
            fetchSummary();
        }
    }, [shouldRefetch]);

    const handleLogout = async (e) => {
        logoutUser(user)
    }


    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Welcome, {user?.email}</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 shadow rounded">
                    <p className="text-gray-500">Users</p>
                    <h3 className="text-lg font-bold">{summary?.total_inventory}</h3>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <p className="text-gray-500">Products</p>
                    <h3 className="text-lg font-bold">{summary?.total_products}</h3>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <p className="text-gray-500">Inventory Value</p>
                    <h3 className="text-lg font-bold">₦{summary?.total_categories}</h3>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <p className="text-gray-500">Low Stock Alerts</p>
                    <h3 className="text-lg font-bold text-red-500">{summary?.low_stock}</h3>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

