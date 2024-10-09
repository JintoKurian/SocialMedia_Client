// UserRequests.js

import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  
  return req;
});

export const getUser = (userId) => API.get(`/user/${userId}`);
export const updateUser = (id, formData) =>  API.put(`/user/${id}`, formData);
export const getAllUser = ()=> API.get('/user');
export const followUser = (id,data)=> API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data)=> API.put(`/user/${id}/unfollow`, data);

export const deleteUser = (id, currentUserId, currentUserAdmin) => 
  API.delete(`/user/${id}`, { data: { currentUserId, currentUserAdmin } });

// Function to fetch user data by userId
export const getUserById = async (userId) => {
  try {
    const response = await API.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user data for userId ${userId}: ${error.message}`);
  }
};



// // UserRequests.js

// import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem('profile')) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//   }
  
//   return req;
// });

// export const getUser = (userId) => API.get(`/user/${userId}`);
// export const updateUser = (id, formData) =>  API.put(`/user/${id}`, formData);
// export const getAllUser = ()=> API.get('/user');
// export const followUser = (id,data)=> API.put(`/user/${id}/follow`, data);
// export const unfollowUser = (id, data)=> API.put(`/user/${id}/unfollow`, data);

// // Function to fetch user data by userId
// export const getUserById = async (userId) => {
//   try {
//     const response = await API.get(`/user/${userId}`);
//     return response.data;
//   } catch (error) {
//     throw new Error(`Failed to fetch user data for userId ${userId}: ${error.message}`);
//   }
// };



