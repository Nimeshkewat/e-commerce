import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import {Link} from 'react-router-dom'
import { AppContext } from '../context/AppContextProvider';
import { FaUser } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";

function Navbar() {
    const {search, setSearch, setCategory, isLoggedIn, cartLength, handleLogout} = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false);
    const [dropdown, setDropdown] = useState('All')
    const [navDrop, setNavdrop] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav>

        <div className='h-25 max-w-7xl mx-auto w-full border-b border-gray-300 mb-10 relative flex items-center justify-between gap-3 md:gap-8 px-3 sm:px-4 md:px-8'>
            <div className='cursor-pointer text-white md:hidden block transition-all duration-500'>{navDrop ? <IoMdClose onClick={()=>setNavdrop(false)} size={30}/> : <GiHamburgerMenu onClick={()=>setNavdrop(true)} size={30}/>}</div>
            <h2 className='text-white italic font-bold text-[20px] hidden sm:block  md:text-2xl lg:text-3xl '>N-MART</h2>
            <form onSubmit={(e)=>{e.preventDefault(); setSearch('')}} className={` border border-white px-2  transition-all duration-300 rounded-full h-13  flex items-center`}>
                <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='What are you looking for?' className=' text-white max-w-3xl w-full h-full py-5 px-2 border-none text-sm md:text-lg font-medium outline-none' />
                <div className='relative flex items-center justify-end text-white font-medium text-sm sm:text-lg max-w-2xl w-full h-5'>
                    <p onClick={() =>{setNavdrop(false); setIsOpen(prev => !prev)}} className='cursor-pointer  flex items-center justify-between'><span className='hidden  sm:block'>{dropdown}</span><span className={` ${isOpen ? 'rotate-0' :'rotate-180'} `}><RiArrowDropDownLine size={40}/></span></p>
                    {isOpen && <div className='z-50 absolute top-10 -left-9 py-4  px-5 border-none outline-none rounded-lg  border-white bg-gray-800 '>
                        <p onClick={() => {
                            setDropdown('All');
                            setCategory('')
                            setIsOpen(false);
                        }} className={`${dropdown === 'All' && 'text-green-500'} hover:bg-gray-700 font-medium cursor-pointer mb-4 p-0.5`}>All</p>
                        <p onClick={() => {
                            setDropdown('Electronics');
                            setCategory('Electronics')
                            setIsOpen(false);
                        }} className={`${dropdown === 'Electronics' && 'text-green-500'} hover:bg-gray-700  font-medium cursor-pointer mb-4 p-0.5`}>Electronics</p>
                        <p onClick={() => {
                            setDropdown('Mobiles');
                            setCategory('Mobiles')
                            setIsOpen(false);
                        }} className={`${dropdown === 'Mobiles' && 'text-green-500'} hover:bg-gray-700 font-medium cursor-pointer mb-4 p-0.5`}>Mobiles</p>
                        <p onClick={() => {
                            setDropdown('Furniture');
                            setCategory('Furniture');
                            setIsOpen(false);
                        }} className={`${dropdown === 'Furniture' && 'text-green-500'} hover:bg-gray-700 font-medium cursor-pointer mb-4 p-0.5`}>Furniture</p>
                    </div>}
                </div>
                <button className=' cursor-pointer text-white flex items-center justify-center w-12 h-12 rounded-full '><FaSearch size={17}/></button>
            </form>


            {isLoggedIn
            ?<div className='flex items-center  gap-4 relative'>
                <Link to='/cart' className='hover:scale-105 hidden sm:block transition-transform duration-150 relative text-white cursor-pointer'>
                  <FaCartArrowDown size={30}/>
                  <span className='absolute -top-2 -right-2 flex items-center justify-center p-2 text-xs bg-red-600 w-3 h-3 rounded-full'>{cartLength}</span>
                </Link>
                <button onClick={()=>setIsProfileOpen(prev=>!prev)} className='cursor-pointer hidden md:block   text-white hover:text-gray-200'><FaUser size={30}/></button>
                {isProfileOpen && <div className='z-50 bg-gray-800 px-6 py-3 rounded-lg absolute top-10 right-4 '>
                    <Link to='/profile'>
                    <p className='text-left font-semibold text-lg text-white hover:bg-gray-600 px-3 py-1 cursor-pointer'>Profile</p>
                    </Link>
                    <p onClick={handleLogout} className=' font-semibold text-lg text-white hover:bg-gray-600 px-3 py-1 cursor-pointer'>Logout</p>
                </div>}
            </div>
            :<div className='flex items-center gap-3'>
                <Link to='/cart' className='hover:scale-105 transition-transform duration-150 relative  text-white cursor-pointer'>
                  <FaCartArrowDown size={30}/>
                  <span className='absolute  -top-2 -right-2 flex items-center justify-center p-2 text-xs bg-red-600 w-3 h-3 rounded-full'></span>
                </Link>
                <Link to='/register'><button className='font-medium hidden md:block cursor-pointer text-white hover:text-gray-200'>Sign up</button></Link>
                <Link to='/login'><button className='bg-black text-white font-medium cursor-pointer hover:bg-amber-950 py-2 px-6 rounded-3xl'>Log in</button></Link>
            </div>
            }




            {/*  */}
            {navDrop && <div className={`z-50 absolute flex flex-col items-center gap-6 pl-0 py-10 bg-gray-900 text-gray-400 font-bold text-3xl top-25  transition-all duration-400  w-full max-w-[150px]`}>
                <h2 className='text-white font-bold text-lg'>N-MART</h2>
                <Link to='/cart'>
                <p className='hover:text-gray-500 text-lg cursor-pointer flex'>Cart <RiArrowDropDownLine/></p>
                </Link>
                {isLoggedIn && <Link to='/profile'>
                <p className='hover:text-gray-500 text-lg cursor-pointer flex'>Profile <RiArrowDropDownLine/></p>
                </Link>}
                <p className='hover:text-gray-500 text-lg cursor-pointer flex'>Explore <RiArrowDropDownLine/></p>
                <p className='hover:text-gray-500 text-lg cursor-pointer flex'>Find Talent <RiArrowDropDownLine/></p>
                <p className='hover:text-gray-500 text-lg cursor-pointer flex'>Get Hired <RiArrowDropDownLine/></p>
                <p className='hover:text-gray-500 text-lg  cursor-pointer flex'>Blog <RiArrowDropDownLine/></p>
                {isLoggedIn && <p onClick={handleLogout} className='hover:text-gray-500 text-2xl cursor-pointer flex'>logout</p>}
            </div>}

        </div>

    </nav>
  )
}

export default Navbar