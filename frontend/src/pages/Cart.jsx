import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContextProvider';
import { IoArrowBackCircleOutline } from "react-icons/io5"
import { Link } from 'react-router-dom';

function Cart() {
  axios.defaults.withCredentials = true;
  const { backendUrl, setCartLength } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);

  const getCart = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/cart/get-cart`);
      setCartLength(data.cart.items.length)
      localStorage.setItem('cartLength', data.cart.items.length);

      setCartItems(data.cart.items);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className='flex items-center  gap-4'>
      <Link to='/'><h1 className='mb-6'><IoArrowBackCircleOutline size={30} /></h1></Link>
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">🛒 Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((cart) => (
            <div
              key={cart._id}
              className="flex flex-col sm:flex-row items-center sm:items-start bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-32 h-32 shrink-0 overflow-hidden rounded-xl">
                <img
                  className="w-full h-full object-cover"
                  src={cart.productId.image}
                  alt={cart.productId.name}
                />
              </div>

              <div className="sm:ml-6 mt-4 sm:mt-0 flex flex-col justify-between w-full">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{cart.productId.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">{cart.productId.desc}</p>
                </div>

                <div className="mt-3 flex flex-wrap justify-between text-sm">
                  <p
                    className={`font-medium ${
                      cart.productId.stock > 0 ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {cart.productId.stock > 0
                      ? `${cart.productId.stock} in stock`
                      : `Out of stock`}
                  </p>
                  <p className="text-gray-700">Quantity: {cart.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
