export interface Ranking {
  nirf?: number;
  qs?: number;
  naacGrade?: string;
  nbaAccreditation?: boolean;
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

export interface FeeStructure {
  tuitionFee: number;
  hostelFee?: number;
  livingCost?: number;
  otherFees?: number;
  totalFee?: number;
}

export interface Course {
  id: string;
  name: string;
  degree: string;
  department: string;
  specialization?: string;
  eligibility: string;
  duration: string;
  seats: number;
  feeStructure: FeeStructure;
  curriculum?: string;
  syllabusPdf?: string;
  credits?: number;
}

export interface SalaryTrend {
  year: number;
  averagePackage: number;
  highestPackage: number;
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

export type CampusImageCategory =
  | 'logo' | 'cover' | 'campus' | 'hostel' | 'library'
  | 'lab' | 'sports' | 'auditorium' | 'classroom' | 'other';

export interface CampusImage {
  id: string;
  universityId: string;
  category: CampusImageCategory;
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
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  rating: number;
  comment: string;
  pros?: string;
  cons?: string;
  createdAt: string;
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
