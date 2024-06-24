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

        <div className="flex justify-center px-5">
          <button type="button" onClick={handleAdd} className=" font-medium p-3 px-12 m-3 mb-1 rounded-xl bg-gray-400 text-black border border-solid border-neutral-950 hover:text-white hover:bg-black hover:border-solid hover:border-white hover:cursor-pointer">Add</button>
        </div>
        <div className="flex justify-end mb-0">
              <button type="button" className="p-2 px-3 m-0 rounded-xl bg-gray-400 text-black border border-solid border-neutral-950 hover:text-white hover:bg-black hover:border-solid hover:border-white hover:cursor-pointer" onClick={handleBackButton}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
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