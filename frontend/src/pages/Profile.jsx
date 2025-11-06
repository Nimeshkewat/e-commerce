import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContextProvider';
import { Link } from 'react-router-dom';

function Profile() {
  axios.defaults.withCredentials = true;
  const { backendUrl, handleLogout } = useContext(AppContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${backendUrl}/api/profile`);
      setUser(data.user);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-2xl h-screen grid place-content-center">
        Loading...
      </div>
    );
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
            src={user.avatar || "https://via.placeholder.com/120"}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-lg"
          />
        </div>

        {/* Name & Email */}
        <h2 className="text-2xl font-semibold mb-1">
          {user.name || 'Guest User'}
        </h2>
        <p className="text-gray-400 mb-6">{user.email || 'No email found'}</p>

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
        <div className="mt-6 flex justify-center gap-4">
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-all">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
