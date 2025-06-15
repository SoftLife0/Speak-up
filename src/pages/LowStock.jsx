// pages/LowStock.jsx
import React, { useEffect, useState } from "react"
import { apiService } from "../services/apiService"
const LowStock = ({user}) => {
  const [products, setProducts] = useState([])

  const fetchStock = async () => {
      console.log("Fetching transactions...")
      try {
          const response = await apiService.get("/low-stock")
          console.log(response)
          setProducts(response?.data || []) // ✅ correct way
      } catch (error) {
          console.error("Error fetching transactions:", error)
      }
  }
  
    useEffect(() => {
        fetchStock()
    }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Low Stock Items</h1>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Active Stock</th>
            <th className="p-2 border">Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.stock}</td>
              <td className="p-2 border">{p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LowStock
