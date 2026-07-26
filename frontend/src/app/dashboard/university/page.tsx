'use client';
import { motion } from 'framer-motion';

export default function UniversityDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">University Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your institution profile, courses, and admissions</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Applications', value: '234', change: '+15%', icon: '📋' },
            { label: 'Admitted', value: '89', change: '+8%', icon: '✅' },
            { label: 'Revenue', value: '₹45.6L', change: '+12%', icon: '💰' },
            { label: 'Student Queries', value: '45', change: '-5%', icon: '💬' },
          ].map((s) => (
            <div key={s.label} className="card text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
              <div className={`text-xs font-medium ${s.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{s.change}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-semibold text-lg mb-4">Recent Applications</h3>
            <div className="space-y-3">
              {[
                { name: 'Rahul Sharma', course: 'B.Tech CSE', status: 'Under Review' },
                { name: 'Priya Patel', course: 'M.Tech AI', status: 'Document Verification' },
                { name: 'Amit Singh', course: 'MBA', status: 'Interview Scheduled' },
              ].map((a) => (
                <div key={a.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm text-gray-900">{a.name}</div>
                    <div className="text-xs text-gray-500">{a.course}</div>
                  </div>
                  <span className="badge badge-primary text-xs">{a.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Update Profile', 'Add Course', 'View Analytics', 'Manage Admissions'].map((action) => (
                <button key={action} className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all">
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
