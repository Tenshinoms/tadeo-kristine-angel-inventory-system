import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProducts } from "../api/products";

const AddProduct = () => {

  const navigate = useNavigate();
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = async () => {
    const response = await addProducts(productId, productName, quantity, unit, price);
    console.log(response)
    navigate('/inventory');
  }

  const handleBackButton = () => {
    navigate("/inventory"); // Navigate to /inventory when button is clicked
  }

    return(
<>
      <div className="w-screen h-screen bg-zinc-900">
      <div className="pt-10 pb-5 text-4xl font-bold tracking-wider font-serif text-center text-white">New Product Entry</div>

        <div className="flex justify-center item-center font-mono">
        <div className="bg-gradient-to-b from-zinc-800 to-zinc-700 rounded-2xl border-2 w-fit border-white m-5 p-5 content-center self-center">
          <h1 className="p-1 m-2 text-base tracking-wide font-bold font-sans text-center text-sky-500">Fill out the fields to add a new product to your inventory.</h1>

      <div className="px-20 text-white">
          <div className="flex gap-9 m-5">
            <p className="text-md">Product ID:</p>
            <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} className="ml-1 p-1 rounded border border-gray-500 text-black"></input>
          </div>

          <div className="flex gap-2 m-5">
            <p className="text-md">Product Name:</p>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="ml-4 p-1 rounded border border-gray-500 text-black"></input>
          </div>
          <div className="flex gap-12 m-5">
            <p className="text-md">Quantity:</p>
            <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="ml-3 p-1 rounded border border-gray-500 text-black"></input>
          </div>
          <div className="flex gap-20 m-5">
            <p className="text-md">Unit:</p>
            <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} className="ml-4 p-1 rounded border border-gray-500 text-black"></input>
          </div>
          <div className="flex gap-20 m-5">
            <p className="text-md">Price:</p>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="ml-2 pr-0 pl-2 p-1 rounded border border-gray-500 text-black"></input>
          </div>
        </div>

        <div className="flex px-5 justify-center">
                            <button
                                type="button"
                                className="relative px-5 py-2 font-mono bg-gray-400 text-black rounded-lg border border-solid border-neutral-950 hover:px-5 hover:text-white hover:bg-black hover:border-white hover:text-transparent group"
                                onClick={handleAdd}
                            >
                                Add
                                <svg
                                    className=" size-6 p-1 absolute inset-0 m-auto w-10 h-10 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100"
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
    </>
    )
}

export default AddProduct;