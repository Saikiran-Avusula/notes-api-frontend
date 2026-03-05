import axios from 'axios';
import { API_CONFIG, STORAGE_KEYS, ERROR_MESSAGES } from '../constants';

const API_BASE_URL = API_CONFIG.BASE_URL;

// Create axios instance with better configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_NAME);
      window.location.href = '/login';
    }
    
    const errorMessage = error.response?.data?.error || 
                        error.message || 
                        ERROR_MESSAGES.GENERIC_ERROR;
    
    return Promise.reject({ ...error, message: errorMessage });
  }
);

// Auth APIs with better error handling
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

// Notes APIs with better organization
export const notesAPI = {
  getAll: () => api.get('/notes'),
  getById: (id) => api.get(`/notes/${id}`),
  create: (noteData) => api.post('/notes', noteData),
  update: (id, noteData) => api.put(`/notes/${id}`, noteData),
  delete: (id) => api.delete(`/notes/${id}`),
};

// Legacy exports for backward compatibility
export const register = authAPI.register;
export const login = authAPI.login;
export const getNotes = notesAPI.getAll;
export const getNoteById = notesAPI.getById;
export const createNote = notesAPI.create;
export const updateNote = notesAPI.update;
export const deleteNote = notesAPI.delete;

export default api;