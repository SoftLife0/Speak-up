import { useEffect, useState } from 'react'
import { apiService } from '../services/apiService';
import Layout from '../layouts/Layout';


const Product = ({user}) => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    const filteredProducts = products.filter((prod) =>
      prod.name.toLowerCase().includes(search.toLowerCase())
    );

    const fetchProducts = async () => {
        try {
          const res = await apiService.get('/allproducts')
          setProducts(res.data)
        } catch (err) {
          setError(err.message)
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

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [])


  return (
    <Layout>
        <div className='row d-flex justify-center'>
            <div className="col-md-9">
                {/* Product Table Section */}
                <div className="bg-white p-4 rounded shadow h-100 overflow-y-scroll">
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
    </Layout>
  )
}

export default Product