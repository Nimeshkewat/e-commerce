import React from 'react'
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className='flex flex-col md:flex-row py-20 px-10 md:px-0  mt-10 md:items-center justify-around bg-gray-900 '>
        <div className='flex flex-col gap-8'>
            <h2 onClick={()=>scrollTo(0,0)} className='text-white font-bold text-2xl cursor-pointer'>N-MART</h2>
            <div className='flex flex-col gap-2'>
                <p className='font-bold text-white'>Useful Links</p>
                <p className='text-gray-400 font-medium'>Privacy Policy</p>
                <p className='text-gray-400 font-medium'>Terms & Condition</p>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='font-bold text-white'>Social Media</p>
                <div className='text-white flex items-center gap-3'>
                    <FaFacebookF className='hover:text-gray-200 cursor-pointer' size={20}/>
                    <GrInstagram className='hover:text-gray-200 cursor-pointer' size={20}/>
                    <FaGithub className='hover:text-gray-200 cursor-pointer' size={20} />
                    <FaXTwitter className='hover:text-gray-200 cursor-pointer' size={20} />
                </div>
            </div>
            <div>
                <p className='font-bold text-white'>Copyright</p>
                <p className='text-gray-400 font-medium'>Complete Nutrition C 2025</p>
            </div>
        </div>

        <div className='flex mt-20 md:mt-0 flex-col gap-8'>
            <p className='font-bold text-white'>Subscribe to our newsletter and get 10% off </p>
            <div className='flex flex-col gap-7'>
                <input className='text-white w-2/3 md:w-full bg-black py-3 px-6' type="email" placeholder='Email' />
                <button className=' bg-white active:bg-gray-200 w-2/3 md:w-full cursor-pointer hover:bg-gray-100 text-black font-semibold py-3 px-6 '>Subscribe</button>
            </div>
            <p className='text-gray-400 font-medium'>Get regular updates on our products with our newsletter</p>
        </div>

    </footer>
  )
}

export default Footer