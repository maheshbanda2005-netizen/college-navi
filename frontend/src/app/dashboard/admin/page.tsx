'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { month: 'Jan', applications: 1200, revenue: 240000 },
  { month: 'Feb', applications: 1900, revenue: 380000 },
  { month: 'Mar', applications: 2800, revenue: 560000 },
  { month: 'Apr', applications: 3200, revenue: 640000 },
  { month: 'May', applications: 2500, revenue: 500000 },
  { month: 'Jun', applications: 2100, revenue: 420000 },
];

const userData = [
  { name: 'Students', value: 45000 }, { name: 'Universities', value: 250 },
  { name: 'Counselors', value: 500 }, { name: 'Parents', value: 8000 },
];

const COLORS = ['#6366f1', '#22c55e', '#f97316', '#ec4899'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Platform overview and analytics</p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Users', value: '53,750', change: '+12%', icon: '👥' },
            { label: 'Universities', value: '10,250', change: '+5%', icon: '🏛️' },
            { label: 'Applications', value: '13,800', change: '+23%', icon: '📋' },
            { label: 'Active Students', value: '45,000', change: '+18%', icon: '🎓' },
            { label: 'Revenue', value: '₹74.2L', change: '+15%', icon: '💰' },
          ].map((s) => (
            <div key={s.label} className="card text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
              <div className={`text-xs font-medium ${s.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{s.change}</div>
            </div>
          ))}
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {['overview', 'reports', 'users', 'settings'].map((tab) => (
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
              <h3 className="font-semibold text-lg mb-4">Application & Revenue Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#6366f1" name="Applications" />
                  <Bar dataKey="revenue" fill="#22c55e" name="Revenue (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <h3 className="font-semibold text-lg mb-4">User Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={userData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label>
                    {userData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="grid md:grid-cols-3 gap-4">
            {['Admission Report', 'Student Report', 'University Report', 'Scholarship Report', 'Placement Report', 'Revenue Report'].map((r) => (
              <div key={r} className="card flex items-center justify-between">
                <span className="font-medium text-gray-700">{r}</span>
                <button className="btn-secondary text-sm py-1.5 px-3">Download PDF</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {[{ name: 'John Doe', email: 'john@email.com', role: 'Student', status: 'Active' },
                  { name: 'Jane Smith', email: 'jane@email.com', role: 'University', status: 'Active' },
                  { name: 'Bob Wilson', email: 'bob@email.com', role: 'Counselor', status: 'Inactive' },
                ].map((u) => (
                  <tr key={u.email} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">{u.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{u.email}</td>
                    <td className="py-3 px-4 text-sm">{u.role}</td>
                    <td className="py-3 px-4"><span className={`badge ${u.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{u.status}</span></td>
                    <td className="py-3 px-4"><button className="text-primary-600 text-sm">Manage</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
