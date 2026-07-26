'use client';
import { motion } from 'framer-motion';

const reports = [
  { title: 'Admission Report', description: 'Detailed admission statistics across all universities', icon: '📋', color: 'bg-blue-50', type: 'PDF' },
  { title: 'Student Report', description: 'Student demographics and enrollment trends', icon: '👥', color: 'bg-green-50', type: 'PDF' },
  { title: 'University Report', description: 'University performance and rankings analysis', icon: '🏛️', color: 'bg-purple-50', type: 'PDF' },
  { title: 'Scholarship Report', description: 'Scholarship distribution and utilization', icon: '💰', color: 'bg-yellow-50', type: 'PDF' },
  { title: 'Placement Report', description: 'Placement statistics and salary trends', icon: '💼', color: 'bg-pink-50', type: 'PDF' },
  { title: 'Revenue Report', description: 'Platform revenue and financial analytics', icon: '📊', color: 'bg-orange-50', type: 'PDF' },
];

export default function ReportsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-2">Generate and download detailed reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="card"
            >
              <div className={`w-14 h-14 ${r.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {r.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{r.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{r.description}</p>
              <div className="flex space-x-2">
                <button className="btn-primary text-sm py-1.5 px-3 flex-1">Download {r.type}</button>
                <button className="btn-secondary text-sm py-1.5 px-3">CSV</button>
                <button className="btn-secondary text-sm py-1.5 px-3">Excel</button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
