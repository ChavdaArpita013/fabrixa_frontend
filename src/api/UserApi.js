import axios from "axios";
import Cookies from 'js-cookie';

const registerUser = async (encryptedData) => {
    try {
        const server = process.env.REACT_APP_SERVER;
        const response = await axios.post(`http://localhost:8090/user/register`, { encryptedData });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
const loginUser = async (encryptedData) => {
    try {
        // Make POST request
        const response = await axios.post(`http://localhost:8090/user/login`, { encryptedData });

        // Extract token from response
        const { token } = response.data;

        if (token) {
            // Store the JWT token in a cookie (expires in 7 days)
            Cookies.set('authToken', token, { expires: 7, path: '/' });
            Cookies.set('isSignedIn', true, { expires: 7, path: '/' })
            console.log('Token stored in cookies:', token);
        } else {
            console.log('Token not received in the response.');
        }
    } catch (error) {
        // Handle API errors
        if (error.response) {
            console.error('API Error:', error.response.data.message || error.response.statusText);
        } else {
            console.error('Error making API call:', error.message);
        }
    }
};

export { registerUser, loginUser };
