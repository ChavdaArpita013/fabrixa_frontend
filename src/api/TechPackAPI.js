import axios from "axios";
import Cookies from 'js-cookie';

const userName = Cookies.get('user')
const techpackName = Cookies.get('techPackName');

const createNewTechPack = async (pages) => {
    console.log(pages);
    
    try {
        const server = process.env.REACT_APP_SERVER;
        // Structure the payload
        const payload = {
            createdBy: userName, // Pass the creator's name or ID
            techPackName: techpackName,
            techPackData: pages, // Organize techPackData
        };

        const response = await axios.post(`http://localhost:8090/work/create-techpacks`, payload);
        return response.data;
    } catch (error) {
        console.error("Create TechPack API error:", error);
    }
};

const fetchAllTechPacksByUser = async () => {

    try {
        const server = process.env.REACT_APP_SERVER;
        const response = await axios.post(`http://localhost:8090/work/my-techpacks`, { "userName": userName })
        
        return response.data;
    } catch (error) {
        console.error("Something went wrong :" , error);
    }
}

const deleteTechPackById = (techpackId) =>{
    try {
        const response = axios.delete(`http://localhost:8090/work/delete-teckpack/${techpackId}`);
        console.log("deleted Successfully " , response.data);
        
    } catch (error) {
        console.log(`Error deleted techpack: ${techpackId}`);
        
    }
}

export { createNewTechPack , fetchAllTechPacksByUser ,deleteTechPackById};
