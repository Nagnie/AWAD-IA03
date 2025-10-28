import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const message = error.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

export interface RegisterData {
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
    createdAt: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}

export const registerUser = async (data: RegisterData): Promise<RegisterResponse | ApiErrorResponse> => {
  try {
    const response = await api.post('/user/register', data);
    return response.data;
  } catch (error: unknown) {
    const message =
      error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string'
        ? (error as any).message
        : 'Registration failed';
    return {
      success: false,
      message,
    };
  }
};