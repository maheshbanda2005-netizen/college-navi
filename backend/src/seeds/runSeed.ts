import mongoose from 'mongoose';
import { config } from '../config';
import { connectDatabase } from '../config/database';
import { University } from '../models/University';
import { Course } from '../models/Course';
import { Placement } from '../models/Placement';
import { CampusImage } from '../models/CampusImage';
import { Hostel } from '../models/Hostel';
import { Faculty } from '../models/Faculty';
import { Cutoff } from '../models/Cutoff';
import { Scholarship } from '../models/Scholarship';
import { User } from '../models/User';

import { telanganaUniversities } from './telangana_universities';
import { telanganaEngineeringColleges } from './telangana_engineering';
import { telanganaPharmacyColleges } from './telangana_pharmacy';
import { telanganaPolytechnicColleges } from './telangana_polytechnic';
import { telanganaMBAMCAColleges } from './telangana_mba_mca';
import {
  engineeringCourseTemplates,
  universityCourseTemplates,
  pharmacyCourseTemplates,
  polytechnicCourseTemplates,
  mbaCourseTemplates,
  mcaCourseTemplates,
} from './telangana_courses';
import { placementData } from './telangana_placements';
import { campusImageData } from './telangana_images';
import { telanganaCutoffs } from './telangana_cutoffs';

function getCourseTemplates(collegeType: string) {
  if (collegeType === 'Pharmacy') return pharmacyCourseTemplates;
  if (collegeType === 'Polytechnic') return polytechnicCourseTemplates;
  if (collegeType === 'MBA/MCA') return mbaCourseTemplates;
  if (collegeType === 'University') return [...universityCourseTemplates, ...engineeringCourseTemplates.slice(0, 6)];
  return engineeringCourseTemplates;
}

async function seedTelangana() {
  try {
    await connectDatabase();
    console.log('Connected to MongoDB');

    // Clean existing data (but preserve users)
    await University.deleteMany({});
    await Course.deleteMany({});
    await Placement.deleteMany({});
    await CampusImage.deleteMany({});
    await Hostel.deleteMany({});
    await Faculty.deleteMany({});
    await Cutoff.deleteMany({});

    console.log('Cleaned existing data');

    // Create default users if they don't exist
    const adminExists = await User.findOne({ email: 'admin@edunavigator.com' });
    if (!adminExists) {
      await User.create({ email: 'admin@edunavigator.com', password: 'admin123', name: 'Super Admin', role: 'admin', isVerified: true });
      await User.create({ email: 'student@example.com', password: 'student123', name: 'John Student', role: 'student', isVerified: true });
      await User.create({ email: 'counselor@example.com', password: 'counselor123', name: 'Dr. Sharma', role: 'counselor', isVerified: true });
      console.log('Default users created');
    }

    // Combine all colleges
    const allColleges = [
      ...telanganaUniversities,
      ...telanganaEngineeringColleges,
      ...telanganaPharmacyColleges,
      ...telanganaPolytechnicColleges,
      ...telanganaMBAMCAColleges,
    ];

    console.log(`\nSeeding ${allColleges.length} Telangana colleges...`);

    let totalCourses = 0;
    let totalPlacements = 0;
    let totalImages = 0;

    for (const collegeData of allColleges) {
      // Create university record
      const university = await University.create(collegeData);
      const shortCode = university.shortName || university.collegeCode || university.name.substring(0, 6).toUpperCase();

      // Create courses
      const courseTemplates = getCourseTemplates(collegeData.collegeType);
      const coursePromises = courseTemplates.map(courseData =>
        Course.create({ ...courseData, universityId: university._id, name: `${courseData.name}`, isActive: true })
      );
      const createdCourses = await Promise.all(coursePromises);
      totalCourses += createdCourses.length;

      // Create placements
      const key = Object.keys(placementData).find(k =>
        shortCode.toUpperCase().includes(k) || k.includes(shortCode)
      );
      if (key && placementData[key]) {
        const placePromises = placementData[key].map(pd =>
          Placement.create({ ...pd, universityId: university._id })
        );
        const createdPlacements = await Promise.all(placePromises);
        totalPlacements += createdPlacements.length;
      }

      // Create campus images
      const imgKey = Object.keys(campusImageData).find(k =>
        shortCode.toUpperCase().includes(k) || k.includes(shortCode)
      );
      if (imgKey && campusImageData[imgKey]) {
        const imgPromises = campusImageData[imgKey].map(img =>
          CampusImage.create({ ...img, universityId: university._id })
        );
        const createdImages = await Promise.all(imgPromises);
        totalImages += createdImages.length;
      }

      // Create some sample hostel data for major colleges
      if (collegeData.facilities?.some(f => f.toLowerCase().includes('hostel'))) {
        await Hostel.create({
          universityId: university._id,
          name: 'Boys Hostel',
          type: 'boys',
          capacity: 500,
          feesPerYear: 60000,
          facilities: ['Mess', 'WiFi', 'Common Room', 'Study Room'],
          messAvailable: true,
          wifiAvailable: true,
        });
        await Hostel.create({
          universityId: university._id,
          name: 'Girls Hostel',
          type: 'girls',
          capacity: 300,
          feesPerYear: 55000,
          facilities: ['Mess', 'WiFi', 'Common Room'],
          messAvailable: true,
          wifiAvailable: true,
        });
      }

      console.log(`  ✓ ${university.name} (${shortCode}) - ${createdCourses.length} courses`);
    }

    // Create cutoff data for rank predictor
    console.log('\nSeeding cutoff data...');
    let totalCutoffs = 0;
    for (const cutoffData of telanganaCutoffs) {
      // Find the university by collegeCode or shortName
      const university = await University.findOne({
        $or: [
          { collegeCode: cutoffData.collegeCode },
          { shortName: { $regex: cutoffData.collegeCode, $options: 'i' } },
          { name: { $regex: cutoffData.collegeCode, $options: 'i' } },
        ],
      });
      if (university) {
        await Cutoff.create({
          universityId: university._id,
          course: cutoffData.course,
          degree: cutoffData.degree,
          department: cutoffData.department,
          year: cutoffData.year,
          round: 1,
          quota: 'General',
          category: cutoffData.category as any,
          gender: cutoffData.gender as any,
          closingRank: cutoffData.closingRank,
          openingRank: cutoffData.openingRank,
          examName: cutoffData.examName || 'TG EAPCET',
        });
        totalCutoffs++;
      }
    }
    console.log(`   Cutoff entries: ${totalCutoffs}`);

    // Create default scholarships
    await Scholarship.create([
      { name: 'National Merit Scholarship', provider: 'Government of India', amount: '₹50,000/year', description: 'Merit-based scholarship for top performers', eligibility: { minMarks: 90, maxIncome: 800000 }, deadline: new Date('2025-12-31'), category: 'Merit', documentChecklist: ['Marksheet', 'Income Certificate', 'ID Proof'], isActive: true },
      { name: 'SC/ST Scholarship', provider: 'Ministry of Social Justice', amount: 'Full Tuition', description: 'Full tuition coverage for SC/ST students', eligibility: { category: 'SC/ST', maxIncome: 250000 }, deadline: new Date('2025-11-30'), category: 'Category', documentChecklist: ['Caste Certificate', 'Income Certificate'], isActive: true },
      { name: 'Telangana State Post-Matric Scholarship', provider: 'TS Social Welfare', amount: '₹30,000/year', description: 'For SC/ST/OBC students in Telangana', eligibility: { state: 'Telangana', maxIncome: 200000 }, deadline: new Date('2025-10-31'), category: 'Category', documentChecklist: ['Caste Certificate', 'Income Certificate', 'Domicile'], isActive: true },
      { name: 'Girl Child Education Fund', provider: 'Various NGOs', amount: '₹30,000/year', description: 'Supporting girl child education', eligibility: { gender: 'Female', maxIncome: 500000 }, deadline: new Date('2025-01-15'), category: 'Gender', documentChecklist: ['ID Proof', 'Income Certificate'], isActive: true },
      { name: 'Sports Excellence Scholarship', provider: 'Sports Authority of India', amount: '₹75,000/year', description: 'For national level sports achievers', eligibility: { sports: true }, deadline: new Date('2025-12-15'), category: 'Sports', documentChecklist: ['Sports Certificate', 'ID Proof'], isActive: true },
      { name: 'Minority Community Scholarship', provider: 'Ministry of Minority Affairs', amount: '₹40,000/year', description: 'For students from minority communities', eligibility: { minorityStatus: true, maxIncome: 500000 }, deadline: new Date('2025-10-31'), category: 'Minority', documentChecklist: ['Community Certificate', 'Income Certificate'], isActive: true },
      { name: 'EAMCET Rank Holders Scholarship', provider: 'Govt of Telangana', amount: '₹25,000/year', description: 'For top rank holders in TG EAPCET', eligibility: { minMarks: 95 }, deadline: new Date('2025-09-30'), category: 'Merit', documentChecklist: ['EAPCET Rank Card', 'ID Proof'], isActive: true },
    ]);

    console.log(`\n✅ Telangana Seed Complete!`);
    console.log(`   Colleges: ${allColleges.length}`);
    console.log(`   Courses: ${totalCourses}`);
    console.log(`   Placements: ${totalPlacements}`);
    console.log(`   Campus Images: ${totalImages}`);
    console.log(`   Scholarships: 7`);
    console.log(`\n   Admin: admin@edunavigator.com / admin123`);
    console.log(`   Student: student@example.com / student123`);
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedTelangana();

