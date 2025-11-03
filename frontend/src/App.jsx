import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails '
import Cart from './pages/Cart'

function App() {
  return (
    <div className='bg-black min-h-screen'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App