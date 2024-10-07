import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

export default instance;
