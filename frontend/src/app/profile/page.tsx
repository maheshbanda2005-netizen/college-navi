'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '', phone: user?.phone || '',
    bio: '', country: 'India', gender: '', dob: '',
  });
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Profile updated successfully!');
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'User'}</h1>
            <p className="text-gray-500">{user?.email}</p>
            <span className="badge-primary text-xs mt-1 inline-block">{user?.role}</span>
          </div>
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {['personal', 'academic', 'preferences', 'security'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all flex-1 ${activeTab === tab ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} className="card">
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field bg-gray-50" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-field" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input type="date" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className="input-field">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className="input-field">
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="input-field" rows={3} placeholder="Tell us about yourself..." />
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">10th Marks (%)</label>
                  <input className="input-field" type="number" placeholder="95" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">12th Marks (%)</label>
                  <input className="input-field" type="number" placeholder="88" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">UG CGPA</label>
                  <input className="input-field" type="number" step="0.1" placeholder="8.5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entrance Exam</label>
                  <select className="input-field">
                    <option value="">Select</option>
                    <option>JEE Advanced</option>
                    <option>JEE Mains</option>
                    <option>GATE</option>
                    <option>CAT</option>
                    <option>NEET</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <input className="input-field" placeholder="Python, ML, React" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Career Goal</label>
                  <input className="input-field" placeholder="AI/ML Engineer" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Preferences</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Country</label>
                  <select className="input-field"><option>India</option><option>USA</option><option>UK</option><option>Canada</option></select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget (per year)</label>
                  <select className="input-field"><option>&lt; ₹5 Lakh</option><option>₹5-10 Lakh</option><option>₹10-20 Lakh</option><option>₹20+ Lakh</option></select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Course</label>
                  <input className="input-field" placeholder="Computer Science" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred State</label>
                  <select className="input-field"><option>Any</option><option>Maharashtra</option><option>Tamil Nadu</option><option>Delhi</option><option>Karnataka</option></select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-500">Add an extra layer of security</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Email Notifications</div>
                    <div className="text-sm text-gray-500">Receive updates about applications</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <button className="btn-danger text-sm">Delete Account</button>
                  <p className="text-xs text-gray-500 mt-1">This action cannot be undone</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
