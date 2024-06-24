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
                                        return (
                                            <tr key={index} className="border border-gray-500 border-x-0 border-t-0 font-mono">
                                                <td className=" text-lg text-teal-200">{element.product_id}</td>
                                                <td>{element.product_name}</td>
                                                <td>{element.quantity}</td>
                                                <td>{element.unit}</td>
                                                <td>{element.price}</td>
                                                <td className="flex gap-2 py-2">
                                                    <button type="button" className="px-4 py-2 bg-gray-400 text-black rounded-lg border border-solid border-neutral-950 hover:text-white hover:bg-black hover:border-solid hover:border-white" onClick={() => handleEditProductClick(element.product_id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                        </svg>
                                                    </button>
                                                    <button type="button" className="px-4 py-2 bg-gray-400 text-black rounded-lg border border-solid border-neutral-950 hover:text-white hover:bg-black hover:border-solid hover:border-white" onClick={() => handleDeleteProduct(element.product_id)} disabled={loading}>{loading ? 'Deleting...' : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                    }</button>
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
                            <button
                                type="button"
                                className="relative px-4 py-2 font-mono bg-gray-400 text-black rounded-lg border border-solid border-neutral-950 hover:px-0 hover:text-white hover:bg-black hover:border-white hover:text-transparent group"
                                onClick={handleAddProductClick}
                            >
                                Add Product
                                <svg
                                    className=" size-6 absolute inset-0 m-auto w-10 h-10 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
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