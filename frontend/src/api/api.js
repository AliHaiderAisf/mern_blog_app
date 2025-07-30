import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('Base URL set to:', baseURL);

const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  console.log('Full Request URL:', baseURL + req.url);
  return req;
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

export const createPost = (data) => API.post('/posts', data);
export const getPosts = () => API.get('/posts');
export const getPost = (id) => API.get(`/posts/${id}`);
export const likePost = (id) => API.post(`/posts/${id}/like`);
export const dislikePost = (id) => API.post(`/posts/${id}/dislike`);

export const getPendingPosts = () => API.get('/posts/admin/pending');
export const approvePost = (id) => API.put(`/posts/admin/approve/${id}`);
export const rejectPost = (id) => API.put(`/posts/admin/reject/${id}`);

export const getAllPosts = () => API.get('/posts/admin/all');
export const deletePost = (id) => API.delete(`/posts/admin/delete/${id}`);

export const addComment = (postId, data) => API.post(`/comments/${postId}`, data);
export const getComments = (postId) => API.get(`/comments/${postId}`);