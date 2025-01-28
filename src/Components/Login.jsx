import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/UserApi';
import CryptoJS from "crypto-js";
import Cookies from 'js-cookie';
const Login = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const encryptData = (data) => {
        const encryptionKey = '1234567890123456';
        const encryptioniv = '1234567890123456';

        const cipher = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(encryptionKey), {
            iv: CryptoJS.enc.Utf8.parse(encryptioniv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        })

        return cipher.toString();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            Cookies.set('user' , formData.userName);
            const encryptedData = encryptData(formData);
            const response = await loginUser(encryptedData);

            navigate('/create-techpack')

        } catch (error) {
            console.log("Error Log in accont", error);

        }
    }
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex justify-center items-center">
                <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-xl transform transition-all hover:scale-105">
                    <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
                        Welcome back
                    </h2>
                    <p className="text-center text-sm text-gray-500 mb-6">
                        Be a part of the fashion revolution
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                name='userName'
                                type="text"
                                onChange={handleChange}
                                value={formData.userName}
                                placeholder="User Name"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                name='password'
                                onChange={handleChange}
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                        </div>
                        <div className="mb-6">

                        </div>
                        <button
                            type="submit"
                            className="w-full p-3 text-white bg-blue-500 rounded- hover:bg-blue-600 transition-all"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
