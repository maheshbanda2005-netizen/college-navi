'use client';
import { motion } from 'framer-motion';

const applications = [
  { id: 'APP001', university: 'Indian Institute of Technology Bombay', course: 'B.Tech Computer Science', status: 'Under Review', date: '2024-12-15', color: 'bg-yellow-100 text-yellow-800', progress: 60 },
  { id: 'APP002', university: 'National Institute of Technology Trichy', course: 'B.Tech Artificial Intelligence', status: 'Document Verification', date: '2024-12-10', color: 'bg-blue-100 text-blue-800', progress: 40 },
  { id: 'APP003', university: 'Delhi University', course: 'B.Sc. Computer Science', status: 'Admitted', date: '2024-11-28', color: 'bg-green-100 text-green-800', progress: 100 },
];

const statusFlow = ['Submitted', 'Document Verification', 'Review', 'Interview', 'Selected', 'Admitted'];

export default function ApplicationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
            <p className="text-gray-600 mt-1">Track your university application status</p>
          </div>
          <button className="btn-primary" onClick={() => window.location.href = '/universities'}>Apply to More</button>
        </div>

        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="card">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{app.university}</h3>
                    <span className={`badge ${app.color}`}>{app.status}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{app.course} • Applied {app.date}</p>
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">App ID: {app.id}</div>
              </div>

              <div className="flex items-center space-x-1 mb-4">
                {statusFlow.map((step, i) => {
                  const currentIdx = statusFlow.indexOf(app.status);
                  const isCompleted = i < currentIdx;
                  const isCurrent = i === currentIdx;
                  return (
                    <div key={step} className="flex-1 flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        isCompleted ? 'bg-green-500 text-white' : isCurrent ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {isCompleted ? '✓' : i + 1}
                      </div>
                      {i < statusFlow.length - 1 && (
                        <div className={`flex-1 h-1 mx-1 rounded ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-primary-300' : 'bg-gray-200'}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                  <button className="btn-secondary text-sm py-1.5 px-3">Upload Document</button>
                  <button className="btn-secondary text-sm py-1.5 px-3">View Details</button>
                </div>
                <button className="btn-primary text-sm py-1.5 px-3">Track Status</button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
