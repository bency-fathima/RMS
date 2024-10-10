 import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsBell, BsEnvelope, BsGear, BsPersonCircle } from 'react-icons/bs';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-16 h-16 absolute top-0 right-0">
       <div className="flex items-center flex-1 mr-4">  
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <AiOutlineSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>

       <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-600 hover:text-green-600">
          <BsBell className="text-2xl" />
        </button>
        <button className="relative p-2 text-gray-600 hover:text-green-600">
          <BsEnvelope className="text-2xl" />
        </button>
        <button className="relative p-2 text-gray-600 hover:text-green-600">
          <BsGear className="text-2xl" />
        </button>
        <button className="relative p-2 text-gray-600 hover:text-green-600">
          <BsPersonCircle className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
