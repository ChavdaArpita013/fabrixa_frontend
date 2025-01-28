import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const TechPackNamePopUp = ({ setShowPopup }) => {
    
    const [formData, setFormData] = useState({
        techPackName: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { techPackName } = formData;

        if (techPackName.trim() === "") {
            alert("Tech Pack Name cannot be empty");
            return;
        }

        // Save techPackName to cookies
        Cookies.set("techPackName", techPackName);

        // Initialize an array in cookies with a default page
        const initialTechPackArray = [{ page: "01" }];
        Cookies.set(techPackName, JSON.stringify(initialTechPackArray));

        // Redirect to the /create-techpack page
        navigate("/create-techpack");
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-lg font-semibold mb-4">Create Tech Pack</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            name="techPackName"
                            type="text"
                            value={formData.techPackName}
                            onChange={handleChange}
                            placeholder="Tech Pack Name"
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
                    >
                        Submit
                    </button>
                </form>
                <button
                    onClick={() => setShowPopup(false)}
                    className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default TechPackNamePopUp;
