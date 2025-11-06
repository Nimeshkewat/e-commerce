import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContextProvider';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  axios.defaults.withCredentials = true;
  const { backendUrl, handleLogout } = useContext(AppContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modal, setModal] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');


  //* fetch user profile
  const getProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/profile`);
      setUser(data.user);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  //* edit user profile
  const handleEditProfile = async () => {
    if(!name || !email){
      toast.info('name or email cannot be empty')
      return;
    }
    if(!email.includes('@')){
      toast.info('Invalid email')
      return;
    }

    try {
      const {data} = await axios.put(`${backendUrl}/api/edit-profile`, {name, email});

      if(data.success){
        toast.success(data.message);
        setIsEditing(false);
        setModal(false);
        getProfile();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if(user.name) setName(user.name);
    if(user.email) setEmail(user.email);
  }, [user])

  if (loading) {
    return (
      <div className="text-white text-2xl h-screen grid place-content-center">
        Loading...
      </div>
    );
  }

  if(modal){
    return (
      <div role='dialog' aria-modal="true" className='z-50 flex items-center min-h-screen px-8'>
        <div className="bg-gray-800 max-w-md rounded-lg  p-4 mx-auto  w-full flex flex-col ">

        <p className=' text-gray-300 text-center text-sm'>Are you sure you to update profile ?</p>
          <div className='text-white flex items-center justify-center gap-x-3'>
            <button onClick={handleEditProfile} className='cursor-pointer hover:text-gray-300'>yes</button>
            <button onClick={()=>setModal(false)}  className='cursor-pointer hover:text-gray-300'>no</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br  flex flex-col items-center py-10 px-4">
      {/* Navbar */}
      <Link
        to="/"
        className="absolute top-5 left-5 text-2xl font-bold text-white hover:text-gray-300 transition-all"
      >
        N-MART
      </Link>

      {/* Profile Card */}
      <div className="bg-gray-800/70 backdrop-blur-lg text-white rounded-2xl shadow-xl border border-gray-700 p-8 w-full max-w-md mt-10 text-center">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <img
            src={user.avatar || "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-lg"
          />
        </div>

        {/* Name & Email */}
        <h2 className="text-2xl font-semibold mb-1">
          {/* {user.name || 'Guest User'} */}
          {isEditing 
          ? <input className='px-4' type='text' placeholder={user.name} value={name} onChange={(e)=>setName(e.target.value)}  />
          : <p>{user.name || 'Guest User'}</p>
          }
        </h2>
        <p className="text-2xl font-semibold mb-1">
          {/* <p className="text-gray-400 mb-6">{user.email || 'No email found'}</p> */}
          {isEditing 
          ? <input className='px-4' type='text' placeholder={user.email} value={email} onChange={(e)=>setEmail(e.target.value)}  />
          : <span className='text-gray-400 mb-6 text-sm'>{user.email}</span>
          }
        </p>

        {/* Info Section */}
        <div className="space-y-3 text-left border-t border-gray-700 pt-4">
          <p>
            <span className="text-gray-400">Joined: </span>
            {user.createdAt ? new Date(user.createdAt).toDateString() : '—'}
          </p>
          <p>
            <span className="text-gray-400">Role: </span>
            {user.role || 'User'}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center flex-wrap gap-4">
          <button 
            onClick={()=>setIsEditing(prev=>!prev)}
            className="cursor-pointer px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-all">
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          <button
            onClick={handleLogout}
            className="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all">
            Logout
          </button>
          {isEditing && <button
            onClick={()=>setModal(true)}
            className="cursor-pointer px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-all">
            Save changes
          </button>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
