import { useEffect, useState } from "react";
import { getProducts, delProducts, getProductById, updateProducts } from "../api/products";
import UpdateProduct from "./updateProducts";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate(); // Create a navigate function
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const response = await getProducts();
        setProducts(response);
    }

    const handleAddProductClick = () => {
        navigate("/add-product"); // Navigate to /add-products when button is clicked
      }

      const handleEditProductClick = (productId) => {
        navigate(`/update-by-id/${productId}`);
      };

      const handleDeleteProduct = async (productId) => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await delProducts(productId);
            setSuccess('Product deleted successfully');
            console.log(response);
            getAllProducts(); // Refresh the product list after deletion
        } catch (error) {
            setError('Failed to delete product');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <div className="w-screen h-fit bg-cyan-950">
        <div className="pt-5 text-4xl font-bold font-serif text-center tracking-wide text-white">Pluton Technologies</div>
            <div className="pt-5 text-2xl font-sans font-bold text-center text-cyan-300 tracking-wider">Inventory Management Dashboard</div>

        <div className="flex justify-center item-center">
        <div className=" bg-cyan-800 rounded-2xl border-2 w-fit border-white m-5 p-5 content-center self-center">
        <div className=" pb-5 text-2xl font-bold font-serif text-center tracking-wide text-gray-100">Product Listings</div>

            <table className="text-center text-white">
                <thead>
                <tr className="border border-white border-x-0 font-sans">
                    <th className="py-3 px-8">Product ID</th>
                    <th className="py-3 px-8">Product Name</th>
                    <th className="py-3 px-8">Quantity</th>
                    <th className="py-3 px-8">Unit</th>
                    <th className="py-3 px-8">Price</th>
                    <th className="py-3 px-8">Actions</th>
                </tr>
                </thead>
                <tbody>
                    {
                        products.map((element, index) => {
                            return(
                                <tr key={index} className="border border-gray-500 border-x-0 border-t-0 font-mono">
                                    <td className=" text-lg text-teal-200">{element.product_id}</td>
                                    <td>{element.product_name}</td>
                                    <td>{element.quantity}</td>
                                    <td>{element.unit}</td>
                                    <td>{element.price}</td>
                                    <td className="flex gap-2 py-2">
                                        <button type="button" className="px-4 py-2 bg-gray-400 text-black rounded-lg border border-solid border-neutral-950 hover:text-white hover:bg-black hover:border-solid hover:border-white" onClick={() => handleEditProductClick(element.product_id)}>Edit</button>
                                        <button type="button" className="px-4 py-2 bg-gray-400 text-black rounded-lg border border-solid border-neutral-950 hover:text-white hover:bg-black hover:border-solid hover:border-white" onClick={() => handleDeleteProduct(element.product_id)}disabled={loading}>{loading ? 'Deleting...' : 'Delete'}</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {error && <p style={{ color: 'red', background: 'white', borderRadius: '10px', textAlign: 'center', marginTop: '20px' }}>{error}</p>}
            {success && <p style={{ color: 'green', background: 'white', borderRadius: '10px', textAlign: 'center', marginTop: '20px' }}>{success}</p>}

            <div className="flex mt-4 justify-center">
                <button type="button" className="px-4 py-2 font-mono bg-gray-400 text-black rounded-lg border border-solid border-neutral-950 hover:text-white hover:bg-black hover:border-solid hover:border-white" onClick={handleAddProductClick}>Add Product</button>
            </div>

        </div>
        </div>

        {selectedProduct && (
                <UpdateProduct product={selectedProduct} setSelectedProduct={setSelectedProduct} />
            )}

        </div>
        </>
    )
}

export default Inventory;