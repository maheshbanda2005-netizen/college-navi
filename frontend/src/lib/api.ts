import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000,
    });

    this.client.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  async upload<T>(url: string, formData: FormData): Promise<T> {
    const response = await this.client.post<T>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
}

export const api = new ApiClient();

export const authApi = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
  verifyOtp: (data: { email: string; otp: string }) => api.post('/auth/verify-otp', data),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data: { token: string; password: string }) => api.post('/auth/reset-password', data),
  googleLogin: (token: string) => api.post('/auth/google', { token }),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
};

export const universityApi = {
  getAll: (params?: any) => api.get('/universities', { params }),
  getById: (id: string) => api.get(`/universities/${id}`),
  getCourses: (id: string) => api.get(`/universities/${id}/courses`),
  getPlacements: (id: string) => api.get(`/universities/${id}/placements`),
  getCampusImages: (id: string) => api.get(`/universities/${id}/campus-images`),
  getHostels: (id: string) => api.get(`/universities/${id}/hostels`),
  getFaculty: (id: string) => api.get(`/universities/${id}/faculty`),
  getCutoffs: (id: string, params?: any) => api.get(`/universities/${id}/cutoffs`, { params }),
  getReviews: (id: string) => api.get(`/universities/${id}/reviews`),
  create: (data: any) => api.post('/universities', data),
  update: (id: string, data: any) => api.put(`/universities/${id}`, data),
  delete: (id: string) => api.delete(`/universities/${id}`),
};

export const aiApi = {
  getRecommendations: (data: any) => api.post('/ai/recommendations', data),
  predictAdmission: (data: any) => api.post('/ai/admission-predict', data),
  predictByRank: (data: any) => api.post('/ai/rank-predictor', data),
  getScholarshipMatches: (data: any) => api.post('/ai/scholarship-match', data),
  getCareerGuidance: (data: any) => api.post('/ai/career-guidance', data),
  analyzeResume: (data: any) => api.post('/ai/resume-analyze', data),
  chatWithAI: (data: { message: string; context?: any }) => api.post('/ai/chat', data),
};

export const applicationApi = {
  getAll: (params?: any) => api.get('/applications', { params }),
  getById: (id: string) => api.get(`/applications/${id}`),
  create: (data: any) => api.post('/applications', data),
  updateStatus: (id: string, status: string) => api.put(`/applications/${id}/status`, { status }),
  uploadDocument: (id: string, formData: FormData) => api.upload(`/applications/${id}/documents`, formData),
};

export const scholarshipApi = {
  getAll: (params?: any) => api.get('/scholarships', { params }),
  getById: (id: string) => api.get(`/scholarships/${id}`),
  apply: (data: any) => api.post('/scholarships/apply', data),
};

export const comparisonApi = {
  compare: (ids: string[]) => api.post('/comparison/compare', { ids }),
};

export const adminApi = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getUsers: (params?: any) => api.get('/admin/users', { params }),
  getUniversities: (params?: any) => api.get('/admin/universities', { params }),
  getReports: (type: string) => api.get(`/admin/reports/${type}`),
};
