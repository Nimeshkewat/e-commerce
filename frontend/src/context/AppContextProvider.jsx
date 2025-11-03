import { createContext, useState } from 'react'

export const AppContext = createContext();

function AppContextProvider({children}) {
    const backendUrl = `http://localhost:4000`
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [cartLength, setCartLength] = useState(localStorage.getItem('cartLength') ? localStorage.getItem('cartLength') : 0);

    const value = {
        backendUrl,
        search, setSearch,
        category, setCategory,
        isLoggedIn, setIsLoggedIn,
        cartLength, setCartLength
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider