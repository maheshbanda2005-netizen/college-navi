'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const seatData = [
  { college: 'IIT Hyderabad', totalSeats: 450, filledSeats: 380, availableSeats: 70, cutoffRank: 2500, trend: 'down' },
  { college: 'IIIT Hyderabad', totalSeats: 400, filledSeats: 350, availableSeats: 50, cutoffRank: 1800, trend: 'down' },
  { college: 'CBIT Hyderabad', totalSeats: 350, filledSeats: 280, availableSeats: 70, cutoffRank: 5500, trend: 'stable' },
  { college: 'VNR VJIET', totalSeats: 300, filledSeats: 220, availableSeats: 80, cutoffRank: 6000, trend: 'up' },
];

const categorySeats = [
  { category: 'General', total: 450, filled: 380, available: 70 },
  { category: 'OBC', total: 150, filled: 120, available: 30 },
  { category: 'SC', total: 100, filled: 85, available: 15 },
  { category: 'ST', total: 50, filled: 40, available: 10 },
];

export default function LiveSeatPredictorPage() {
  const [selectedCollege, setSelectedCollege] = useState('IIT Hyderabad');
  const college = seatData.find(c => c.college === selectedCollege)!;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Seat Predictor</h1>
        <p className="text-gray-600 mb-8">Real-time seat availability and cutoff predictions</p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {seatData.map(c => (
            <motion.button
              key={c.college}
              onClick={() => setSelectedCollege(c.college)}
              whileHover={{ scale: 1.02 }}
              className={`card cursor-pointer transition-all ${selectedCollege === c.college ? 'ring-2 ring-primary-600 bg-primary-50' : ''}`}
            >
              <h3 className="font-semibold">{c.college}</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Available Seats</span>
                  <span className="font-bold text-green-600">{c.availableSeats}/{c.totalSeats}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cutoff Rank</span>
                  <span className="font-bold">{c.cutoffRank}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trend</span>
                  <span className={`font-bold ${c.trend === 'down' ? 'text-green-600' : c.trend === 'up' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {c.trend === 'down' ? '↓ Decreasing' : c.trend === 'up' ? '↑ Increasing' : '→ Stable'}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="font-semibold mb-4">{college.college} - Seat Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Total Seats</span>
                  <span className="font-bold">{college.totalSeats}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${(college.filledSeats / college.totalSeats) * 100}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold text-blue-700">{college.filledSeats}</div>
                  <div className="text-xs text-gray-600">Filled</div>
                </div>
                <div className="bg-green-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold text-green-700">{college.availableSeats}</div>
                  <div className="text-xs text-gray-600">Available</div>
                </div>
                <div className="bg-purple-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold text-purple-700">{Math.round((college.filledSeats / college.totalSeats) * 100)}%</div>
                  <div className="text-xs text-gray-600">Filled %</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Category-wise Seats</h3>
            <div className="space-y-3">
              {categorySeats.map(cat => (
                <div key={cat.category}>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>{cat.category}</span>
                    <span className="font-bold">{cat.available}/{cat.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${(cat.filled / cat.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 card">
          <h3 className="font-semibold mb-4">Seat Availability Across Colleges</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={seatData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="college" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="availableSeats" fill="#10b981" name="Available" />
              <Bar dataKey="filledSeats" fill="#3b82f6" name="Filled" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
