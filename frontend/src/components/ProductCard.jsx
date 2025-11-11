import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProductCard({ product }) {
  axios.defaults.withCredentials = true;
  const {backendUrl,isLoggedIn:token,} = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);

  const increasyQty = () => {
      if(quantity >= product.stock){
        toast.info('stock limit exceeded', {position:'bottom-right', autoClose:'1000'})
        return;
      }
      setQuantity(prev => prev+1)
  }
  
  const decreasyQty = () => {
      if(quantity === 1)return;
      setQuantity(prev => prev-1)
  }

  const handleAddToCart = async (productId) => {
    if(!token){
      toast.info('Please log in to add items to cart', {position:'bottom-right', autoClose:'1000'})
      return; 
    }
    try {
      const {data} = await axios.post(`${backendUrl}/api/cart/add-to-cart`, {productId, quantity});
      if(data.success){
        toast.info(data.message, {position:'bottom-right', autoClose:'1000'});
      }else{
        toast.info(data.message, {position:'bottom-right', autoClose:'1000'});
      }
      return;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something Went Wrong');
    }
  }

  return (
    <div className="relative flex flex-col px-6 py-8  rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition-transform hover:scale-105 duration-200 w-full max-w-sm mx-auto">
      
      {/* Image with fixed aspect ratio */}
      <div className="aspect-square overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col gap-2">
        <p className="font-semibold  text-white text-xl">{product.name}</p>
        <p className="font-light text-sm text-gray-200">{product.desc}</p>
        <p className={`text-sm ${product.stock <= 0 ? 'text-red-600' : 'text-green-500'}`}>
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </p>
      </div>

      {/* quantity */}
      <div className='flex items-center justify-start gap-5 '>
        <button 
          disabled={product.stock <= 1}
          onClick={decreasyQty}
          className={`text-white border cursor-pointer  font-medium px-4 py-2 rounded-lg ${quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'acitve:active:scale-105 active:bg-white'}`}>-</button>
        <p className='text-white font-semibold text-lg'>{quantity}</p>
        <button 
          disabled={quantity >= product.stock}
          onClick={increasyQty}
          className={`text-white border cursor-pointer font-medium px-4 py-2 rounded-lg ${quantity >= product.stock ? 'opacity-50 cursor-not-allowed' : 'acitve:active:scale-105 active:bg-white'} `}>+</button>
      </div>

      {/* Price + Button */ }
      <div className="p-4 flex items-center justify-between border-t border-gray-700">
        <p className="font-semibold text-white text-xl">${product.price}</p>
        <button 
          disabled={product.stock<=0}
          onClick={()=>handleAddToCart(product._id)}
          className={`border cursor-pointer font-medium px-4 py-2 rounded-lg  ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed text-gray-500' : 'text-white hover:bg-white hover:text-black active:s95'} transition-all`}>
          Add to cart
        </button>
      </div>


    </div>
  );
}

export default ProductCard;
