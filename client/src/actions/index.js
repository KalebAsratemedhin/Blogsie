import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true, 
});


api.interceptors.response.use(
    response => response,
    error => {
      if (!error.response) {
        alert('Network error: Please check your internet connection or try again later.');
        return Promise.resolve({});
      }
  
      if (error.response) {
        if (error.response.status === 401 && error.response.data === 'Not Authorized') {
          console.log("deleted username")
          localStorage.removeItem('username');
          window.location.href = '/';
        }
      }
  
      // Return a rejected promise to keep the promise chain consistent
      return Promise.reject(error);
    }
  );
export default api;