import React, { useState, useEffect } from 'react'
import { userLogout } from '../services/userService';
import { Link, useLocation } from 'react-router-dom';
import { getToken, verifyToken } from '../services/userService';

const Header = () => {
  const [userId, setUserId] = useState(null);

  const location = useLocation();

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

  const handleLogout = () => {
    userLogout();
    window.location.href = '/login';
  };

  if (location.pathname === '/matching') {
    return <></>
  }

  return (
    <div className="w-full h-[65px] px-4 bg-[#282828] flex justify-between items-center">
      <div className="text-white text-xl font-bold">
        <Link to='/' className='no-underline text-inherit'>
          PeerPrep
        </Link>
      </div>
      {
        userId ? <ProfilePhoto userId={userId} handleLogout={handleLogout}/> : <></>
      }
    </div>
  )
}

const ProfilePhoto = ( {userId, handleLogout} ) => {
  return (
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
        </li>
      </ul>
    </div>
  )
}

export default Header