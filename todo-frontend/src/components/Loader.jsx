import React from 'react'

// components/Loader.js
const Loader = () => {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
        <svg
          className="animate-spin h-8 w-8 text-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v16a8 8 0 010-16z"></path>
        </svg>
      </div>
    );
  };
  
  export default Loader;
  