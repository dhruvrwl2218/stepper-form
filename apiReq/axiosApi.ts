import axios from 'axios'

export const api = axios.create({
    baseURL:"http://localhost:3000/api",
    timeout:200000,
    headers:{
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(
    (config) => {
      // You can add authorization tokens or other custom headers here
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // You can add response interceptors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle errors globally
      return Promise.reject(error);
    }
  );