import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import type {
  User, University, Course, Placement, CampusImage, Hostel, Faculty, Cutoff, Review,
  Scholarship, Application, ApplicationStatus, Notification,
  AIRecommendation, RankPredictorResponse, AdmissionPrediction, CareerGuidance,
  DashboardStats, ApiResponse, PaginatedResponse,
} from '@/types';
import { getToken, clearAuth } from './auth';

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
      const token = getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
          clearAuth();
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

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
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

type AuthResponse = ApiResponse<{ user: User; token: string }>;

export const authApi = {
  login: (data: { email: string; password: string }) => api.post<AuthResponse>('/auth/login', data),
  register: (data: Partial<User> & { password: string }) => api.post<AuthResponse>('/auth/register', data),
  verifyOtp: (data: { email: string; otp: string }) => api.post<AuthResponse>('/auth/verify-otp', data),
  forgotPassword: (email: string) => api.post<ApiResponse<null>>('/auth/forgot-password', { email }),
  resetPassword: (data: { token: string; password: string }) => api.post<AuthResponse>('/auth/reset-password', data),
  googleLogin: (token: string) => api.post<AuthResponse>('/auth/google', { token }),
  getProfile: () => api.get<ApiResponse<User>>('/auth/profile'),
  updateProfile: (data: Partial<User>) => api.put<ApiResponse<User>>('/auth/profile', data),
};

export interface UniversityQueryParams {
  search?: string;
  state?: string;
  city?: string;
  ownership?: string;
  course?: string;
  minRank?: number;
  maxFee?: number;
  page?: number;
  limit?: number;
}

export const universityApi = {
  getAll: (params?: UniversityQueryParams) => api.get<ApiResponse<University[]> | PaginatedResponse<University>>('/universities', { params }),
  getById: (id: string) => api.get<ApiResponse<University>>(`/universities/${id}`),
  getCourses: (id: string) => api.get<ApiResponse<Course[]>>(`/universities/${id}/courses`),
  getPlacements: (id: string) => api.get<ApiResponse<Placement[]>>(`/universities/${id}/placements`),
  getCampusImages: (id: string) => api.get<ApiResponse<CampusImage[]>>(`/universities/${id}/campus-images`),
  getHostels: (id: string) => api.get<ApiResponse<Hostel[]>>(`/universities/${id}/hostels`),
  getFaculty: (id: string) => api.get<ApiResponse<Faculty[]>>(`/universities/${id}/faculty`),
  getCutoffs: (id: string, params?: { year?: number; round?: number; category?: string }) => api.get<ApiResponse<Cutoff[]>>(`/universities/${id}/cutoffs`, { params }),
  getReviews: (id: string) => api.get<ApiResponse<Review[]>>(`/universities/${id}/reviews`),
  create: (data: Partial<University>) => api.post<ApiResponse<University>>('/universities', data),
  update: (id: string, data: Partial<University>) => api.put<ApiResponse<University>>(`/universities/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse<null>>(`/universities/${id}`),
};

export interface AIRecommendationRequest {
  academicProfile: {
    gpa?: number;
    marks?: number;
    entranceScore?: number;
    budget?: number;
    preferredLocations?: string[];
    preferredCourses?: string[];
    careerGoal?: string;
  };
}

export interface RankPredictorRequest {
  rank: number;
  category: string;
  gender: string;
  branch: string;
  examName?: string;
}

export const aiApi = {
  getRecommendations: (data: AIRecommendationRequest) => api.post<ApiResponse<AIRecommendation[]>>('/ai/recommendations', data),
  predictAdmission: (data: AIRecommendationRequest) => api.post<ApiResponse<AdmissionPrediction>>('/ai/admission-predict', data),
  predictByRank: (data: RankPredictorRequest) => api.post<ApiResponse<RankPredictorResponse>>('/ai/rank-predictor', data),
  getScholarshipMatches: (data: { profile: Record<string, unknown> }) => api.post<ApiResponse<Scholarship[]>>('/ai/scholarship-match', data),
  getCareerGuidance: (data: { interests: string[]; skills: string[] }) => api.post<ApiResponse<CareerGuidance>>('/ai/career-guidance', data),
  analyzeResume: (data: { resume: string }) => api.post<ApiResponse<unknown>>('/ai/resume-analyze', data),
  chatWithAI: (data: { message: string; context?: Record<string, unknown> }) => api.post<ApiResponse<{ reply: string }>>('/ai/chat', data),
};

export const applicationApi = {
  getAll: (params?: { status?: ApplicationStatus; page?: number }) => api.get<ApiResponse<Application[]> | PaginatedResponse<Application>>('/applications', { params }),
  getById: (id: string) => api.get<ApiResponse<Application>>(`/applications/${id}`),
  create: (data: Partial<Application>) => api.post<ApiResponse<Application>>('/applications', data),
  updateStatus: (id: string, status: ApplicationStatus) => api.put<ApiResponse<Application>>(`/applications/${id}/status`, { status }),
  uploadDocument: (id: string, formData: FormData) => api.upload<ApiResponse<Application>>(`/applications/${id}/documents`, formData),
};

export interface ScholarshipQueryParams {
  category?: string;
  gender?: string;
  state?: string;
  maxIncome?: number;
  page?: number;
  limit?: number;
}

export const scholarshipApi = {
  getAll: (params?: ScholarshipQueryParams) => api.get<PaginatedResponse<Scholarship>>('/scholarships', { params }),
  getById: (id: string) => api.get<ApiResponse<Scholarship>>(`/scholarships/${id}`),
  apply: (data: { scholarshipId: string; userId: string }) => api.post<ApiResponse<null>>('/scholarships/apply', data),
};

export const comparisonApi = {
  compare: (ids: string[]) => api.post<ApiResponse<unknown>>('/comparison/compare', { ids }),
};

export const adminApi = {
  getDashboardStats: () => api.get<ApiResponse<DashboardStats>>('/admin/dashboard'),
  getUsers: (params?: { page?: number; limit?: number; role?: string }) => api.get<PaginatedResponse<User>>('/admin/users', { params }),
  getUniversities: (params?: { page?: number; limit?: number }) => api.get<PaginatedResponse<University>>('/admin/universities', { params }),
  getReports: (type: string) => api.get<ApiResponse<unknown>>(`/admin/reports/${type}`),
};

export const notificationApi = {
  getAll: () => api.get<ApiResponse<Notification[]>>('/notifications'),
  markRead: (id: string) => api.put<ApiResponse<Notification>>(`/notifications/${id}/read`),
};
