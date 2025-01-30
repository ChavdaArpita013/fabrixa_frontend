import React, { useEffect, useState } from 'react';
import { MdDelete, MdDownload, MdEdit, MdOutlineHideImage } from 'react-icons/md';
import { deleteTechPackById, fetchAllTechPacksByUser } from '../api/TechPackAPI';

const WorkDataTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAllTechPacksByUser();
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error('Data is not an array:', response);
                }
            } catch (error) {
                console.error('Error fetching tech packs:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once

    const handleDeleteButtonClick =async (techpackId) => {
        const deletetechPack =await deleteTechPackById(techpackId);
        if(deletetechPack){
            alert("deleted")
        }
    }


    return (
        <div>
            <div className='mt-5'>
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-blue-500 text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tech Pack Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tech Pack Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Edited
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Download
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">{item.techPackId}</td>
                                    <td className="px-6 py-4">{item.techPackName}</td>
                                    <td className="px-6 py-4">{item.createdAt}</td>
                                    <td className="px-6 py-4">{"Not Edited"}</td>
                                    <td className="px-6 py-4 flex items-center">
                                        <button><MdEdit /></button>
                                        <button className='ml-4' onClick={() => handleDeleteButtonClick(item.techPackId)}><MdDelete /></button>
                                        {/* <button className='ml-4'><MdOutlineHideImage /></button> */}
                                    </td>
                                    <td>
                                        <button><MdDownload /></button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default WorkDataTable;
