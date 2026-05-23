import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:3000/api",
});

newRequest.interceptors.request.use(
  (config) => {

    let token = 
      localStorage.getItem("token") || 
      localStorage.getItem("accessToken") || 
      localStorage.getItem("jwt");


    if (!token) {
      const currentUserData = localStorage.getItem("currentUser");
      if (currentUserData) {
        try {
          const user = JSON.parse(currentUserData);
          token = user.token || user.accessToken || user.data?.token;
        } catch (e) {
          console.error("Error parsing currentUser", e);
        }
      }
    }

    if (token) {
      const cleanToken = token.replace(/^"(.*)"$/, '$1');
      config.headers.Authorization = `Bearer ${cleanToken}`;
    } else {
      console.warn("⚠️ Warning: No token found in LocalStorage at all!");
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default newRequest;