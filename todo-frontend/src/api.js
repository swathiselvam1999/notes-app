import axios from 'axios';

const api = axios.create({
    baseURL: 'https://notes-app-x9jc.onrender.com/',
});

export default api;
