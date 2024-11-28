import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    timeout: 10000,
});

export default instance;
