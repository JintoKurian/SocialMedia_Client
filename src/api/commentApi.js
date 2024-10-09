// 3. commentApi.js
import axios from 'axios';

const baseUrl = 'http://localhost:5000/comments'; // Adjust the base URL according to your backend API

export const getComments = async (postId) => {
  const response = await axios.get(`${baseUrl}?postId=${postId}`); // Fetch comments for a specific post
  return response.data;
};


export const addComment = async (commentData) => {
  const response = await axios.post(baseUrl, commentData);
  return response.data;
};

// Define other API functions for updating, deleting comments, etc.


// // 3. commentApi.js
// import axios from 'axios';

// const baseUrl = '/api/comments'; // Adjust the base URL according to your backend API

// export const getComments = async () => {
//   const response = await axios.get(baseUrl);
//   return response.data;
// };

// export const addComment = async (commentData) => {
//   const response = await axios.post(baseUrl, commentData);
//   return response.data;
// };

// // Define other API functions for updating, deleting comments, etc.


