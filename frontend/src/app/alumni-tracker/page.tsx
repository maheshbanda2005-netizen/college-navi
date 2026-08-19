'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const alumni = [
  { name: 'Rajesh Kumar', batch: 2015, branch: 'CSE', company: 'Google', position: 'Senior Engineer', package: 2.5, location: 'Bangalore', yearsExp: 8 },
  { name: 'Priya Sharma', batch: 2016, branch: 'CSE', company: 'Microsoft', position: 'Product Manager', package: 2.2, location: 'Hyderabad', yearsExp: 7 },
  { name: 'Arjun Singh', batch: 2014, branch: 'ECE', company: 'Goldman Sachs', position: 'VP', package: 3.0, location: 'Mumbai', yearsExp: 9 },
  { name: 'Neha Gupta', batch: 2017, branch: 'IT', company: 'Amazon', position: 'Senior Manager', package: 2.8, location: 'Bangalore', yearsExp: 6 },
  { name: 'Vikram Patel', batch: 2013, branch: 'ME', company: 'Tesla', position: 'Engineering Lead', package: 2.6, location: 'USA', yearsExp: 10 },
];

const companyDistribution = [
  { company: 'Google', count: 45 },
  { company: 'Microsoft', count: 38 },
  { company: 'Amazon', count: 42 },
  { company: 'Goldman Sachs', count: 28 },
  { company: 'McKinsey', count: 22 },
  { company: 'Others', count: 125 },
];

const salaryGrowth = [
  { year: 0, salary: 0.8 },
  { year: 2, salary: 1.2 },
  { year: 4, salary: 1.8 },
  { year: 6, salary: 2.3 },
  { year: 8, salary: 2.8 },
  { year: 10, salary: 3.5 },
];

export default function AlumniTrackerPage() {
  const [selectedAlumni, setSelectedAlumni] = useState(0);
  const alumnus = alumni[selectedAlumni];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Tracker</h1>
        <p className="text-gray-600 mb-8">Track successful alumni and their career paths</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {alumni.map((a, i) => (
            <motion.button
              key={i}
              onClick={() => setSelectedAlumni(i)}
              whileHover={{ scale: 1.02 }}
              className={`card cursor-pointer transition-all ${selectedAlumni === i ? 'ring-2 ring-primary-600 bg-primary-50' : ''}`}
            >
              <h3 className="font-semibold">{a.name}</h3>
              <div className="mt-2 space-y-1 text-sm">
                <div className="text-gray-600">Batch {a.batch}</div>
                <div className="font-bold text-primary-600">{a.company}</div>
                <div className="text-gray-600">{a.position}</div>
                <div className="font-bold text-green-600">₹{a.package}Cr</div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="font-semibold mb-4">{alumnus.name} - Profile</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Batch</span>
                <span className="font-bold">{alumnus.batch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Branch</span>
                <span className="font-bold">{alumnus.branch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Company</span>
                <span className="font-bold text-primary-600">{alumnus.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Position</span>
                <span className="font-bold">{alumnus.position}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Package</span>
                <span className="font-bold text-green-600">₹{alumnus.package}Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location</span>
                <span className="font-bold">{alumnus.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Years of Experience</span>
                <span className="font-bold">{alumnus.yearsExp} years</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Alumni Statistics</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Alumni</div>
                <div className="text-3xl font-bold text-primary-600">2,500+</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Avg Package</div>
                <div className="text-3xl font-bold text-green-600">₹2.2Cr</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Top Companies</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Google', 'Microsoft', 'Amazon', 'Goldman Sachs'].map(c => (
                    <span key={c} className="badge bg-secondary-100 text-secondary-800 border border-secondary-200">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 card">
          <h3 className="font-semibold mb-4">Company Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={companyDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="company" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" name="Alumni Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 card">
          <h3 className="font-semibold mb-4">Salary Growth Trajectory</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salaryGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: 'Years of Experience', position: 'insideBottomRight', offset: -5 }} />
              <YAxis label={{ value: 'Salary (Cr)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="salary" fill="#10b981" name="Average Salary" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
