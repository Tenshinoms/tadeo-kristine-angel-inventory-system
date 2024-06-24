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

  const handleBackButton = () => {
    navigate("/inventory"); // Navigate to /inventory when button is clicked
  }

  return (
    <div className="w-screen h-fit bg-zinc-900">
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
              <button
                type="submit"
                className="relative px-4 py-2 font-mono bg-gray-400 text-black rounded-lg border border-solid border-neutral-950 hover:px-4 hover:text-white hover:bg-black hover:border-white hover:text-transparent group" disabled={loading}>
                  {loading ? 'Updating...' : 'Update'}

                  <svg
                      className=" size-6 p-1 absolute inset-0 m-auto w-10 h-10 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  >
                      <path d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
              </button>
            </div>
          </form>
        </div>
            <div className="flex justify-end mb-0">
              <button type="button" className="p-2 px-3 m-0 rounded-xl bg-gray-400 text-black border border-solid border-neutral-950 hover:text-white hover:bg-black hover:border-solid hover:border-white hover:cursor-pointer" onClick={handleBackButton}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>  
              </button>
            </div>
      </div>
      </div>
    </div>
  );
};

export default UpdateProduct;