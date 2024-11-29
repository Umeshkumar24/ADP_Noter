import axios from 'axios';

const API_URL = 'http://192.168.29.187:9090/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Ensures cookies/auth headers are sent
});


export default apiClient;
