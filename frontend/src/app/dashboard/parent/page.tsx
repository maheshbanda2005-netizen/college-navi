'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const expenseData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 48000 },
  { month: 'Mar', amount: 52000 },
  { month: 'Apr', amount: 47000 },
  { month: 'May', amount: 55000 },
  { month: 'Jun', amount: 50000 },
];

const applications = [
  { uni: 'IIT Bombay', course: 'B.Tech CSE', status: 'Under Review', date: 'Dec 15', fees: '₹2.2L/yr' },
  { uni: 'NIT Trichy', course: 'B.Tech AI', status: 'Documents Pending', date: 'Dec 10', fees: '₹1.5L/yr' },
  { uni: 'Delhi University', course: 'B.Sc CS', status: 'Admitted', date: 'Nov 28', fees: '₹50K/yr' },
];

const scholarships = [
  { name: 'National Merit Scholarship', amount: '₹50,000/yr', status: 'Applied', deadline: 'Dec 31' },
  { name: 'Girl Child Education Fund', amount: '₹30,000/yr', status: 'Eligible', deadline: 'Jan 15' },
  { name: 'State Merit Award', amount: '₹25,000/yr', status: 'Pending', deadline: 'Feb 28' },
];

const timeline = [
  { event: 'JEE Advanced Registration', date: 'Mar 15, 2025', status: 'upcoming', daysLeft: 45 },
  { event: 'IIT Bombay Admission Deadline', date: 'Apr 30, 2025', status: 'upcoming', daysLeft: 90 },
  { event: 'Scholarship Application End', date: 'Dec 31, 2024', status: 'urgent', daysLeft: 15 },
  { event: 'NIT Counselling Round 1', date: 'Jun 15, 2025', status: 'upcoming', daysLeft: 156 },
];

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const totalFees = 620000;
  const scholarshipAmount = 150000;
  const netCost = totalFees - scholarshipAmount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
            <p className="text-gray-600">Monitor your child's education journey</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Link href="/compare" className="btn-primary text-sm">Compare Colleges</Link>
            <Link href="/scholarships" className="btn-secondary text-sm">Find Scholarships</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Applications Tracked', value: '3', icon: '📋', color: 'bg-blue-50' },
            { label: 'Universities Shortlisted', value: '8', icon: '🏛️', color: 'bg-primary-50' },
            { label: 'Scholarships Found', value: '5', icon: '💰', color: 'bg-green-50' },
            { label: 'Net Estimated Cost', value: '₹4.7L', icon: '💳', color: 'bg-yellow-50' },
          ].map(s => (
            <div key={s.label} className={`${s.color} rounded-xl p-4`}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {['overview', 'applications', 'financial', 'timeline'].map(tab => (
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
              <h3 className="font-semibold text-lg mb-4">Application Progress</h3>
              <div className="space-y-4">
                {applications.map(a => (
                  <div key={a.uni} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{a.uni}</div>
                      <div className="text-xs text-gray-500">{a.course} • {a.date}</div>
                    </div>
                    <span className={`badge text-xs ${a.status === 'Admitted' ? 'badge-success' : a.status === 'Documents Pending' ? 'badge-warning' : 'badge-primary'}`}>
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg mb-4">Scholarship Status</h3>
              <div className="space-y-3">
                {scholarships.map(s => (
                  <div key={s.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{s.name}</div>
                      <div className="text-xs text-gray-500">{s.amount} • Deadline: {s.deadline}</div>
                    </div>
                    <span className={`badge text-xs ${s.status === 'Applied' ? 'badge-primary' : s.status === 'Eligible' ? 'badge-success' : 'badge-warning'}`}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-4">
            {applications.map(a => (
              <div key={a.uni} className="card">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{a.uni}</h3>
                    <p className="text-sm text-gray-500">{a.course} • Applied {a.date} • Fees: {a.fees}</p>
                  </div>
                  <div className="flex items-center space-x-3 mt-3 md:mt-0">
                    <span className={`badge ${a.status === 'Admitted' ? 'badge-success' : a.status === 'Documents Pending' ? 'badge-warning' : 'badge-primary'}`}>
                      {a.status}
                    </span>
                    <button onClick={() => toast.success('Opening application details...')} className="btn-secondary text-sm py-1.5 px-3">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-semibold text-lg mb-4">Financial Summary</h3>
              <div className="space-y-3">
                {[
                  { item: 'Total Tuition Fees', amount: `₹${(totalFees / 100000).toFixed(1)}L`, color: 'text-gray-900' },
                  { item: 'Hostel & Living', amount: '₹1.8L', color: 'text-gray-900' },
                  { item: 'Other Expenses', amount: '₹0.5L', color: 'text-gray-900' },
                  { item: 'Scholarships Expected', amount: `-₹${(scholarshipAmount / 100000).toFixed(1)}L`, color: 'text-green-600' },
                  { item: 'Net Estimated Cost', amount: `₹${(netCost / 100000).toFixed(1)}L`, color: 'text-primary-700', highlight: true },
                ].map(f => (
                  <div key={f.item} className={`flex justify-between items-center ${f.highlight ? 'p-3 bg-primary-50 rounded-lg border border-primary-200' : ''}`}>
                    <span className={`text-sm ${f.highlight ? 'font-semibold text-primary-800' : 'text-gray-600'}`}>{f.item}</span>
                    <span className={`text-sm font-bold ${f.color}`}>{f.amount}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button onClick={() => toast.success('Financial plan exported!')} className="btn-secondary text-sm w-full">
                  Export Financial Plan
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg mb-4">Monthly Expense Trend</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={expenseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${v / 1000}K`} />
                  <Tooltip formatter={(v: any) => [`₹${v.toLocaleString()}`, 'Amount']} />
                  <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2} dot={{ fill: '#4f46e5' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4">
            {timeline.map((t, i) => (
              <motion.div key={t.event} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="card flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm ${t.status === 'urgent' ? 'bg-red-500' : 'bg-primary-600'}`}>
                    {t.daysLeft}d
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t.event}</div>
                    <div className="text-sm text-gray-500">{t.date}</div>
                  </div>
                </div>
                <span className={`badge ${t.status === 'urgent' ? 'badge-danger' : 'badge-warning'}`}>
                  {t.daysLeft} days left
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
