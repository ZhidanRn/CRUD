import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useSWR, {useSWRConfig} from 'swr'
import { deleteProduct } from '../../../backend/controllers/ProductController'

const ProductList = () => {
    const {mutate} = useSWRConfig()
    const fetcher = async () => {
        const response = await axios.get('http://localhost:5000/products')
        return response.data
    }

    const { data } = useSWR('products', fetcher)
    if(!data) return <h2>Loading...</h2>

    const deleteProduct = async (productId) => {
        await axios.delete(`http://localhost:5000/products/${productId}`)
        mutate('products')
    }
  return (
    <div className='flex flex-col mt-5 max-w-5xl mx-auto'>
        <div className="w-full">
            <Link className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' to='/add'>Add New</Link>
            <div className="relative shadow rounded-lg mt-3">
                <table className='w-full text-sm text-left text-grey-500'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                        <tr>
                            <th className='py-3 px-1 text-center'>No</th>
                            <th className='py-3 px-6'>Product Name</th>
                            <th className='py-3 px-6'>Price</th>
                            <th className='py-3 px-1 text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product, index) => (
                        <tr className='bg-white border-b key={product.id}'>
                            <td className='py-3 px-1 text-center'>{index+1}</td>
                            <td className='py-3 px-6 font-medium text-gray-900'>{product.name}</td>
                            <td className='py-3 px-6'>${product.price}</td>
                            <td className='py-3 px-1 text-center'>
                                <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3' to={`/edit/${product.id}`}>Edit</Link>
                                <button onClick={() => deleteProduct(product.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete</button>
                            </td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
      
    </div>
  )
}

export default ProductList
