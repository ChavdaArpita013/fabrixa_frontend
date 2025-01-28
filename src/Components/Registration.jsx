import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { registerUser } from "../api/UserApi";
import CryptoJS from "crypto-js";


const Registration = () => {
    // const { loginWithRedirect } = useAuth0();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        profession: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const encryptData = (data) => {
        const encryptionKey = '1234567890123456';
        const encryptioniv = '1234567890123456'
console.log(encryptionKey , encryptioniv);

        const cipher = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(encryptionKey), {
            iv: CryptoJS.enc.Utf8.parse(encryptioniv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        })
        return cipher.toString()
    }

    const handleRegisterButtonClick = async (e) => {
        e.preventDefault();
        try {
            const encryptedData = encryptData(formData);
            const response = await registerUser(encryptedData);
            console.log("Registration Response:", response);
        } catch (error) {
            console.error("Registration Error:", error);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex justify-center items-center">
            <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-xl transform transition-all hover:scale-105">
                <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
                    Join Our Designer Hub
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Be a part of the fashion revolution
                </p>
                <form onSubmit={handleRegisterButtonClick}>
                    <div className="mb-4">
                        <input
                            name="userName"
                            type="text"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="User Name"
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="profession"
                            className="block mb-2 text-sm text-gray-600 font-medium"
                        >
                            Tell us more about you
                        </label>
                        <select
                            name="profession"
                            value={formData.profession}
                            onChange={handleChange}
                            id="profession"
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select</option>
                            <option value="student">
                                I am a fashion designing student
                            </option>
                            <option value="professional_designer">
                                Working professional as fashion designer
                            </option>
                            <option value="professional_apparel">
                                Working professional as apparel designer
                            </option>
                            <option value="fashion_company">
                                Fashion company
                            </option>
                            <option value="startup">Fashion start up</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 text-white bg-blue-500 rounded- hover:bg-blue-600 transition-all"
                    >
                        Submit
                    </button>
                    {/* Dashed line */}
                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-dashed border-gray-400" />
                        <span className="mx-2 text-gray-500">Or</span>
                        <hr className="flex-grow border-dashed border-gray-400" />
                    </div>

                    {/* Redirect button */}
                    {/* <button
                        onClick={() => loginWithRedirect()}
                        className="w-full p-3 text-white bg-gray-500 rounded hover:bg-gray-600 transition-all"
                    >
                        Login with google
                    </button> */}
                </form>
            </div>
        </div>
    );
};

export default Registration;
