import mongoose from 'mongoose';
import { config } from './config';
import { connectDatabase } from './config/database';
import { User } from './models/User';
import { University } from './models/University';
import { Course } from './models/Course';
import { Scholarship } from './models/Scholarship';

const universities = [
  { name: 'Indian Institute of Technology Bombay', description: 'Premier engineering institute known for academic excellence and research.', establishmentYear: 1958, ownership: 'Government', accreditation: 'NAAC A++', ranking: { nirf: 1, qs: 172, naacGrade: 'A++', nbaAccreditation: true }, country: 'India', state: 'Maharashtra', city: 'Mumbai', facilities: ['Central Library', 'Advanced Labs', 'Sports Complex', 'WiFi Campus', 'Medical Center'] },
  { name: 'Indian Institute of Technology Delhi', description: 'Leading technical institute with world-class research and innovation.', establishmentYear: 1961, ownership: 'Government', accreditation: 'NAAC A++', ranking: { nirf: 2, qs: 197, naacGrade: 'A++', nbaAccreditation: true }, country: 'India', state: 'Delhi', city: 'New Delhi', facilities: ['Digital Library', 'Research Centers', 'Sports Stadium', 'Smart Classrooms'] },
  { name: 'National Institute of Technology Trichy', description: 'Premier NIT with excellent placement record and infrastructure.', establishmentYear: 1964, ownership: 'Government', accreditation: 'NAAC A+', ranking: { nirf: 3, qs: 801, naacGrade: 'A+', nbaAccreditation: true }, country: 'India', state: 'Tamil Nadu', city: 'Tiruchirappalli', facilities: ['Central Library', 'WiFi Campus', 'Hostel', 'Sports Complex'] },
  { name: 'BITS Pilani', description: 'Deemed university with strong industry connections and innovative curriculum.', establishmentYear: 1964, ownership: 'Private', accreditation: 'NAAC A+', ranking: { nirf: 4, qs: 1000, naacGrade: 'A+', nbaAccreditation: true }, country: 'India', state: 'Rajasthan', city: 'Pilani', facilities: ['Library', 'Labs', 'Sports', 'Hostel'] },
  { name: 'Indian Institute of Technology Kharagpur', description: 'Largest IIT campus with diverse academic programs and research.', establishmentYear: 1951, ownership: 'Government', accreditation: 'NAAC A++', ranking: { nirf: 5, qs: 271, naacGrade: 'A++', nbaAccreditation: true }, country: 'India', state: 'West Bengal', city: 'Kharagpur', facilities: ['Central Library', 'Research Park', 'Sports Stadium', 'Medical'] },
  { name: 'University of Delhi', description: 'Central university with rich academic tradition and diverse programs.', establishmentYear: 1922, ownership: 'Government', accreditation: 'NAAC A+', ranking: { nirf: 6, qs: 521, naacGrade: 'A+', nbaAccreditation: false }, country: 'India', state: 'Delhi', city: 'New Delhi', facilities: ['Central Library', 'Labs', 'Sports', 'Hostel'] },
];

const courses = [
  { name: 'B.Tech Computer Science and Engineering', degree: 'B.Tech', department: 'CSE', eligibility: 'JEE Advanced + 75% in 12th', duration: '4 Years', seats: 120, feeStructure: { tuitionFee: 220000 } },
  { name: 'B.Tech Artificial Intelligence', degree: 'B.Tech', department: 'CSE', eligibility: 'JEE Advanced + 75% in 12th', duration: '4 Years', seats: 60, feeStructure: { tuitionFee: 240000 } },
  { name: 'M.Tech Machine Learning', degree: 'M.Tech', department: 'CSE', eligibility: 'GATE + B.Tech', duration: '2 Years', seats: 45, feeStructure: { tuitionFee: 150000 } },
  { name: 'B.Sc. Computer Science', degree: 'B.Sc', department: 'Science', eligibility: '12th with PCM', duration: '3 Years', seats: 100, feeStructure: { tuitionFee: 50000 } },
  { name: 'MBA in Technology Management', degree: 'MBA', department: 'Management', eligibility: 'Graduation + CAT', duration: '2 Years', seats: 60, feeStructure: { tuitionFee: 350000 } },
];

const scholarships = [
  { name: 'National Merit Scholarship', provider: 'Government of India', amount: '₹50,000/year', description: 'Merit-based scholarship for top performers', eligibility: { minMarks: 90, maxIncome: 800000 }, deadline: new Date('2025-12-31'), category: 'Merit', documentChecklist: ['Marksheet', 'Income Certificate', 'ID Proof'] },
  { name: 'SC/ST Scholarship', provider: 'Ministry of Social Justice', amount: 'Full Tuition', description: 'Full tuition coverage for SC/ST students', eligibility: { category: 'SC/ST', maxIncome: 250000 }, deadline: new Date('2025-11-30'), category: 'Category', documentChecklist: ['Caste Certificate', 'Income Certificate'] },
  { name: 'Girl Child Education Fund', provider: 'Various NGOs', amount: '₹30,000/year', description: 'Supporting girl child education', eligibility: { gender: 'Female', maxIncome: 500000 }, deadline: new Date('2025-01-15'), category: 'Gender', documentChecklist: ['ID Proof', 'Income Certificate'] },
  { name: 'Sports Excellence Scholarship', provider: 'Sports Authority', amount: '₹75,000/year', description: 'For national level sports achievers', eligibility: { sports: true }, deadline: new Date('2025-12-15'), category: 'Sports', documentChecklist: ['Sports Certificate', 'ID Proof'] },
];

async function seed() {
  try {
    await connectDatabase();
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await University.deleteMany({});
    await Course.deleteMany({});
    await Scholarship.deleteMany({});

    const admin = await User.create({
      email: 'admin@edunavigator.com', password: 'admin123', name: 'Super Admin', role: 'admin', isVerified: true,
    });
    console.log('Admin created:', admin.email);

    const student = await User.create({
      email: 'student@example.com', password: 'student123', name: 'John Student', role: 'student', isVerified: true,
    });
    console.log('Student created:', student.email);

    for (const uniData of universities) {
      const uni = await University.create({ ...uniData, isVerified: true });
      for (const courseData of courses) {
        await Course.create({ ...courseData, universityId: uni._id });
      }
    }
    console.log('Universities seeded:', universities.length);

    for (const schData of scholarships) {
      await Scholarship.create(schData);
    }
    console.log('Scholarships seeded:', scholarships.length);

    console.log('\n✅ Database seeded successfully!');
    console.log('   Admin: admin@edunavigator.com / admin123');
    console.log('   Student: student@example.com / student123');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
