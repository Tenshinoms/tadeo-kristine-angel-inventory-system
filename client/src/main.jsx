import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AddProduct from './pages/addProducts.jsx'
import UpdateProduct from './pages/updateProducts.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inventory from './pages/inventory.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<App />} />
        <Route path='/inventory' element = {<Inventory />} />
        <Route path='/add-product' element = {<AddProduct />} />
        <Route path='/update-by-id/:productId' element = {<UpdateProduct />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>,
)