'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const branchData = [
  { branch: 'CSE', placement: 100, avgPackage: 28, cutoff: 2500, demand: 95, salary5yr: 150, skills: ['Python', 'Java', 'ML', 'Cloud'] },
  { branch: 'ECE', placement: 95, avgPackage: 22, cutoff: 3200, demand: 85, salary5yr: 110, skills: ['VLSI', 'Embedded', 'Signal Processing'] },
  { branch: 'ME', placement: 92, avgPackage: 20, cutoff: 3800, demand: 75, salary5yr: 100, skills: ['CAD', 'Thermal', 'Manufacturing'] },
  { branch: 'CE', placement: 88, avgPackage: 18, cutoff: 4200, demand: 65, salary5yr: 90, skills: ['Structural', 'Surveying', 'BIM'] },
  { branch: 'IT', placement: 98, avgPackage: 26, cutoff: 2800, demand: 90, salary5yr: 130, skills: ['Web Dev', 'Database', 'Networks'] },
];

const radarData = [
  { category: 'Placement', CSE: 100, ECE: 95, ME: 92, CE: 88, IT: 98 },
  { category: 'Package', CSE: 28, ECE: 22, ME: 20, CE: 18, IT: 26 },
  { category: 'Demand', CSE: 95, ECE: 85, ME: 75, CE: 65, IT: 90 },
  { category: 'Growth', CSE: 95, ECE: 80, ME: 70, CE: 60, IT: 92 },
];

export default function BranchPredictorPage() {
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const branch = branchData.find(b => b.branch === selectedBranch)!;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Branch Predictor</h1>
        <p className="text-gray-600 mb-8">AI-powered branch selection based on placement & career growth</p>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {branchData.map(b => (
            <motion.button
              key={b.branch}
              onClick={() => setSelectedBranch(b.branch)}
              whileHover={{ scale: 1.05 }}
              className={`card cursor-pointer transition-all ${selectedBranch === b.branch ? 'ring-2 ring-primary-600 bg-primary-50' : ''}`}
            >
              <div className="text-center">
                <h3 className="font-bold text-lg">{b.branch}</h3>
                <div className="text-2xl font-bold text-green-600 mt-2">₹{b.avgPackage}L</div>
                <div className="text-sm text-gray-600">{b.placement}% placement</div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-semibold mb-4">{branch.branch} - Key Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Placement Rate</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${branch.placement}%` }} />
                    </div>
                    <span className="font-bold">{branch.placement}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Avg Package</span>
                  <span className="font-bold text-green-600">₹{branch.avgPackage} LPA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cutoff Rank</span>
                  <span className="font-bold">{branch.cutoff}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Market Demand</span>
                  <span className="font-bold text-blue-600">{branch.demand}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>5-Year Salary</span>
                  <span className="font-bold text-purple-600">₹{branch.salary5yr}L</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold mb-3">Key Skills</h3>
              <div className="flex flex-wrap gap-2">
                {branch.skills.map(skill => (
                  <span key={skill} className="badge bg-blue-50 text-blue-700 border border-blue-200">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Branch Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={branchData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branch" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgPackage" fill="#10b981" name="Avg Package" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-8 card">
          <h3 className="font-semibold mb-4">Multi-Factor Analysis</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis />
              <Radar name="CSE" dataKey="CSE" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
              <Radar name="IT" dataKey="IT" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
              <Radar name="ECE" dataKey="ECE" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
