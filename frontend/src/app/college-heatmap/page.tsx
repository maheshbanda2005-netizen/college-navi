'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const collegeHeatData = [
  { name: 'IIT Hyderabad', placement: 96, package: 24, aiScore: 92, students: 8000, x: 92, y: 96 },
  { name: 'IIIT Hyderabad', placement: 98, package: 28, aiScore: 95, students: 6000, x: 95, y: 98 },
  { name: 'CBIT Hyderabad', placement: 88, package: 18, aiScore: 82, students: 5000, x: 82, y: 88 },
  { name: 'VNR VJIET', placement: 85, package: 17, aiScore: 80, students: 4500, x: 80, y: 85 },
  { name: 'GRIET Hyderabad', placement: 82, package: 16, aiScore: 78, students: 4000, x: 78, y: 82 },
  { name: 'Osmania University', placement: 65, package: 12, aiScore: 72, students: 12000, x: 72, y: 65 },
];

const performanceMetrics = [
  { metric: 'Placement Rate', avg: 86, best: 'IIIT Hyderabad', worst: 'Osmania University' },
  { metric: 'Avg Package', avg: 19, best: 'IIIT Hyderabad', worst: 'Osmania University' },
  { metric: 'AI Score', avg: 83, best: 'IIIT Hyderabad', worst: 'Osmania University' },
];

export default function CollegeHeatMapPage() {
  const [selectedMetric, setSelectedMetric] = useState('placement');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">College Heat Map</h1>
        <p className="text-gray-600 mb-8">Visualize college performance across multiple metrics</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {collegeHeatData.map(college => (
            <motion.div key={college.name} whileHover={{ scale: 1.05 }} className="card">
              <h3 className="font-semibold text-gray-900">{college.name}</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Placement</span>
                  <span className="font-bold text-green-600">{college.placement}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Package</span>
                  <span className="font-bold text-blue-600">₹{college.package}L</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Score</span>
                  <span className="font-bold text-purple-600">{college.aiScore}</span>
                </div>
                <div className="flex justify-between">
                  <span>Students</span>
                  <span className="font-bold">{college.students.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="card mb-8">
          <h3 className="font-semibold mb-4">Performance Scatter Plot</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" name="AI Score" />
              <YAxis dataKey="y" name="Placement %" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Colleges" data={collegeHeatData} fill="#3b82f6" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {performanceMetrics.map(metric => (
            <div key={metric.metric} className="card">
              <h4 className="font-semibold mb-3">{metric.metric}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Average</span>
                  <span className="font-bold text-primary-600">{metric.avg}</span>
                </div>
                <div className="flex justify-between">
                  <span>Best</span>
                  <span className="font-bold text-green-600">{metric.best}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lowest</span>
                  <span className="font-bold text-red-600">{metric.worst}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
