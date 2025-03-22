
import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';

export const Congrats= () => {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const {user}=useSelector(state=>state.auth)

  // Show the checkmark after 1000ms (1 second)
  useEffect(() => {
    
    const timer = setTimeout(() => {
      setShowCheckmark(true); // Show checkmark after 1 second
    }, 1000);

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timer);
  }, []);



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
     
      <div className="mb-6 text-green-500 text-6xl">
        {showCheckmark && '✅'}
      </div>

      <h1 className="text-4xl text-center font-bold text-green-600 mb-6">Order Placed Successfully!</h1>
      <p className="text-lg text-gray-700 mb-8">Thank you for your purchase! Your order has been confirmed.</p>

      <div className="mt-8 text-center">
        <p className="text-md text-gray-600 mb-4">You order will be shipped soon!</p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <OrderPlacedSuccessfully />
    </div>
  );
};

