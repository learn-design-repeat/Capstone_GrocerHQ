import axios from 'axios';
const API_URL = 'http://localhost:5001'; //for local development
// const API_URL = 'https://1377-103-85-205-74.in.ngrok.io'; //for production

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});