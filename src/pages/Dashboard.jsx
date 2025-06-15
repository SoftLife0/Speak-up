import { useState, useEffect } from 'react'
import { apiService } from '../services/apiService'
import SummaryCard from '../components/SummaryCard'
import { toast } from 'react-toastify';
import Layout from '../layouts/Layout';


const Dashboard = ({ user }) => {
  const [summary, setSummary] = useState(null)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [customerName, setCustomerName] = useState('')
const [cartItems, setCartItems] = useState([])
const [posSearch, setPosSearch] = useState('')
const [selectedProduct, setSelectedProduct] = useState(null)
const [quantity, setQuantity] = useState(1)


const handleSubmitPOS = async () => {
  if (!customerName) return alert("Enter customer name")
  if (cartItems.length === 0) return alert("Add at least 1 item")

  const payload = {
    customer_name: customerName,
    items: cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      subtotal: item.unit_price * item.quantity
    }))
  }

  try {
    await apiService.post('/sell', payload)
    alert("Sale complete ✅")
    setCustomerName('')
    setCartItems([])
    fetchProducts()
    fetchSummary()
    document.querySelector('#posModal .btn-close').click()
  } catch (err) {
    const errorMessage = err.response?.data?.error
    console.log(errorMessage)
    toast.error(errorMessage);    
    alert(errorMessage)
  }
}



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

  const handleStockIntake = async () => {
  if (!formData.product_id || !formData.quantity) {
    setError("Product and quantity are required")
    return
  }

  try {
    await apiService.post("/add_stock", {
      product_id: formData.product_id,
      quantity: parseInt(formData.quantity),
    })
    toast.success("Stock updated successfully")
    fetchProducts()
    setFormData({})  // reset
    setError(null)
    document.querySelector("#stockIntakeModal .btn-close").click()
  } catch (err) {
    setError("Error updating stock: " + err.message)
  }
}


  const fetchCategories = async () => {
    try {
      const res = await apiService.get('/categories')
      setCategories(res.data)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCreateProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // name price category and minstock should be required
    if (!formData.name || !formData.price || !formData.category_id || !formData.min_stock) {
      setError('All fields are required')
      setLoading(false)
      return
    }
    
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
    fetchCategories()
  }, [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

//   if (loading) return <p className="p-4">Loading...</p>
//   if (error) return <p className="p-4 text-red-500">Error: {error}</p>

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-semibold">Welcome, {user?.username}</h2>
            <h4 className="text-2xl font-semibold">Quick overview of your inventory</h4>
        </div>

        <div className="flex flex-wrap gap-2">
    
            <button className="px-2 rounded" data-bs-toggle="modal" data-bs-target="#addProductModal">Add Product</button>
            <button className="text-success flex items-center gap-2"
            onClick={() => {
                fetchSummary()
                fetchProducts()
                fetchCategories()
            }}
            >
            <i className="bi bi-arrow-clockwise"></i>
            Refresh
            </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-5 col-12 mb-3">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <SummaryCard label="Inventory" value={summary?.total_inventory} />
              <SummaryCard label="Products" value={summary?.total_products} link="/products"/>
            </div>
            
            <div className="flex gap-4">
              <SummaryCard label="Transactions" value={summary?.total_prescriptions} color="text-blue-600" link="/transactions"/>
              <SummaryCard label="Low Stock" value={summary?.low_stock} color="text-red-600" link="/low-stock"/>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          {/* Product Table Section */}
          <div className="bg-white p-4 rounded shadow h-90 overflow-y-scroll">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                  <h3 className="text-lg font-semibold">Product List</h3>
                  <input type="text" placeholder="Search products..." className="border rounded px-3 py-2 w-full sm:w-64" value={search} onChange={(e) => setSearch(e.target.value)}/>
              </div>

              <div className="overflow-x-auto">
              <table className="min-w-full table-auto border">
                  <thead>
                  <tr className="bg-gray-200 text-left">
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Price (Ghc)</th>
                      <th className="p-2 border">Stock</th>
                      <th className="p-2 border">Category</th>
                  </tr>
                  </thead>
                  <tbody>
                  {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="border-t hover:bg-gray-50">
                      <td className="p-2 border">{prod.name}</td>
                      <td className="p-2 border">{prod.unit_price}</td>
                      <td className="p-2 border">{prod.stock}</td>
                      <td className="p-2 border">{categories.find(cat => cat.id === prod.category_id)?.name}</td>
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


      <div className="row">
        <div className="col-12 d-flex justify-around">
            <button className="px-6 py-3 rounded-full shadow-lg hover:bg-blue-700" data-bs-toggle="modal" data-bs-target="#posModal">
              🛒 Take Sale
            </button>

          <button className="px-2 rounded btn btn-primary" data-bs-toggle="modal" data-bs-target="#stockIntakeModal">
            Stock Intake
          </button>
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
                className="form-control mb-3"
                placeholder="Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <select
                className="form-control mb-3"
                value={formData.category_id}
                onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Price"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Minimum Stock"
                value={formData.min_stock}
                onChange={e => setFormData({ ...formData, min_stock: e.target.value })}
                required
              />
              <textarea
                className="form-control mb-3"
                placeholder="Description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="modal-footer">
              <button onClick={handleCreateProduct} className="btn btn-md btn-success">Create</button>
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


      {/* Stock Intake Modal */}
      <div className="modal fade" id="stockIntakeModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Stock Intake</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <select
                className="form-control mb-3"
                value={formData.product_id || ''}
                onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Quantity"
                value={formData.quantity || ''}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
              {error && <p className="text-danger text-center">{error}</p>}
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={handleStockIntake}>Add Stock</button>
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


      {/* POS Modal */}
      {/* POS Modal */}
      <div className="modal fade" id="posModal" tabIndex="-1">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Point of Sale</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body space-y-3">
              <input
                type="text"
                className="form-control"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />

              <input
                type="text"
                className="form-control"
                placeholder="Search product"
                value={posSearch}
                onChange={(e) => {
                  setPosSearch(e.target.value)
                  setSelectedProduct(null)
                }}
              />

              {/* Matching Product Dropdown */}
              {posSearch && (
                <div className="border rounded p-2 bg-light">
                  {products
                    .filter(p => p.name.toLowerCase().includes(posSearch.toLowerCase()))
                    .map(p => (
                      <div key={p.id} className="d-flex justify-content-between align-items-center py-1">
                        <span>{p.name} - GHC {p.unit_price}</span>
                        <button className="btn btn-sm btn-primary" onClick={() => {
                          setSelectedProduct(p)
                          setPosSearch('')
                        }}>Select</button>
                      </div>
                    ))}
                </div>
              )}

              {/* Selected product section */}
              {selectedProduct && (
                <div className="d-flex align-items-center gap-3 mt-2">
                  <strong>{selectedProduct.name}</strong>
                  <input
                    type="number"
                    value={quantity}
                    min="1"
                    className="form-control"
                    style={{ width: "80px" }}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  <button className="btn btn-success" onClick={() => {
                    const existing = cartItems.find(item => item.id === selectedProduct.id)
                    if (!existing) {
                      setCartItems([...cartItems, { ...selectedProduct, quantity }])
                    }
                    setSelectedProduct(null)
                    setQuantity(1)
                  }}>
                    Add to Cart
                  </button>
                </div>
              )}

              {/* Cart Table or Empty Message */}
              {cartItems.length === 0 ? (
                <div className="text-center text-muted mt-3">🛒 No item added to cart</div>
              ) : (
                <div className="table-responsive mt-3">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map(item => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.unit_price}</td>
                          <td>{item.quantity}</td>
                          <td>{(item.unit_price * item.quantity).toFixed(2)}</td>
                          <td>
                            <button className="btn btn-sm btn-danger" onClick={() => {
                              setCartItems(cartItems.filter(i => i.id !== item.id))
                            }}>
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-end fw-bold">
                    Total: GHC {cartItems.reduce((total, item) => total + item.unit_price * item.quantity, 0).toFixed(2)}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-success" onClick={handleSubmitPOS}>Submit Sale</button>
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Dashboard