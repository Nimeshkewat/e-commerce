import axios from 'axios';
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AppContext = createContext();

function AppContextProvider({children}) {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKENDURL;
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [cartLength, setCartLength] = useState(localStorage.getItem('cartLength') ? localStorage.getItem('cartLength') : 0);
    
    const handleLogout = async () => {
    try {
      const {data} = await axios.post(`${backendUrl}/api/logout`);

      if(data.success){
        toast.success(data.message);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/');
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }

    const value = {
        backendUrl,
        search, setSearch,
        category, setCategory,
        isLoggedIn, setIsLoggedIn,
        cartLength, setCartLength,
        handleLogout
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider