import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`);
export const likePost = (id, userId) => API.put(`posts/${id}/like`, { userId: userId });
export const getAllPosts = () => API.get(`/posts/getAllPosts`);
export const deletePost = (id, userId) => API.delete(`/posts/${id}`, { data: { userId } });





// import axios from 'axios'


// const API = axios.create({ baseURL: 'http://localhost:5000' });

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('profile')) {
//       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
  
//     return req;
//   });

// export const getTimelinePosts= (id)=> API.get(`/posts/${id}/timeline`);
// export const likePost=(id, userId)=>API.put(`posts/${id}/like`, {userId: userId});
// export const getAllPosts = ()=> API.get(`/posts/getAllPosts`);
// export const deletePost = (id,userId)=> API.delete(`/posts`,userId)
