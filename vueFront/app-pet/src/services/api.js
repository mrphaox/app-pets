import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir el token en las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funciones para mascotas
export const getPets = async () => {
  const response = await api.get('/pets/list');
  return response.data;
};

export const getPetById = async (id) => {
  const response = await api.get(`/pets/${id}/view`);
  return response.data;
};

export const createPet = async (data) => {
  const response = await api.post('/pets/create', data);
  return response.data;
};

export const updatePet = async (id, data) => {
  const response = await api.put(`/pets/${id}/update`, data);
  return response.data;
};

export const deletePet = async (id) => {
  const response = await api.delete(`/pets/${id}/delete`);
  return response.data;
};

// Funciones para usuarios
export const loginUser = async (email, password) => {
  const response = await api.post('/login', { email, contraseña: password });
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user)); // Guarda los datos del usuario
  return response.data;
};

export const registerUser = async (nombre, email, password, rol = 'usuario') => {
  const response = await api.post('/users/register', { nombre, email, contraseña: password, rol });
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/users/list');
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}/delete`);
  return response.data;
};
