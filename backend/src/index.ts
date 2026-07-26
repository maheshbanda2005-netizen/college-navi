import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import rateLimit from 'express-rate-limit';
import { authenticate } from './middleware/auth';
import { config } from './config';
import { connectDatabase } from './config/database';
import authRoutes from './routes/authRoutes';
import universityRoutes from './routes/universityRoutes';
import aiRoutes from './routes/aiRoutes';
import applicationRoutes from './routes/applicationRoutes';
import adminRoutes from './routes/adminRoutes';
import reviewRoutes from './routes/reviewRoutes';
import notificationRoutes from './routes/notificationRoutes';
import { compareUniversities } from './controllers/comparisonController';

const app = express();
const httpServer = createServer(app);

const io = new SocketServer(httpServer, {
  cors: { origin: config.CORS_ORIGIN, methods: ['GET', 'POST'] },
});

app.use(helmet());
app.use(cors({ origin: config.CORS_ORIGIN, credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/notifications', notificationRoutes);
app.post('/api/comparison/compare', authenticate, compareUniversities);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'EduNavigator AI API is running', timestamp: new Date().toISOString() });
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('join', (userId: string) => {
    socket.join(userId);
  });
  socket.on('send-message', (data: { senderId: string; receiverId: string; content: string }) => {
    io.to(data.receiverId).emit('receive-message', data);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

async function seedIfEmpty() {
  const { User } = await import('./models/User');
  const { University } = await import('./models/University');
  const { Course } = await import('./models/Course');
  const { Scholarship } = await import('./models/Scholarship');

  const count = await User.countDocuments();
  if (count > 0) return;

  console.log('Seeding initial data...');

  await User.create({ email: 'admin@edunavigator.com', password: 'admin123', name: 'Super Admin', role: 'admin', isVerified: true });
  await User.create({ email: 'student@example.com', password: 'student123', name: 'John Student', role: 'student', isVerified: true });
  await User.create({ email: 'counselor@example.com', password: 'counselor123', name: 'Dr. Sharma', role: 'counselor', isVerified: true });
  await User.create({ email: 'parent@example.com', password: 'parent123', name: 'Ramesh Kumar', role: 'parent', isVerified: true });

  const universities = [
    { name: 'Indian Institute of Technology Bombay', description: 'Premier engineering institute known for academic excellence and research.', establishmentYear: 1958, ownership: 'Government', accreditation: 'NAAC A++', ranking: { nirf: 1, qs: 172, naacGrade: 'A++', nbaAccreditation: true }, country: 'India', state: 'Maharashtra', city: 'Mumbai', facilities: ['Central Library', 'Advanced Labs', 'Sports Complex', 'WiFi Campus', 'Medical Center'], isVerified: true },
    { name: 'Indian Institute of Technology Delhi', description: 'Leading technical institute with world-class research and innovation.', establishmentYear: 1961, ownership: 'Government', accreditation: 'NAAC A++', ranking: { nirf: 2, qs: 197, naacGrade: 'A++', nbaAccreditation: true }, country: 'India', state: 'Delhi', city: 'New Delhi', facilities: ['Digital Library', 'Research Centers', 'Sports Stadium', 'Smart Classrooms'], isVerified: true },
    { name: 'National Institute of Technology Trichy', description: 'Premier NIT with excellent placement record and infrastructure.', establishmentYear: 1964, ownership: 'Government', accreditation: 'NAAC A+', ranking: { nirf: 3, qs: 801, naacGrade: 'A+', nbaAccreditation: true }, country: 'India', state: 'Tamil Nadu', city: 'Tiruchirappalli', facilities: ['Central Library', 'WiFi Campus', 'Hostel', 'Sports Complex'], isVerified: true },
    { name: 'BITS Pilani', description: 'Deemed university with strong industry connections and innovative curriculum.', establishmentYear: 1964, ownership: 'Private', accreditation: 'NAAC A+', ranking: { nirf: 4, qs: 1000, naacGrade: 'A+', nbaAccreditation: true }, country: 'India', state: 'Rajasthan', city: 'Pilani', facilities: ['Library', 'Labs', 'Sports', 'Hostel'], isVerified: true },
    { name: 'Indian Institute of Technology Kharagpur', description: 'Largest IIT campus with diverse academic programs and research.', establishmentYear: 1951, ownership: 'Government', accreditation: 'NAAC A++', ranking: { nirf: 5, qs: 271, naacGrade: 'A++', nbaAccreditation: true }, country: 'India', state: 'West Bengal', city: 'Kharagpur', facilities: ['Central Library', 'Research Park', 'Sports Stadium', 'Medical'], isVerified: true },
    { name: 'University of Delhi', description: 'Central university with rich academic tradition and diverse programs.', establishmentYear: 1922, ownership: 'Government', accreditation: 'NAAC A+', ranking: { nirf: 6, qs: 521, naacGrade: 'A+', nbaAccreditation: false }, country: 'India', state: 'Delhi', city: 'New Delhi', facilities: ['Central Library', 'Labs', 'Sports', 'Hostel'], isVerified: true },
    { name: 'Vellore Institute of Technology', description: 'Top private university with strong placements and global exposure.', establishmentYear: 1984, ownership: 'Private', accreditation: 'NAAC A++', ranking: { nirf: 7, qs: 801, naacGrade: 'A++', nbaAccreditation: true }, country: 'India', state: 'Tamil Nadu', city: 'Vellore', facilities: ['Smart Library', 'Innovation Labs', 'Sports Arena', 'Hostel'], isVerified: true },
    { name: 'Indian Institute of Technology Madras', description: 'Top-ranked IIT with outstanding research output and industry ties.', establishmentYear: 1959, ownership: 'Government', accreditation: 'NAAC A++', ranking: { nirf: 1, qs: 227, naacGrade: 'A++', nbaAccreditation: true }, country: 'India', state: 'Tamil Nadu', city: 'Chennai', facilities: ['Central Library', 'Research Park', 'Olympic Pool', 'WiFi Campus'], isVerified: true },
  ];

  const courses = [
    { name: 'B.Tech Computer Science and Engineering', degree: 'B.Tech', department: 'CSE', eligibility: 'JEE Advanced + 75% in 12th', duration: '4 Years', seats: 120, feeStructure: { tuitionFee: 220000 } },
    { name: 'B.Tech Artificial Intelligence', degree: 'B.Tech', department: 'CSE', eligibility: 'JEE Advanced + 75% in 12th', duration: '4 Years', seats: 60, feeStructure: { tuitionFee: 240000 } },
    { name: 'M.Tech Machine Learning', degree: 'M.Tech', department: 'CSE', eligibility: 'GATE + B.Tech', duration: '2 Years', seats: 45, feeStructure: { tuitionFee: 150000 } },
    { name: 'B.Sc. Computer Science', degree: 'B.Sc', department: 'Science', eligibility: '12th with PCM', duration: '3 Years', seats: 100, feeStructure: { tuitionFee: 50000 } },
    { name: 'MBA in Technology Management', degree: 'MBA', department: 'Management', eligibility: 'Graduation + CAT', duration: '2 Years', seats: 60, feeStructure: { tuitionFee: 350000 } },
  ];

  for (const uniData of universities) {
    const uni = await University.create(uniData);
    for (const courseData of courses) {
      await Course.create({ ...courseData, universityId: uni._id });
    }
  }

  await Scholarship.create({ name: 'National Merit Scholarship', provider: 'Government of India', amount: '₹50,000/year', description: 'Merit-based scholarship for top performers', eligibility: { minMarks: 90, maxIncome: 800000 }, deadline: new Date('2025-12-31'), category: 'Merit', documentChecklist: ['Marksheet', 'Income Certificate', 'ID Proof'], isActive: true });
  await Scholarship.create({ name: 'SC/ST Scholarship', provider: 'Ministry of Social Justice', amount: 'Full Tuition', description: 'Full tuition coverage for SC/ST students', eligibility: { category: 'SC/ST', maxIncome: 250000 }, deadline: new Date('2025-11-30'), category: 'Category', documentChecklist: ['Caste Certificate', 'Income Certificate'], isActive: true });
  await Scholarship.create({ name: 'Girl Child Education Fund', provider: 'Various NGOs', amount: '₹30,000/year', description: 'Supporting girl child education', eligibility: { gender: 'Female', maxIncome: 500000 }, deadline: new Date('2025-01-15'), category: 'Gender', documentChecklist: ['ID Proof', 'Income Certificate'], isActive: true });
  await Scholarship.create({ name: 'Sports Excellence Scholarship', provider: 'Sports Authority of India', amount: '₹75,000/year', description: 'For national level sports achievers', eligibility: { sports: true }, deadline: new Date('2025-12-15'), category: 'Sports', documentChecklist: ['Sports Certificate', 'ID Proof'], isActive: true });
  await Scholarship.create({ name: 'Minority Community Scholarship', provider: 'Ministry of Minority Affairs', amount: '₹40,000/year', description: 'For students from minority communities', eligibility: { minorityStatus: true, maxIncome: 500000 }, deadline: new Date('2025-10-31'), category: 'Minority', documentChecklist: ['Community Certificate', 'Income Certificate'], isActive: true });
  await Scholarship.create({ name: 'Disability Support Scholarship', provider: 'Social Welfare Department', amount: '₹60,000/year', description: 'Supporting differently-abled students', eligibility: { disability: true, maxIncome: 800000 }, deadline: new Date('2025-02-28'), category: 'Disability', documentChecklist: ['Disability Certificate', 'ID Proof'], isActive: true });

  console.log('✅ Seed data loaded — admin@edunavigator.com / admin123 | student@example.com / student123');
}

async function start() {
  try {
    await connectDatabase();
    await seedIfEmpty();
    httpServer.listen(config.PORT, () => {
      console.log(`EduNavigator AI Backend running on port ${config.PORT}`);
      console.log(`Health check: http://localhost:${config.PORT}/api/health`);
      console.log(`Frontend:     http://localhost:3000`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();

export default app;
