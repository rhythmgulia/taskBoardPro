import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082/api',
});

// Add request interceptor to include token in all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

export const projectAPI = {
  getProjects: () => api.get('/projects'),
  createProject: (projectData) => api.post('/projects', projectData),
  updateProject: (id, projectData) => api.patch(`/projects/${id}`, projectData),
  deleteProject: (id) => api.delete(`/projects/${id}`),
};

export const taskAPI = {
  getTasks: (projectId) => api.get(`/tasks/project/${projectId}`),
  createTask: (taskData) => api.post('/tasks', taskData),
  updateTaskStatus: (id, status) => api.patch(`/tasks/${id}/status`, { status }),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export const automationAPI = {
  getAutomations: (projectId) => api.get(`/automations/project/${projectId}`),
  createAutomation: (automationData) => api.post('/automations', automationData),
  updateAutomation: (id, automationData) => api.patch(`/automations/${id}`, automationData),
  deleteAutomation: (id) => api.delete(`/automations/${id}`),
};