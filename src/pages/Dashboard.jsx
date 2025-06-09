import { useState, useEffect } from 'react'
import { useUser } from '../context/userContext'
import { apiService } from '../services/apiService'

const Dashboard = ({ user }) => {
  const { logoutUser } = useUser()
  const [summary, setSummary] = useState(null)
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({name: '',category_id: '',price: '',description: '',min_stock: ''})
  
  const fetchSummary = async () => {
    try {
      const res = await apiService.get('/dashboard')
      setSummary(res.data)
    } catch (err) {
      setError(err.message)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await apiService.get('/allproducts')
      setProducts(res.data)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCreateProduct = async () => {
    try {
      await apiService.post('/create_product', formData)
      fetchProducts()
      setFormData({ name: '', category_id: '', price: '', description: '', min_stock: '' })
      document.getElementById('closeModalBtn').click()
    } catch (err) {
      setError('Error creating product: ' + err.message)
    }
  }

  useEffect(() => {
    fetchSummary()
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <p className="p-4">Loading...</p>
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      <h2 className="text-2xl font-semibold">Welcome, {user?.username}</h2>

      {/* Quick Actions */}
      <div className="flex justify-between items-center">
        <h4 className="text-2xl font-semibold">Quick overview of your inventory</h4>
        <div className="flex flex-wrap gap-2">
    
            <button className="px-4 py-2 rounded" data-bs-toggle="modal" data-bs-target="#addProductModal">Add Product</button>
            <button className="text-success flex items-center gap-2"
            onClick={() => {
                fetchSummary()
                fetchProducts()
            }}
            >
            <i className="bi bi-arrow-clockwise"></i>
            Refresh
            </button>
        </div>
        </div>

      <div className="row">
        <div className="col-md-5">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <SummaryCard label="Inventory" value={summary?.total_inventory} />
              <SummaryCard label="Products" value={summary?.total_products} />
            </div>
            <div className="flex gap-4">
              <SummaryCard label="Categories" value={summary?.total_categories} />
              <SummaryCard label="Low Stock" value={summary?.low_stock} color="text-red-600" />
            </div>
          </div>
        </div>

        <div className="col-md-7">
            {/* Product Table Section */}
            <div className="bg-white p-4 rounded shadow">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                <h3 className="text-lg font-semibold">Product List</h3>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="border rounded px-3 py-2 w-full sm:w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                </div>

                <div className="overflow-x-auto">
                <table className="min-w-full table-auto border">
                    <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Stock</th>
                        <th className="p-2 border">Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredProducts.map((prod) => (
                        <tr key={prod.id} className="border-t hover:bg-gray-50">
                        <td className="p-2 border">{prod.name}</td>
                        <td className="p-2 border">₦{prod.price}</td>
                        <td className="p-2 border">{prod.stock}</td>
                        <td className="p-2 border">{prod.category?.name}</td>
                        </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                        <tr>
                        <td colSpan="4" className="text-center p-4 text-gray-500">
                            No products found.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <div className="modal fade" id="addProductModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Product</h5>
              <button type="button" id="closeModalBtn" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Category ID"
                value={formData.category_id}
                onChange={e => setFormData({ ...formData, category_id: e.target.value })}
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Price"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
              />
              <textarea
                className="form-control mb-2"
                placeholder="Description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Minimum Stock"
                value={formData.min_stock}
                onChange={e => setFormData({ ...formData, min_stock: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button onClick={handleCreateProduct} className="btn btn-success">Create</button>
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

const SummaryCard = ({ label, value, color = 'text-black' }) => (
  <div className="bg-white col-5 p-4 shadow rounded">
    <p className="text-sm text-gray-500">{label}</p>
    <h3 className={`text-xl font-bold ${color}`}>{value}</h3>
  </div>
)
