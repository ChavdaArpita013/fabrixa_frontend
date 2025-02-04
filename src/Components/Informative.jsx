import React from 'react';
import { FaChartLine, FaEye, FaBolt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <FaChartLine className='text-blue-600 text-4xl' />,
        title: "Take Control",
        text: "Access your tech packs anytime, track live updates, and monitor status changes seamlessly."
    },
    {
        icon: <FaEye className='text-blue-600 text-4xl' />,
        title: "Transparency",
        text: "Keep track of who creates and edits your tech packs, ensuring complete transparency."
    },
    {
        icon: <FaBolt className='text-blue-600 text-4xl' />,
        title: "Speed Up",
        text: "Design and produce 30% faster. Gain extra time for creativity, whether it's brainstorming or innovating!"
    }
];

const Informative = () => {
    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between p-12 bg-gray-100 h-screen">
                {/* Feature Section */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 '>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className='bg-white p-6 rounded-lg shadow-lg text-center'
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className='mb-4'>{feature.icon}</div>
                            <h1 className='text-2xl font-bold text-gray-800 mb-2'>{feature.title}</h1>
                            <p className='text-gray-600'>{feature.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div>
                    <img src="/imgs/hero.png" alt="" />
            </div>
        </div>
    );
}

export default Informative;