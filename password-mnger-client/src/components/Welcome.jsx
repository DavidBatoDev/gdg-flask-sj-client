import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; 
import { Link } from 'react-router-dom';


import { motion } from "framer-motion";

const Welcome = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full text-white">
      
      <div className="flex items-center bg-[#D0DEED] border-4 border-black text-black py-10 px-14 rounded-2xl max-w-5xl">

      {/* Left Side */}
      <div className="flex flex-col  just w-10/12 ">
        {/* Logo and Text */}
        <div className="flex items-center mb-5">


          <div className="border rounded-full w-20 h-20 flex items-center justify-center bg-gray-200">
            <FontAwesomeIcon icon={faGoogle} className='w-16 h-16' />
          </div>

          <div className="flex flex-col ml-5">
            <h1 className="text-4xl font-bold">Welcome to GDG SecurePass</h1>
            <p className="text-lg">Your ultimate password manager</p>
          </div>

        </div>

        {/* Description and Get Started Button */}
        <div className="text-start ">
          <p className="text-xl mb-3 ">
            SecurePass helps you generate and manage your passwords securely and efficiently.
          </p>
          <Link to="/main">
            <button className="px-8 py-3 mt-3 bg-blue-500 text-white font-bold    rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center w-2/6 relative">
      {/* Background Shadow */}
      <div className="absolute top-5 right-3 w-8/12 h-full bg-black opacity-20 blur-lg rounded-full"></div>
      
      {/* Animated Lock Image */}
      <motion.img
        src="images/lock.png"
        alt="lock.png"
        className="w-9/12 relative"
        animate={{
          y: [0, -10, 0],  // Moves up and down
          opacity: [1, 0.95, 1], // Slight opacity pulse
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
      
      </div>
    </div>
  );
}

export default Welcome;