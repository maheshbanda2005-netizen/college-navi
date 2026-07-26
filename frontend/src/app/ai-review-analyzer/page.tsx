'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const reviews = [
  { college: 'IIT Hyderabad', avgRating: 4.8, totalReviews: 1250, sentiment: 92, positive: 1150, neutral: 80, negative: 20 },
  { college: 'IIIT Hyderabad', avgRating: 4.9, totalReviews: 980, sentiment: 95, positive: 931, neutral: 40, negative: 9 },
  { college: 'CBIT Hyderabad', avgRating: 4.5, totalReviews: 650, sentiment: 85, positive: 553, neutral: 80, negative: 17 },
  { college: 'VNR VJIET', avgRating: 4.4, totalReviews: 520, sentiment: 82, positive: 426, neutral: 80, negative: 14 },
];

const sentimentData = [
  { name: 'Positive', value: 85, color: '#10b981' },
  { name: 'Neutral', value: 10, color: '#f59e0b' },
  { name: 'Negative', value: 5, color: '#ef4444' },
];

const topicAnalysis = [
  { topic: 'Faculty Quality', score: 92 },
  { topic: 'Infrastructure', score: 88 },
  { topic: 'Placements', score: 95 },
  { topic: 'Campus Life', score: 85 },
  { topic: 'Hostel Facilities', score: 78 },
  { topic: 'Food Quality', score: 72 },
];

export default function AIReviewAnalyzerPage() {
  const [selectedCollege, setSelectedCollege] = useState('IIT Hyderabad');
  const college = reviews.find(r => r.college === selectedCollege)!;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Review Analyzer</h1>
        <p className="text-gray-600 mb-8">Sentiment analysis and review insights powered by AI</p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {reviews.map(r => (
            <motion.button
              key={r.college}
              onClick={() => setSelectedCollege(r.college)}
              whileHover={{ scale: 1.02 }}
              className={`card cursor-pointer transition-all ${selectedCollege === r.college ? 'ring-2 ring-primary-600 bg-primary-50' : ''}`}
            >
              <h3 className="font-semibold">{r.college}</h3>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-500">★ {r.avgRating}</div>
                  <div className="text-sm text-gray-600">{r.totalReviews} reviews</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{r.sentiment}%</div>
                  <div className="text-sm text-gray-600">Sentiment</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="font-semibold mb-4">{college.college} - Sentiment Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={sentimentData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Review Statistics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Positive Reviews</span>
                  <span className="font-bold text-green-600">{college.positive}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(college.positive / college.totalReviews) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Neutral Reviews</span>
                  <span className="font-bold text-yellow-600">{college.neutral}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${(college.neutral / college.totalReviews) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Negative Reviews</span>
                  <span className="font-bold text-red-600">{college.negative}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: `${(college.negative / college.totalReviews) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 card">
          <h3 className="font-semibold mb-4">Topic-wise Sentiment Score</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="topic" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" name="Sentiment Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
