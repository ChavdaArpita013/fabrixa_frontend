import React from 'react';
import { motion } from 'framer-motion';
import { FaBlog, FaEnvelope, FaUser, FaCopyright } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="flex items-center justify-between p-12 bg-gray-900 text-white">
            {/* Animated Left Section */}
            <motion.div 
                className="w-1/2 text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-3xl font-bold mb-4">Stay Connected with Fabrixa</h1>
                <p className="text-lg text-gray-400">Get the latest updates, blogs, and industry insights directly from our platform.</p>
                <div className="flex space-x-6 text-lg mt-5">
                    <a href="#" className="hover:text-blue-400 flex items-center"><FaBlog className="mr-2" /> Blogs</a>
                    <a href="#" className="hover:text-blue-400 flex items-center"><FaEnvelope className="mr-2" /> Contact Us</a>
                    <a href="/user-login" className="hover:text-blue-400 flex items-center"><FaUser className="mr-2" /> Login</a>
                </div>
                <p className="text-gray-500 mt-6 flex items-center"><FaCopyright className="mr-2" /> All Rights Reserved - fabrixa.com</p>
            </motion.div>

            {/* Right Section - Logo & Links */}
            <div className="w-1/2 flex flex-col items-end">
                <img src="tech_pack_app_logo.png" alt="Fabrixa Logo" className="w-60 mb-4 h-48" />
                
            </div>
        </div>
    );
}

export default Footer;
