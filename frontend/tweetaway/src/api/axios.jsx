import axios from "axios";

// Defining base API URL for global use
export const baseURL = "https://still-mountain-60660.herokuapp.com";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Exporting for global use

export default axiosInstance;
