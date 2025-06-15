import { useEffect, useState } from "react"
import { apiService } from "../services/apiService"
import Layout from "../layouts/Layout"
import { Link } from "react-router-dom"


const Transactions = ({user}) => {
  const [data, setData] = useState([])

  const fetchTransactions = async () => {
    console.log("Fetching transactions...")
    try {
        const response = await apiService.get("/transactions")
        console.log(response)
        setData(response?.data || [])
    } catch (error) {
        console.error("Error fetching transactions:", error)
    }
}

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <Layout>
        <div className='row d-flex justify-center'>
            <div className="col-md-9">
                <div className="bg-white p-4 rounded shadow h-100 overflow-y-scroll">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                        <h3 className="text-lg font-semibold">Transaction History</h3>
                        <Link to="/dashboard" className="text-blue-500 hover:underline">Back</Link>
                    </div>

                    <div className="overflow-x-auto"></div>
                    <table className="w-full border text-sm">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Customer</th>
                            <th className="p-2 border">Total Amount</th>
                            <th className="p-2 border">Item</th>
                            <th className="p-2 border">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((tx) => (
                            <tr key={tx.id}>
                                <td className="p-2 border">{tx.id}</td>
                                <td className="p-2 border">{tx.customer_name}</td>
                                <td className="p-2 border">GHC {tx.total_amount.toFixed(2)}</td>
                                <td className="p-2 border">
                                    <ul className="list-disc pl-4">
                                        {tx.items.map((item, index) => (<li key={index}>{item.product_name} × {item.quantity}</li>))}
                                    </ul>
                                </td>
                                <td className="p-2 border">
                                    {new Date(tx.created_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Transactions
