import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateProducts, getProductById } from "../api/products";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(productId);
        setProductName(product.product_name || '');
        setQuantity(product.quantity || '');
        setUnit(product.unit || '');
        setPrice(product.price || '');
      } catch (error) {
        console.error('Failed to fetch product', error);
        setError('Failed to fetch product');
      }
    };

    fetchProduct();
  }, [productId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await updateProducts(productId, productName, quantity, unit, price);
      setSuccess('Product updated successfully');
      navigate('/inventory');
    } catch (error) {
      setError('Failed to update product');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-zinc-900">
        <div className="pt-10 pb-2 text-4xl font-bold tracking-wider font-serif text-center text-white">Edit Product Details</div>

        <div className="flex justify-center item-center font-mono">
        <div className="bg-gradient-to-b from-zinc-800 to-zinc-700 rounded-2xl border-2 border-white w-fit m-5 p-5 content-center self-center">
        <h1 className="p-2 m-2 pt-0 text-base font-bold font-sans text-center text-sky-500">Modify the product record with new information</h1>

        <div className="px-16 text-center flex justify-center item-center text-white">
        
        {error && <p style={{ color: 'red', background: 'white', borderRadius: '10px', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}
        {success && <p style={{ color: 'green', background: 'white', borderRadius: '10px', textAlign: 'center', marginBottom: '20px' }}>{success}</p>}

          <form onSubmit={handleUpdate}>
            <div className="flex gap-9 m-5">
              <p className="text-md">Product ID:</p>
              <input type="text" disabled value={productId} className="ml-3 p-1 rounded border border-gray-500" />
            </div>
            <div className="flex gap-2 m-5">
              <p className="text-md">Product Name:</p>
              <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="ml-5 p-1 text-black rounded border border-gray-500" />
            </div>
            <div className="flex gap-12 m-5">
              <p className="text-md">Quantity:</p>
              <input type="text" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="ml-4 p-1 text-black rounded border border-gray-500" />
            </div>
            <div className="flex gap-20 m-5">
              <p className="text-md">Unit:</p>
              <input type="text" id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} className="ml-5 p-1 text-black rounded border border-gray-500" />
            </div>
            <div className="flex gap-20 m-5">
              <p className="text-md">Price:</p>
              <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="ml-3 p-1 text-black rounded border border-gray-500" />
            </div>
            <div className="flex justify-center px-5 mb-0">
              <button type="submit" className="font-medium p-3 px-10 m-3 rounded-xl bg-gray-400 text-black border border-solid border-neutral-950 hover:text-white hover:bg-black hover:border-solid hover:border-white hover:cursor-pointer" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default UpdateProduct;