import React from 'react'
import { userLogout } from '../services/userService';
import { Link } from 'react-router-dom';

const Header = () => {
  const handleLogout = () => {
    userLogout();
    // Redirect to the login page
    window.location.href = '/login';
  };

  return (
    <div className="w-full h-[65px] px-4 bg-[#282828] flex justify-between items-center">
      <div className="text-white text-xl font-bold">
        <Link to='/' className='no-underline text-inherit'>
          App Name
        </Link>
      </div>
      {/* Avatar with Dropdown */}
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            {/* Replace the src with the path to your avatar image */}
            <img src="https://avatar.iran.liara.run/public" alt="avatar" />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-gray-600 rounded-box w-52"
        >
          <li>
            <a onClick={handleLogout} className='text-white no-underline'>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header