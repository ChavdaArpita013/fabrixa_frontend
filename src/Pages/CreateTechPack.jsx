import React from 'react';
import Sidebar from '../Components/Sidebar';
import Page from '../Components/Page';
import Navbar from '../Common/Navbar';

const CreateTechPack = () => {
    return (
        <div>
            <div className="flex">
                {/* Sidebar */} 
                <div className="w-48 h-screen overflow-y-auto fixed top-25 left-0 bg-gray-50 shadow-md p-4">
                    <Sidebar />
                </div>

                {/* Page Section */}
                <div className="flex-1 ml-48 p-4">
                    <Page />
                </div>
            </div>

        </div>
    );
}

export default CreateTechPack;
