export interface AdmissionTrend {
  year: number;
  applications: number;
  admissions: number;
}

export interface PopularCourse {
  name: string;
  count: number;
}

export interface PlacementStats {
  averagePackage: number;
  highestPackage: number;
  placementRate: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalUniversities: number;
  totalApplications: number;
  activeStudents: number;
  revenue?: number;
  admissionTrends: AdmissionTrend[];
  popularCourses: PopularCourse[];
  placementStats: PlacementStats;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
