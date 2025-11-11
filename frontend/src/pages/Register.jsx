import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContextProvider';
import axios from 'axios';
import { FaCloudUploadAlt } from "react-icons/fa";
import {toast} from 'react-toastify'

function Register() {
  axios.defaults.withCredentials = true;
  const {backendUrl} = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatar(reader.result); // this is the base64 string
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password.length < 8){
      toast.info('Password must be 8 character or more')
      return;
    }
    
    try {
      setLoading(true);
      const {data} = await axios.post(`${backendUrl}/api/register`, {name, email, password, avatar});
      if(data.success){
        toast.success(data.message);
        navigate('/login');
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
      <Link to='/'><h2 className='fixed ita top-5 left-5 hover:text-gray-300 text-white transition-all duration-500 cursor-pointer font-bold text-lg  md:text-2xl lg:text-3xl '>N-MART</h2></Link>
      <form onSubmit={handleSubmit} className='h-screen bg-black flex flex-col items-center transition-all duration-500'>
        <div className='mt-20 flex flex-col w-1/2 md:w-1/4 gap-7'>
          <h2 className='text-center font-bold  text-3xl text-white'>Sign up</h2>

          <div className='flex flex-col gap-7'>
            <div className='flex'>
              <label htmlFor="name"></label>
              <input required value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" className='focus:bg-white focus:text-black py-3 px-5 w-full rounded-lg text-white font-bold border-none outline-1' placeholder='Enter your name' />
            </div>

            <div className='flex'>
              <label htmlFor="email"></label>
              <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" className='focus:bg-white focus:text-black py-3 px-5 w-full rounded-lg text-white font-bold border-none outline-1' placeholder='Enter email address' />
            </div>
            <div className='flex'>
              <label htmlFor="password"></label>
              <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" className='focus:bg-white focus:text-black py-3 px-5 w-full rounded-lg text-white font-bold border-none outline-1' placeholder='Enter your password' />
            </div>
              <label className='cursor-pointer hover:text-gray-200 text-white flex items-center gap-2' htmlFor="image">upload image<FaCloudUploadAlt size={20}/></label>
              <input hidden id='image' onChange={handleFileChange} type="file"  />
          </div>

          <button type='submit' className='bg-black border text-white rounded-full py-3 px-5 w-full cursor-pointer hover:bg-gray-900 font-medium' disabled={loading}>{loading ? 'Creating...' : 'Continue'}</button>
          <div>
          <p className='text-sm text-center text-white'>By continuing, you agree to our Terms and Privacy Policy.</p>
          <p className='text-sm mt-2 text-center text-white'>Already have an account? <Link to='/login'><span className='font-medium text-blue-500 hover:text-blue-600 underline cursor-pointer'>Sign in</span></Link></p>
          </div>

        </div>

      </form>
    
    </>
  )
}

export default Register