import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

function ResetPassword() {
    const {backendUrl} = useContext(AppContext);
    const navigate = useNavigate();
    const {token} = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {    
            if(password !== confirmPassword){
                toast.info('Password do not match');
                return;
            }

            const {data} = await axios.post(`${backendUrl}/api/reset-password/${token}`, {password:confirmPassword});
            if(data.success){
                toast.info(data.message);
                navigate('/');
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false);
        }
    }

  return (
    <>
    <Link to='/'><h2 className='fixed top-5 left-5 hover:text-gray-300 text-white transition-all duration-500 cursor-pointer font-bold text-lg  md:text-2xl lg:text-3xl '>N-MART</h2></Link>
      <form onSubmit={handleSubmit} className='border  bg-black flex flex-col items-center transition-all duration-500'>
        <div className='mt-50 flex flex-col w-1/2 md:w-1/4 gap-7'>
          <h2 className='text-center font-bold text-3xl text-white'>Reset Password</h2>

          <div className='flex flex-col gap-7'>
            <div className='flex'>
              <label htmlFor="password"></label>
              <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" className='focus:bg-white focus:text-black py-3 px-5 w-full rounded-lg text-white font-bold border-none outline-1' placeholder='Enter new password' />
            </div>
            <div className='flex'>
              <label htmlFor="confirmPassword"></label>
              <input required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" id="confirmPassword" className='focus:bg-white focus:text-black py-3 px-5 w-full rounded-lg text-white font-bold border-none outline-1' placeholder='Confirm password' />
            </div>
          </div>

          <button disabled={loading} type='submit' className='bg-black border text-white rounded-full py-3 px-5 w-full cursor-pointer hover:bg-gray-900 font-medium'>{loading ? 'loading...' : 'Reset Password'}</button>

        </div>

      </form>
    </>
  )
}

export default ResetPassword