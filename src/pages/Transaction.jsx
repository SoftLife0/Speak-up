// pages/Transactions.jsx
import React, { useEffect, useState } from "react"
import { apiService } from "../services/apiService"
const Transactions = ({user}) => {
  const [data, setData] = useState([])

  const fetchTransactions = async () => {
    console.log("Fetching transactions...")
    try {
        const response = await apiService.get("/transactions")
        console.log(response)
        setData(response?.data || []) // ✅ correct way
    } catch (error) {
        console.error("Error fetching transactions:", error)
    }
}

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Transaction History</h1>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Amount</th>
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
                {new Date(tx.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions
