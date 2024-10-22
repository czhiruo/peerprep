import React, { useState, useEffect } from 'react'
import { userLogout, deleteUser } from '../services/userService';
import { Link } from 'react-router-dom';
import { getToken, verifyToken } from '../services/userService';

const Header = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      verifyToken(token)
        .then((data) => {
          setUserId(data.data.id);
        })
        .catch(() => {
          userLogout();
          window.location.href = '/login';
        });
    }
  }, [])

  const handleDeletion = () => {
    const token = getToken();
    deleteUser(userId, token);
    window.location.href = "/login";
  }

  const handleLogout = () => {
    userLogout();
    window.location.href = '/login';
  };

  return (
    <div className="w-full h-[65px] px-4 bg-[#282828] flex justify-between items-center">
      <div className="text-white text-xl font-bold">
        <Link to='/' className='no-underline text-inherit'>
          PeerPrep
        </Link>
      </div>
      {
        userId ? <ProfilePhoto userId={userId} handleLogout={handleLogout} handleDeletion={handleDeletion}/>  : <></>
      }
    </div>
  )
}

const ProfilePhoto = ({ userId, handleLogout, handleDeletion }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const openDeleteModal = () => setShowDeleteModal(true);
    const closeDeleteModal = () => setShowDeleteModal(false);
  
  return (
    <>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {/* Replace the src with the path to your avatar image */}
          <img src="https://avatar.iran.liara.run/public" alt="avatar" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-gray-800 rounded-box w-40 mt-2"
      >
        <li>
          <Link to={`/user/${userId}/history`} className='menu-item no-underline text-white hover:bg-gray-500'>
            History
          </Link>
          <a onClick={handleLogout} className='menu-item no-underline text-white hover:bg-gray-500'>Logout</a>
          <a onClick={openDeleteModal} className='menu-item no-underline text-red-500 hover:bg-gray-500'> Delete Account </a>
        </li>
      </ul>
      </div>
      
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] text-white p-6 rounded-md shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Delete Account</h2>
            <p className="mb-4">Are you sure you want to delete your account? This action is irreversible and all your history will be lost.</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={closeDeleteModal}
                className="btn btn-secondary bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Back
              </button>
              <button
                onClick={handleDeletion}
                className="btn btn-danger bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Delete Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header