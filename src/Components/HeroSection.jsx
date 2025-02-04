import React from 'react';

const HeroSection = () => {
    return (
        <div className="bg-black text-white flex items-center justify-between p-12 h-screen">
            {/* Left Section - Text Content */}
            <div className="max-w-lg">
                <h1 className="text-5xl font-bold mb-4 ease-in-out 10sec">Create Professional Tech Packs in Minutes</h1>
                <p className="text-lg mb-6">A Tech Pack generator that helps you build your tech packs from scratch.</p>
                <span className="block mb-4">Make designs that feels alive</span>
                <div className="space-x-4">
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105">Start from Scratch</button>
                    <button className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105">Edit Template</button>
                </div>
            </div>
            
            {/* Right Section - Image */}
            <div className="h-screen flex items-center justify-center w-1/2">
                <img src="/imgs/3d-model.png" alt="Tech Pack Illustration" className="w-full h-auto object-contain" />
            </div>
        </div>
    );
}

export default HeroSection;