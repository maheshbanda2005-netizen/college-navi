'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const mockStudents = [
  { id: '1', name: 'Rahul Kumar', email: 'rahul@example.com', goal: 'B.Tech CSE at IIT', status: 'Active', lastSession: '2 days ago', progress: 75 },
  { id: '2', name: 'Priya Sharma', email: 'priya@example.com', goal: 'M.Tech AI at IIT Delhi', status: 'Active', lastSession: '1 week ago', progress: 60 },
  { id: '3', name: 'Amit Singh', email: 'amit@example.com', goal: 'MBA at IIM', status: 'Pending', lastSession: 'Never', progress: 20 },
  { id: '4', name: 'Sneha Patel', email: 'sneha@example.com', goal: 'MBBS at AIIMS', status: 'Active', lastSession: '3 days ago', progress: 85 },
];

const sessions = [
  { id: '1', student: 'Rahul Kumar', date: 'Today', time: '2:00 PM', type: 'Video Call', status: 'Upcoming' },
  { id: '2', student: 'Priya Sharma', date: 'Tomorrow', time: '10:00 AM', type: 'In-Person', status: 'Upcoming' },
  { id: '3', student: 'Sneha Patel', date: 'Jan 20', time: '3:00 PM', type: 'Chat', status: 'Scheduled' },
  { id: '4', student: 'Amit Singh', date: 'Jan 15', time: '11:00 AM', type: 'Video Call', status: 'Completed' },
];

const resources = [
  { title: 'JEE Advanced 2025 Guide', type: 'PDF', downloads: 234 },
  { title: 'Top 50 Universities Comparison', type: 'Report', downloads: 189 },
  { title: 'Scholarship Application Tips', type: 'Article', downloads: 312 },
  { title: 'Career Roadmap Templates', type: 'Template', downloads: 156 },
];

export default function CounselorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'student', name: 'Rahul Kumar', text: 'Hi, I need help choosing between IIT Bombay and IIT Delhi for CSE.', time: '2:05 PM' },
  ]);

  const sendMessage = () => {
    if (!chatMsg.trim()) return;
    setChatMessages(prev => [...prev, { from: 'counselor', name: 'You', text: chatMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setChatMsg('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Counselor Dashboard</h1>
            <p className="text-gray-600">Manage your students and counseling sessions</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button onClick={() => setChatOpen(true)} className="btn-primary text-sm">💬 Live Chat</button>
            <button onClick={() => toast.success('Session scheduled!')} className="btn-secondary text-sm">📅 Schedule Session</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Students', value: '24', icon: '🎓', color: 'bg-primary-50' },
            { label: 'Pending Sessions', value: '8', icon: '📅', color: 'bg-yellow-50' },
            { label: 'Reports Generated', value: '156', icon: '📊', color: 'bg-green-50' },
            { label: 'Avg Progress', value: '72%', icon: '📈', color: 'bg-blue-50' },
          ].map(s => (
            <div key={s.label} className={`${s.color} rounded-xl p-4`}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {['overview', 'students', 'sessions', 'resources'].map(tab => (
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
              <h3 className="font-semibold text-lg mb-4">Upcoming Sessions</h3>
              <div className="space-y-3">
                {sessions.filter(s => s.status !== 'Completed').map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{s.student}</div>
                      <div className="text-xs text-gray-500">{s.date} at {s.time} • {s.type}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="badge-success text-xs">{s.status}</span>
                      <button onClick={() => toast.success('Joining session...')} className="btn-primary text-xs py-1 px-2">Join</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg mb-4">Student Progress</h3>
              <div className="space-y-4">
                {mockStudents.slice(0, 3).map(s => (
                  <div key={s.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{s.name}</span>
                      <span className="text-gray-500">{s.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full transition-all" style={{ width: `${s.progress}%` }} />
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.goal}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="card overflow-hidden p-0">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Student', 'Goal', 'Progress', 'Last Session', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-sm font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockStudents.map(s => (
                  <tr key={s.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-sm text-gray-900">{s.name}</div>
                      <div className="text-xs text-gray-500">{s.email}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{s.goal}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: `${s.progress}%` }} />
                        </div>
                        <span className="text-xs text-gray-600">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{s.lastSession}</td>
                    <td className="py-3 px-4">
                      <span className={`badge ${s.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{s.status}</span>
                    </td>
                    <td className="py-3 px-4">
                      <button onClick={() => toast.success(`Opening chat with ${s.name}`)} className="text-primary-600 text-sm hover:underline">Chat</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-4">
            {sessions.map(s => (
              <div key={s.id} className="card flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-700 font-bold">
                    {s.student.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{s.student}</div>
                    <div className="text-sm text-gray-500">{s.date} at {s.time} • {s.type}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`badge ${s.status === 'Completed' ? 'badge-success' : s.status === 'Upcoming' ? 'badge-primary' : 'badge-warning'}`}>
                    {s.status}
                  </span>
                  {s.status !== 'Completed' && (
                    <button onClick={() => toast.success('Joining session...')} className="btn-primary text-sm py-1.5 px-3">
                      {s.type === 'Video Call' ? '📹 Join' : s.type === 'Chat' ? '💬 Chat' : '📍 View'}
                    </button>
                  )}
                  {s.status === 'Completed' && (
                    <button onClick={() => toast.success('Report generated!')} className="btn-secondary text-sm py-1.5 px-3">📄 Report</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid md:grid-cols-2 gap-4">
            {resources.map(r => (
              <div key={r.title} className="card flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{r.title}</div>
                  <div className="text-sm text-gray-500">{r.type} • {r.downloads} downloads</div>
                </div>
                <button onClick={() => toast.success('Downloading...')} className="btn-secondary text-sm py-1.5 px-3">Download</button>
              </div>
            ))}
            <div className="card border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary-400 transition-colors"
              onClick={() => toast.success('Upload feature coming soon!')}
            >
              <div className="text-center py-4">
                <div className="text-3xl mb-2">📤</div>
                <div className="text-sm font-medium text-gray-600">Upload Resource</div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-primary-600 rounded-t-2xl">
            <div className="text-white font-semibold text-sm">Live Chat – Rahul Kumar</div>
            <button onClick={() => setChatOpen(false)} className="text-white/80 hover:text-white">✕</button>
          </div>
          <div className="h-48 overflow-y-auto p-3 space-y-2">
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'counselor' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-xl text-xs ${m.from === 'counselor' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  <p>{m.text}</p>
                  <p className={`text-xs mt-0.5 ${m.from === 'counselor' ? 'text-primary-200' : 'text-gray-400'}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-100 flex space-x-2">
            <input value={chatMsg} onChange={e => setChatMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="btn-primary text-xs py-1.5 px-3">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
