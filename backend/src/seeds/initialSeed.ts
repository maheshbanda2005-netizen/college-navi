import { User } from '../models/User';
import { University } from '../models/University';
import { Course } from '../models/Course';
import { Scholarship } from '../models/Scholarship';

export const users = [
  { email: 'admin@edunavigator.com', password: 'admin123', name: 'Super Admin', role: 'admin', isVerified: true },
  { email: 'student@example.com', password: 'student123', name: 'John Student', role: 'student', isVerified: true },
  { email: 'counselor@example.com', password: 'counselor123', name: 'Dr. Sharma', role: 'counselor', isVerified: true },
  { email: 'parent@example.com', password: 'parent123', name: 'Ramesh Kumar', role: 'parent', isVerified: true },
];

export const universities = [
  { name: 'Indian Institute of Technology Bombay', description: 'Premier engineering institute known for academic excellence and research.', establishmentYear: 1958, ownership: 'Government', accreditation: 'NAAC A++', ranking: { nirf: 1, qs: 172, naacGrade: 'A++', nbaAccreditation: true }, country: 'India', state: 'Maharashtra', city: 'Mumbai', facilities: ['Central Library', 'Advanced Labs', 'Sports Complex', 'WiFi Campus', 'Medical Center'], isVerified: true },
  { name: 'Indian Institute of Technology Delhi', description: 'Leading technical institute with world-class research and innovation.', establishmentYear: 1961, ownership: 'Government', accreditation: 'NAAC A++', ranking: { nirf: 2, qs: 197, naacGrade: 'A++', nbaAccreditation: true }, country: 'India', state: 'Delhi', city: 'New Delhi', facilities: ['Digital Library', 'Research Centers', 'Sports Stadium', 'Smart Classrooms'], isVerified: true },
  { name: 'National Institute of Technology Trichy', description: 'Premier NIT with excellent placement record and infrastructure.', establishmentYear: 1964, ownership: 'Government', accreditation: 'NAAC A+', ranking: { nirf: 3, qs: 801, naacGrade: 'A+', nbaAccreditation: true }, country: 'India', state: 'Tamil Nadu', city: 'Tiruchirappalli', facilities: ['Central Library', 'WiFi Campus', 'Hostel', 'Sports Complex'], isVerified: true },
  { name: 'BITS Pilani', description: 'Deemed university with strong industry connections and innovative curriculum.', establishmentYear: 1964, ownership: 'Private', accreditation: 'NAAC A+', ranking: { nirf: 4, qs: 1000, naacGrade: 'A+', nbaAccreditation: true }, country: 'India', state: 'Rajasthan', city: 'Pilani', facilities: ['Library', 'Labs', 'Sports', 'Hostel'], isVerified: true },
  { name: 'Indian Institute of Technology Kharagpur', description: 'Largest IIT campus with diverse academic programs and research.', establishmentYear: 1951, ownership: 'Government', accreditation: 'NAAC A++', ranking: { nirf: 5, qs: 271, naacGrade: 'A++', nbaAccreditation: true }, country: 'India', state: 'West Bengal', city: 'Kharagpur', facilities: ['Central Library', 'Research Park', 'Sports Stadium', 'Medical'], isVerified: true },
  { name: 'University of Delhi', description: 'Central university with rich academic tradition and diverse programs.', establishmentYear: 1922, ownership: 'Government', accreditation: 'NAAC A+', ranking: { nirf: 6, qs: 521, naacGrade: 'A+', nbaAccreditation: false }, country: 'India', state: 'Delhi', city: 'New Delhi', facilities: ['Central Library', 'Labs', 'Sports', 'Hostel'], isVerified: true },
  { name: 'Vellore Institute of Technology', description: 'Top private university with strong placements and global exposure.', establishmentYear: 1984, ownership: 'Private', accreditation: 'NAAC A++', ranking: { nirf: 7, qs: 801, naacGrade: 'A++', nbaAccreditation: true }, country: 'India', state: 'Tamil Nadu', city: 'Vellore', facilities: ['Smart Library', 'Innovation Labs', 'Sports Arena', 'Hostel'], isVerified: true },
  { name: 'Indian Institute of Technology Madras', description: 'Top-ranked IIT with outstanding research output and industry ties.', establishmentYear: 1959, ownership: 'Government', accreditation: 'NAAC A++', ranking: { nirf: 1, qs: 227, naacGrade: 'A++', nbaAccreditation: true }, country: 'India', state: 'Tamil Nadu', city: 'Chennai', facilities: ['Central Library', 'Research Park', 'Olympic Pool', 'WiFi Campus'], isVerified: true },
];

export const courses = [
  { name: 'B.Tech Computer Science and Engineering', degree: 'B.Tech', department: 'CSE', eligibility: 'JEE Advanced + 75% in 12th', duration: '4 Years', seats: 120, feeStructure: { tuitionFee: 220000 } },
  { name: 'B.Tech Artificial Intelligence', degree: 'B.Tech', department: 'CSE', eligibility: 'JEE Advanced + 75% in 12th', duration: '4 Years', seats: 60, feeStructure: { tuitionFee: 240000 } },
  { name: 'M.Tech Machine Learning', degree: 'M.Tech', department: 'CSE', eligibility: 'GATE + B.Tech', duration: '2 Years', seats: 45, feeStructure: { tuitionFee: 150000 } },
  { name: 'B.Sc. Computer Science', degree: 'B.Sc', department: 'Science', eligibility: '12th with PCM', duration: '3 Years', seats: 100, feeStructure: { tuitionFee: 50000 } },
  { name: 'MBA in Technology Management', degree: 'MBA', department: 'Management', eligibility: 'Graduation + CAT', duration: '2 Years', seats: 60, feeStructure: { tuitionFee: 350000 } },
];

export const scholarships = [
  { name: 'National Merit Scholarship', provider: 'Government of India', amount: '₹50,000/year', description: 'Merit-based scholarship for top performers', eligibility: { minMarks: 90, maxIncome: 800000 }, deadline: new Date('2025-12-31'), category: 'Merit', documentChecklist: ['Marksheet', 'Income Certificate', 'ID Proof'], isActive: true },
  { name: 'SC/ST Scholarship', provider: 'Ministry of Social Justice', amount: 'Full Tuition', description: 'Full tuition coverage for SC/ST students', eligibility: { category: 'SC/ST', maxIncome: 250000 }, deadline: new Date('2025-11-30'), category: 'Category', documentChecklist: ['Caste Certificate', 'Income Certificate'], isActive: true },
  { name: 'Girl Child Education Fund', provider: 'Various NGOs', amount: '₹30,000/year', description: 'Supporting girl child education', eligibility: { gender: 'Female', maxIncome: 500000 }, deadline: new Date('2025-01-15'), category: 'Gender', documentChecklist: ['ID Proof', 'Income Certificate'], isActive: true },
  { name: 'Sports Excellence Scholarship', provider: 'Sports Authority of India', amount: '₹75,000/year', description: 'For national level sports achievers', eligibility: { sports: true }, deadline: new Date('2025-12-15'), category: 'Sports', documentChecklist: ['Sports Certificate', 'ID Proof'], isActive: true },
  { name: 'Minority Community Scholarship', provider: 'Ministry of Minority Affairs', amount: '₹40,000/year', description: 'For students from minority communities', eligibility: { minorityStatus: true, maxIncome: 500000 }, deadline: new Date('2025-10-31'), category: 'Minority', documentChecklist: ['Community Certificate', 'Income Certificate'], isActive: true },
  { name: 'Disability Support Scholarship', provider: 'Social Welfare Department', amount: '₹60,000/year', description: 'Supporting differently-abled students', eligibility: { disability: true, maxIncome: 800000 }, deadline: new Date('2025-02-28'), category: 'Disability', documentChecklist: ['Disability Certificate', 'ID Proof'], isActive: true },
];

export async function seedIfEmpty() {
  const count = await User.countDocuments();
  if (count > 0) return;

  console.log('Seeding initial data...');

  for (const userData of users) {
    await User.create(userData);
  }

  for (const uniData of universities) {
    const uni = await University.create(uniData);
    for (const courseData of courses) {
      await Course.create({ ...courseData, universityId: uni._id });
    }
  }

  for (const scholarshipData of scholarships) {
    await Scholarship.create(scholarshipData);
  }

  console.log('Seed data loaded — admin@edunavigator.com / admin123 | student@example.com / student123');
}
