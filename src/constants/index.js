// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
};

// App Configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'NotesApp',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  MAX_TITLE_LENGTH: 100,
  MAX_CONTENT_LENGTH: 10000
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  NOTES: '/notes',
  NEW_NOTE: '/notes/new',
  EDIT_NOTE: '/notes/edit/:id'
};

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_NAME: 'userName',
  THEME: 'theme',
  LAST_VISIT: 'lastVisit'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  NOTE_CREATED: 'Note created successfully!',
  NOTE_UPDATED: 'Note updated successfully!',
  NOTE_DELETED: 'Note deleted successfully!',
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTER_SUCCESS: 'Account created successfully!'
};