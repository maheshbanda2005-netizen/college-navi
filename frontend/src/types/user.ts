export type UserRole = 'student' | 'parent' | 'university' | 'counselor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface AcademicHistory {
  tenthMarks: number;
  twelfthMarks: number;
  ugCGPA?: number;
  entranceScore?: number;
  entranceExam?: string;
  reservation?: string;
  category?: string;
  workExperience?: number;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Student extends User {
  role: 'student';
  academicHistory?: AcademicHistory;
  gpa?: number;
  marks?: number;
  skills?: string[];
  certificates?: string[];
  projects?: Project[];
  resume?: string;
  interests?: string[];
  budget?: number;
  preferredCountries?: string[];
  preferredStates?: string[];
  preferredCities?: string[];
  preferredCourses?: string[];
  careerGoal?: string;
  languages?: string[];
}
