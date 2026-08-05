import mongoose from 'mongoose';
import { connectDatabase } from './config/database';
import { User } from './models/User';
import { University } from './models/University';
import { Course } from './models/Course';
import { Scholarship } from './models/Scholarship';
import { users, universities, courses, scholarships } from './seeds/initialSeed';

async function seed() {
  try {
    await connectDatabase();
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await University.deleteMany({});
    await Course.deleteMany({});
    await Scholarship.deleteMany({});

    for (const userData of users) {
      const user = await User.create(userData);
      console.log('User created:', user.email);
    }

    for (const uniData of universities) {
      const uni = await University.create(uniData);
      for (const courseData of courses) {
        await Course.create({ ...courseData, universityId: uni._id });
      }
    }
    console.log('Universities seeded:', universities.length);

    for (const schData of scholarships) {
      await Scholarship.create(schData);
    }
    console.log('Scholarships seeded:', scholarships.length);

    console.log('\nDatabase seeded successfully!');
    console.log('  Admin: admin@edunavigator.com / admin123');
    console.log('  Student: student@example.com / student123');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
