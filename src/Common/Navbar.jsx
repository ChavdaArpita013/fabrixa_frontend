import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TechPackNamePopUp from '../Components/TechPackNamePopUp';

const Navbar = ({ isSignedIn }) => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    function handleNewButtonClick() {
        setShowPopup(true);
    }

    function handleloginPageClick() {
        navigate('/user-login');
    }
    function handleWorkButtonClick() {
        navigate('/my-work');
    }

    return (
        <nav className="bg-gray-100 p-4 shadow-md sticky top-0 z-50">
            {isSignedIn ? (
                <div className="flex justify-between items-center">
                    <a href='/'><h1 className="text-2xl font-bold text-blue-500"><img className='h-14 w-44 mix-blend-multiply' src='/logo512.png'/></h1></a>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleWorkButtonClick}>
                            My Work
                        </button>
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={handleNewButtonClick}
                        >
                            + New
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-500">Tech Pack</h1>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleloginPageClick}
                    >
                        Login
                    </button>
                </div>
            )}
            {showPopup && <TechPackNamePopUp setShowPopup={setShowPopup} />}
        </nav>
    );
};

export default Navbar;
