import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleRegistrationClick = () => {
        navigate('/new-user');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-8">Welcome to FashionSphere</h1>
            <p className="text-gray-600 text-center mb-12">
                Step into the world of creativity and style! Choose an option to continue.
            </p>
            <div className="flex gap-6">
                <button
                    onClick={handleRegistrationClick}
                    className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                >
                    New User
                </button>
                <button
                    onClick={handleLoginClick}
                    className="px-8 py-3 bg-white text-blue-600 border border-blue-600 text-lg font-semibold rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                >
                    Already a User
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
