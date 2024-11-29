import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to RescuNet</h1>
      <p className="text-lg text-gray-700 mt-4">
        Your one-stop solution for emergency responses using AI!
      </p>
      <button
        onClick={() => navigate('/query')}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700"
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;

