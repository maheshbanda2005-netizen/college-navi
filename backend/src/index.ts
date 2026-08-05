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
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import universityRoutes from './routes/universityRoutes';
import aiRoutes from './routes/aiRoutes';
import applicationRoutes from './routes/applicationRoutes';
import adminRoutes from './routes/adminRoutes';
import reviewRoutes from './routes/reviewRoutes';
import notificationRoutes from './routes/notificationRoutes';
import scholarshipRoutes from './routes/scholarshipRoutes';
import comparisonRoutes from './routes/comparisonRoutes';
import { seedIfEmpty } from './seeds/initialSeed';

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
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/comparison', authenticate, comparisonRoutes);

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

app.use(notFoundHandler);
app.use(errorHandler);

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
