import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContextProvider';
import axios from 'axios';
import ProductCard from './ProductCard';

function Products() {
  const { backendUrl, search, category} = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(4); //* fixed limit (4 per page)
  const [hasMore, setHasMore] = useState(true);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/products?limit=${limit}&page=${page}&search=${search}&category=${category.toLowerCase()}`
      );

      if (data.products.length < limit) {
        setHasMore(false);
      }

      if (page === 1) {
        setProducts(data.products);
      } else {
        setProducts(prev => [...prev, ...data.products]);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //* debounced search
  useEffect(() => {
    const id = setTimeout(() => {
      setPage(1);
      setHasMore(true);
      fetchAllProducts();
    }, 500);

    return () => clearTimeout(id);
  }, [search]);

  //* category change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchAllProducts();
  }, [category]);

  //* pagination
  useEffect(() => {
    fetchAllProducts();
  }, [page]);

  return (
    <div className="flex flex-col">
      <h2 className="text-white text-center text-2xl font-medium">Best Products</h2>

        <div className="mt-6 mx-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

    

      {hasMore && (
        <div className='mb-10 text-center'>
        <button
          onClick={() => setPage(prev => prev + 1)} 
          className="text-white border cursor-pointer hover:bg-white hover:text-black font-medium px-8 py-2 rounded-lg active:scale-95 transition-all"
        >
          {loading ? 'Loading...' : 'Load'}
        </button>
        {/* <p className='text-white font-medium text-lg mt-3'>{products.page}/{products.pages}</p> */}
        </div>
      )}
      
    </div>
  );
}

export default Products;
