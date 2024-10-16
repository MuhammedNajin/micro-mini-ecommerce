import React, { useEffect, useState } from 'react';
import { createAxios } from '../../api/createAxios';
import { ADMIN_URL,  } from '../../api/urls/url';
import { uploadFile } from '../../config/firebase/uploadImges';
import Spinner from '../../components/utilities/spinner';


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: Blob | string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

//    cloudinaryConfing();
       const Axios = createAxios(ADMIN_URL)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    title: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    
  });
  const [loading, setLoading ] = useState<{state: boolean, url: string }>({state: false, url: ''});

 useEffect(() => {   
   async function fetch() {
       const responce = await Axios?.get('/product') 
       if(!responce) throw new Error();
       if(responce.status == 200) {
          console.log(responce.data);
          setProducts(responce.data);
       }  
   }
   fetch()
 },[]);

  const openModal = (mode: 'add' | 'edit' | 'delete', product?: Product) => {
    setModalMode(mode);
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = async () => {
    console.log(newProduct);
    try {
    setLoading({ ...loading, state: true });  
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ title: '', description: '', price: 0, category: '', stock: 0, });
    const res = await uploadFile(newProduct.image as Blob);
    console.log('res',res)
    setLoading({...loading, state: false})
     

   
        const response = await Axios?.post('/product',{ ...newProduct, image: res} )
        if(response?.status === 201) {
            console.log(response.data);
            
        }

    closeModal();
    } catch (error) {
        console.log(error);
        
    }
  };

  const handleUpdateProduct = async () => {
    if (selectedProduct) {
        console.log('selected',selectedProduct);
        const res = await uploadFile(selectedProduct.image as Blob);
    console.log('res',res)
    setLoading({...loading, state: false})
     
        const response = await Axios?.put('/product',{ ...selectedProduct, image: res,},)
        if(response?.status === 201) {
            console.log(response.data);
            
        }
      setProducts([...products, response?.data]);
      closeModal();
    }
  };

  const handleDeleteProduct = async() => {
    if (selectedProduct) {
      const response = await Axios?.delete(`/product/${selectedProduct.id}`, );
      if(response?.status == 200) {
        setProducts(products.filter(p => p.id !== selectedProduct.id));
        closeModal();
      } else {
        throw new Error();
      }
     
    }
  };

  const imageUpdate = () => {
    
  }

  const renderModalContent = () => {
    switch (modalMode) {
      case 'add':
      case 'edit':
        const product = modalMode === 'edit' ? selectedProduct : newProduct;
        return (
          <>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {modalMode === 'add' ? 'Add New Product' : 'Edit Product'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={product?.title}
                  onChange={e => modalMode === 'edit' && selectedProduct 
                    ? setSelectedProduct({...selectedProduct, title: e.target.value})
                    : setNewProduct({...newProduct, title: e.target.value})}
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={product?.description}
                  onChange={e => modalMode === 'edit' && selectedProduct 
                    ? setSelectedProduct({...selectedProduct, description: e.target.value})
                    : setNewProduct({...newProduct, description: e.target.value})}
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={product?.price}
                  onChange={e => modalMode === 'edit' && selectedProduct
                    ? setSelectedProduct({...selectedProduct, price: parseFloat(e.target.value)})
                    : setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={product?.category}
                  onChange={e => modalMode === 'edit' && selectedProduct
                    ? setSelectedProduct({...selectedProduct, category: e.target.value})
                    : setNewProduct({...newProduct, category: e.target.value})}
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={product?.stock}
                  onChange={e => modalMode === 'edit' && selectedProduct
                    ? setSelectedProduct({...selectedProduct, stock: parseInt(e.target.value)})
                    : setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="file"
                  placeholder="Image URL"
                 
                  onChange={e => modalMode === 'edit' && selectedProduct
                    ? setSelectedProduct({...selectedProduct, image: e.target.files[0]})
                    : setNewProduct({...newProduct, image: e.target?.files[0] as Blob})}
                  className="mb-2 w-full p-2 border rounded"
                />
              </div>
              <div className="flex items-center justify-center">
                {
                    loading.state ? <Spinner /> 
                    : <img
                    src={loading?.url || 'https://via.placeholder.com/150'}
                    alt={product?.title || 'Product'}
                    className="max-w-full max-h-48 object-contain rounded-lg shadow-md"
                  />
                }
                
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={modalMode === 'add' ? handleAddProduct : handleUpdateProduct}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 transition duration-300 ease-in-out"
              >
                {modalMode === 'add' ? 'Add' : 'Update'}
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </>
        );
      case 'delete':
        return (
          <>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Delete Product</h3>
            <p className="mb-4 text-gray-600">Are you sure you want to delete {selectedProduct?.title}?</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleDeleteProduct}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2 transition duration-300 ease-in-out"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>
      <button
        onClick={() => openModal('add')}
        className="mb-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Add New Product
      </button>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.image as string} alt={product.title} className="h-10 w-10 rounded-full object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openModal('edit', product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openModal('delete', product)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative p-8 border w-full max-w-xl shadow-lg rounded-md bg-white">
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;