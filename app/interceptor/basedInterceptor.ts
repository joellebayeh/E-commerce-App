// lib/axios.js
import axios from 'axios';
import {API} from "@/app/screens/endpoints";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: API.BASE_URL, // API base URL
    timeout: 10000, // Timeout for requests
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add Authorization token or modify headers
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Process successful response
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
