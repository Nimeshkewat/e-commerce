import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContextProvider';

function Login() {
  axios.defaults.withCredentials = true;
  const {backendUrl, setIsLoggedIn} = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post(`${backendUrl}/api/login`, {email, password});

      if(data.success){
        toast.success(data.message);
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        navigate('/');
      }else{
        toast.error(data.message);
        return;
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setEmail('');
      setPassword('');
    }

  }
  return (
    <>
    <Link to='/'><h2 className='fixed top-5 left-5 hover:text-gray-300 text-white transition-all duration-500 cursor-pointer font-bold text-lg  md:text-2xl lg:text-3xl '>N-MART</h2></Link>
      <form onSubmit={handleSubmit} className='border  bg-black flex flex-col items-center transition-all duration-500'>
        <div className='mt-40 flex flex-col w-1/2 md:w-1/4 gap-7'>
          <h2 className='text-center font-bold text-3xl text-white'>Welcome back</h2>

          <div className='flex flex-col gap-7'>
            <div className='flex '>
              <label htmlFor="email"></label>
              <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" className='focus:bg-white focus:text-black py-3 px-5 w-full rounded-lg text-white font-bold border-none outline-1' placeholder='Enter email address' />

            </div>
            <div className='flex'>
              <label htmlFor="password"></label>
              <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" className='focus:bg-white focus:text-black py-3 px-5 w-full rounded-lg text-white font-bold border-none outline-1' placeholder='Enter your password' />
            </div>
          </div>
          <p className='text-xs md:text-sm px-3 text-white '>Forgot password ? <Link to='/forgot-password'><span className='font-medium  text-blue-500 hover:text-blue-600 underline cursor-pointer'> Click here</span></Link></p>

          <button type='submit' className='bg-black border text-white rounded-full py-3 px-5 w-full cursor-pointer hover:bg-gray-900 font-medium' disabled={loading}>{loading ? 'loading...' : 'Continue'}</button>
          <div>
          <p className='text-xs md:text-sm text-white text-center'>By continuing, you agree to our Terms and Privacy Policy.</p>
          <p className='text-xs md:text-sm text-white mt-2 text-center'>Already have an account? <Link to='/register'><span className='font-medium text-blue-500 hover:text-blue-600 underline cursor-pointer'> Sign in</span></Link></p>
          </div>

        </div>

      </form>
    </>
  )
}

export default Login