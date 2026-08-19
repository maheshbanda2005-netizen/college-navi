'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const applications = [
  { id: 1, university: 'IIT Bombay', course: 'B.Tech CSE', status: 'Under Review', date: '2024-12-15', color: 'bg-yellow-100 text-yellow-800' },
  { id: 2, university: 'NIT Trichy', course: 'B.Tech CSE', status: 'Document Verification', date: '2024-12-10', color: 'bg-blue-100 text-blue-800' },
  { id: 3, university: 'IIT Delhi', course: 'M.Tech AI', status: 'Selected', date: '2024-11-28', color: 'bg-green-100 text-green-800' },
];

const savedUniversities = [
  { id: 1, name: 'IIT Bombay', match: '95%', chance: '85%' },
  { id: 2, name: 'IIT Delhi', match: '92%', chance: '78%' },
  { id: 3, name: 'NIT Trichy', match: '88%', chance: '92%' },
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back, John! Track your applications and recommendations</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Link href="/mock-tests" className="btn-accent text-sm">📝 Mock Tests</Link>
            <Link href="/universities" className="btn-primary text-sm">Browse Universities</Link>
            <Link href="/chatbot" className="btn-secondary text-sm">AI Counselor</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Saved Universities', value: '12', icon: '🏛️', color: 'bg-primary-50' },
            { label: 'Applications', value: '3', icon: '📋', color: 'bg-blue-50' },
            { label: 'Scholarships', value: '5', icon: '💰', color: 'bg-green-50' },
            { label: 'AI Suggestions', value: '8', icon: '🤖', color: 'bg-purple-50' },
          ].map((s) => (
            <div key={s.label} className={`${s.color} rounded-xl p-4`}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {['overview', 'applications', 'saved', 'scholarships', 'notifications'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-semibold text-lg mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                {savedUniversities.map((u) => (
                  <div key={u.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{u.name}</div>
                      <div className="text-sm text-gray-500">Match: {u.match}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">{u.chance}</div>
                      <div className="text-xs text-gray-500">Admit Chance</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/universities" className="text-primary-600 text-sm font-medium mt-3 inline-block">View all recommendations →</Link>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                {[
                  { event: 'JEE Advanced 2025 Registration', date: '2025-03-15', days: '45 days left' },
                  { event: 'IIT Bombay Admission Deadline', date: '2025-04-30', days: '90 days left' },
                  { event: 'Scholarship Application End', date: '2025-02-28', days: '15 days left' },
                ].map((d) => (
                  <div key={d.event} className="flex items-center justify-between p-3 bg-accent-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{d.event}</div>
                      <div className="text-xs text-gray-500">{d.date}</div>
                    </div>
                    <span className="badge-warning text-xs">{d.days}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="card flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{app.university}</h3>
                  <p className="text-sm text-gray-500">{app.course} • Applied {app.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`badge ${app.color}`}>{app.status}</span>
                  <button className="btn-secondary text-sm py-1.5 px-3">Track</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="grid md:grid-cols-3 gap-4">
            {savedUniversities.map((u) => (
              <div key={u.id} className="card text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary-700 mx-auto mb-3">
                  {u.name.charAt(0)}
                </div>
                <h3 className="font-semibold">{u.name}</h3>
                <p className="text-sm text-gray-500">Match: {u.match} | Chance: {u.chance}</p>
                <Link href={`/universities/${u.id}`} className="btn-primary text-sm mt-3 inline-block">View Details</Link>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'scholarships' && (
          <div className="card text-center py-12">
            <p className="text-gray-500">View your matched scholarships in the <Link href="/scholarships" className="text-primary-600 font-medium">Scholarships</Link> page</p>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="card text-center py-12">
            <p className="text-gray-500">No new notifications</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
