import React, { useState } from 'react';
import { motion } from 'framer-motion';

const slides = [
    {
        image: "/imgs/3d-models.png",
        title: "No Matter What!",
        text: "Whether you're new or experienced, explore templates or create from scratch. Innovation starts here!"
    },
    {
        image: "/imgs/escape-ordinary.png",
        title: "Escape the Ordinary!",
        text: "Leave behind outdated methods of tech pack creation and embrace innovation. The future of fashion is now!"
    },
    {
        image: "/imgs/fashionclock.png",
        title: "Fashion Never Waits!",
        text: "Stay ahead of trends with our seamless tech pack generation process. Speed, style, and success combined!"
    },
    {
        image: "/imgs/own_the_fashion.png",
        title: "Own the Fashion!",
        text: "Create, customize, and dominate the fashion industry with effortless tech packs. Unleash your creative genius!"
    }
];

const SliderImgSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    return (
        <div className="flex items-center justify-between p-12 h-screen bg-gray-100" onMouseOver={handleNext}  onAnimationEnd={handleNext}>
            {/* Image Section */}
            <motion.div 
                key={currentIndex} 
                className="w-1/2 flex justify-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
            >
                <img src={slides[currentIndex].image} alt="slide" className="w-96 h-auto rounded-lg shadow-lg" />
            </motion.div>
            
            {/* Text Section */}
            <motion.div 
                key={`text-${currentIndex}`} 
                className="w-1/2 text-left"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl font-bold text-black mb-4">{slides[currentIndex].title}</h1>
                <p className="text-lg text-gray-700">{slides[currentIndex].text}</p>
            </motion.div>
        </div>
    );
}

export default SliderImgSection;
