export interface User {
  id: string; email: string; name: string; role: 'student' | 'parent' | 'university' | 'counselor' | 'admin';
  avatar?: string; phone?: string; isVerified: boolean; createdAt: string;
}

export interface Student extends User {
  role: 'student';
  academicHistory?: AcademicHistory;
  gpa?: number; marks?: number; skills?: string[];
  certificates?: string[]; projects?: Project[];
  resume?: string; interests?: string[];
  budget?: number; preferredCountries?: string[];
  preferredStates?: string[]; preferredCities?: string[];
  preferredCourses?: string[]; careerGoal?: string;
  languages?: string[];
}

export interface AcademicHistory {
  tenthMarks: number; twelfthMarks: number; ugCGPA?: number;
  entranceScore?: number; entranceExam?: string;
  reservation?: string; category?: string; workExperience?: number;
}

export interface Project {
  title: string; description: string; technologies: string[]; link?: string;
}

export interface University {
  id: string;
  name: string;
  shortName?: string;
  collegeCode?: string;
  aicteInstituteId?: string;
  ugcId?: string;
  logo?: string;
  coverImage?: string;
  description: string;
  establishmentYear: number;
  collegeType?: string;
  ownership: string;
  accreditation: string;
  ranking: Ranking;
  aiScore?: CollegeScore;
  campusArea?: string;
  country: string;
  state: string;
  city: string;
  district?: string;
  mandal?: string;
  village?: string;
  address?: string;
  pinCode?: string;
  googleMapsCoordinates?: { lat: number; lng: number };
  googleMapsUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  admissionCell?: string;
  website?: string;
  socialLinks?: SocialLinks;
  isoCertification?: string;
  affiliatedUniversity?: string;
  facilities: string[];
  courses: Course[];
  placements?: Placement[];
  campusImages?: CampusImage[];
  hostels?: Hostel[];
  faculty?: Faculty[];
  cutoffs?: Cutoff[];
  reviews: Review[];
  createdAt: string;
  isVerified: boolean;
}

export interface Ranking {
  nirf?: number; qs?: number; naacGrade?: string; nbaAccreditation?: boolean;
}

export interface CollegeScore {
  overall?: number;
  placement?: number;
  roi?: number;
  research?: number;
  infrastructure?: number;
  studentSatisfaction?: number;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

export interface Course {
  id: string; name: string; degree: string; department: string;
  specialization?: string; eligibility: string; duration: string;
  seats: number; feeStructure: FeeStructure; curriculum?: string;
  syllabusPdf?: string; credits?: number;
}

export interface FeeStructure {
  tuitionFee: number; hostelFee?: number; livingCost?: number;
  otherFees?: number; totalFee?: number;
}

export interface Placement {
  id: string;
  universityId: string;
  highestPackage: number;
  averagePackage: number;
  medianPackage?: number;
  placementRate: number;
  batchYear: number;
  totalStudents?: number;
  studentsPlaced?: number;
  topRecruiters: string[];
  internshipPartners?: string[];
  salaryTrends?: SalaryTrend[];
  placementHighlights?: string;
}

export interface SalaryTrend { year: number; averagePackage: number; highestPackage: number; }

export interface CampusImage {
  id: string;
  universityId: string;
  category: 'logo' | 'cover' | 'campus' | 'hostel' | 'library' | 'lab' | 'sports' | 'auditorium' | 'classroom' | 'other';
  url: string;
  caption?: string;
  isPrimary: boolean;
}

export interface Hostel {
  id: string;
  universityId: string;
  name: string;
  type: 'boys' | 'girls' | 'co-ed';
  capacity: number;
  roomsAvailable?: number;
  feesPerYear: number;
  facilities: string[];
  messAvailable: boolean;
  wifiAvailable: boolean;
  acAvailable: boolean;
  rating?: number;
  description?: string;
}

export interface Faculty {
  id: string;
  universityId: string;
  name: string;
  department: string;
  designation: string;
  qualification: string;
  specialization?: string;
  experience: number;
  email?: string;
  phone?: string;
  photoUrl?: string;
  isHod: boolean;
}

export interface Cutoff {
  id: string;
  universityId: string;
  course: string;
  degree: string;
  department: string;
  year: number;
  round: number;
  quota: string;
  category: string;
  gender: string;
  closingRank: number;
  openingRank?: number;
  examName: string;
}

export interface Review {
  id: string; userId: string; userName: string; userRole: string;
  rating: number; comment: string; pros?: string; cons?: string;
  createdAt: string;
}

export interface Scholarship {
  id: string; name: string; provider: string; amount: number;
  eligibility: ScholarshipEligibility; deadline: string;
  description: string; documentChecklist: string[];
  category: string;
}

export interface ScholarshipEligibility {
  minIncome?: number; maxIncome?: number; category?: string;
  gender?: string; state?: string; minMarks?: number;
  disability?: boolean; sports?: boolean; minorityStatus?: boolean;
}

export interface AIRecommendation {
  universityId: string; universityName: string; matchScore: number;
  estimatedAdmissionChance: number; scholarshipSuggestions: string[];
  careerRoadmap: string[]; reasons: string[];
}

export interface RankPredictionResult {
  chance: 'High' | 'Medium' | 'Dream';
  college: {
    id: string;
    name: string;
    shortName: string;
    collegeCode: string;
    city: string;
    district: string;
    ownership: string;
    collegeType: string;
  };
  branch: string;
  closingRank: number;
  year: number;
  matchScore: number;
  placementRate?: number;
  averagePackage?: number;
  highestPackage?: number;
  fees?: number;
  naacGrade?: string;
  nirfRank?: number;
}

export interface RankPredictorResponse {
  highChance: RankPredictionResult[];
  mediumChance: RankPredictionResult[];
  dream: RankPredictionResult[];
  aiRecommendation: {
    bestCollege?: RankPredictionResult;
    alternative?: RankPredictionResult;
    safeOption?: RankPredictionResult;
    highestROI?: RankPredictionResult;
    bestPlacement?: RankPredictionResult;
  };
  totalColleges: number;
  matchSummary: {
    rank: number;
    category: string;
    gender: string;
    branch: string;
  };
}

export interface AdmissionPrediction {
  admissionProbability: number; safeColleges: University[];
  moderateColleges: University[]; dreamColleges: University[];
}

export interface CareerGuidance {
  careerSuggestions: CareerSuggestion[];
  skillGapAnalysis: SkillGap[];
  salaryPrediction: SalaryPrediction;
  learningRoadmap: string[];
}

export interface CareerSuggestion {
  career: string; matchScore: number; requiredSkills: string[];
  averageSalary: number; growthOutlook: string;
}

export interface SkillGap { skill: string; currentLevel: number; requiredLevel: number; }

export interface SalaryPrediction { minSalary: number; maxSalary: number; averageSalary: number; }

export interface Application {
  id: string; userId: string; universityId: string; courseId: string;
  status: 'submitted' | 'document_verification' | 'review' | 'interview' | 'selected' | 'admitted' | 'rejected';
  documents: string[]; feePaid: boolean; offerLetter?: string;
  createdAt: string; updatedAt: string;
}

export interface ChatMessage {
  id: string; senderId: string; receiverId?: string;
  content: string; type: 'text' | 'file' | 'system';
  timestamp: string; read: boolean;
}

export interface Notification {
  id: string; userId: string; title: string; message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean; createdAt: string;
}

export interface DashboardStats {
  totalUsers: number; totalUniversities: number; totalApplications: number;
  activeStudents: number; revenue?: number; admissionTrends: any[];
  popularCourses: any[]; placementStats: any;
}

export interface PaginatedResponse<T> {
  data: T[]; total: number; page: number; limit: number; totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean; data?: T; message?: string; error?: string;
}
