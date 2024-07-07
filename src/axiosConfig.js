import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1', // Sesuaikan dengan URL backend Anda
    headers: {
        'Content-Type': 'application/json',
    },
});

// Tambahkan interceptor untuk menyertakan token jika ada
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;