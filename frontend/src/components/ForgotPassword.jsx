import axios from 'axios';
import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContextProvider';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const {backendUrl} = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const {data} = await axios.post(`${backendUrl}/api/forgot-password`, {email});
            if(data.success){
                toast.info(data.message);
            }

        } catch (error) {
            console.log(error);        
            toast.error(error?.response?.data?.message || 'Somthing went wrong')
        } finally {
            setLoading(false);
            setEmail('');
        }
    }


  return (
    <>
    <Link to='/'><h2 className='fixed top-5 left-5 hover:text-gray-300 text-white transition-all duration-500 cursor-pointer font-bold text-lg  md:text-2xl lg:text-3xl '>N-MART</h2></Link>
      <form onSubmit={handleSubmit} className='border  bg-black flex flex-col items-center transition-all duration-500'>
        <div className='mt-60 flex flex-col w-1/2 md:w-1/4 gap-7'>
          <h2 className='text-center font-bold text-2xl text-white'>Forgot Password</h2>

          <div className='flex flex-col gap-7'>
            <div className='flex '>
              <label htmlFor="email"></label>
              <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" className='focus:bg-white focus:text-black py-3 px-5 w-full rounded-lg text-white font-bold border-none outline-1' placeholder='Enter email address' />
            </div>
          </div>

          <button disabled={loading} type='submit' className='bg-black border text-white rounded-full py-3 px-5 w-full cursor-pointer hover:bg-gray-900 font-medium'>{loading ? 'Sending...' : 'Reset'}</button>
        </div>

      </form>
    </>
  )
}

export default ForgotPassword