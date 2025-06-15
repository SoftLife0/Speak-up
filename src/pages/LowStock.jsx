import { useEffect, useState } from "react"
import { apiService } from "../services/apiService"
import Layout from "../layouts/Layout"
import { Link } from "react-router-dom"


const LowStock = ({user}) => {
  const [products, setProducts] = useState([])

  const fetchStock = async () => {
      console.log("Fetching transactions...")
      try {
          const response = await apiService.get("/low-stock")
          console.log(response)
          setProducts(response?.data || [])
      } catch (error) {
          console.error("Error fetching transactions:", error)
      }
  }
  
  useEffect(() => {
      fetchStock()
  }, [])

  return (
    <Layout>
      <div className='row d-flex justify-center'>
        <div className="col-md-9">
          <div className="bg-white p-4 rounded shadow h-100 overflow-y-scroll">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                <h3 className="text-lg font-semibold">Low Stock Items</h3>
                <Link to="/dashboard" className="text-blue-500 hover:underline">Back</Link>
            </div>

            <div className="overflow-x-auto"></div>
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
        </div>
      </div>
    </Layout>
  )
}

export default LowStock
