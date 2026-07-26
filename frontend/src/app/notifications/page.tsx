'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const mockNotifications = [
  { id: '1', title: 'Application Update', message: 'Your application to IIT Bombay has moved to Document Verification stage.', type: 'info', read: false, createdAt: '2025-01-10T10:00:00Z', link: '/applications' },
  { id: '2', title: 'Scholarship Deadline Alert', message: 'National Merit Scholarship deadline is in 15 days. Apply now!', type: 'warning', read: false, createdAt: '2025-01-09T08:30:00Z', link: '/scholarships' },
  { id: '3', title: 'AI Recommendation Ready', message: 'Your personalized university recommendations are ready. 8 new matches found!', type: 'success', read: false, createdAt: '2025-01-08T14:00:00Z', link: '/universities' },
  { id: '4', title: 'Interview Scheduled', message: 'IIT Delhi has scheduled your interview for January 20, 2025 at 10:00 AM.', type: 'success', read: true, createdAt: '2025-01-07T11:00:00Z', link: '/applications' },
  { id: '5', title: 'Document Verification', message: 'Please upload your 12th marksheet for NIT Trichy application.', type: 'warning', read: true, createdAt: '2025-01-06T09:00:00Z', link: '/applications' },
  { id: '6', title: 'New Scholarship Added', message: 'A new scholarship matching your profile has been added: STEM Excellence Award.', type: 'info', read: true, createdAt: '2025-01-05T16:00:00Z', link: '/scholarships' },
  { id: '7', title: 'Profile Incomplete', message: 'Complete your academic profile to get better AI recommendations.', type: 'warning', read: true, createdAt: '2025-01-04T12:00:00Z', link: '/profile' },
  { id: '8', title: 'Welcome to EduNavigator AI!', message: 'Your account has been created successfully. Start exploring universities!', type: 'success', read: true, createdAt: '2025-01-01T10:00:00Z', link: '/' },
];

const typeConfig: Record<string, { icon: string; bg: string; border: string; dot: string }> = {
  info: { icon: 'ℹ️', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500' },
  success: { icon: '✅', bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500' },
  warning: { icon: '⚠️', bg: 'bg-yellow-50', border: 'border-yellow-200', dot: 'bg-yellow-500' },
  error: { icon: '❌', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const displayed = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="btn-secondary text-sm">
              Mark all as read
            </button>
          )}
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {(['all', 'unread'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-md text-sm font-medium capitalize transition-all ${filter === f ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600'}`}
            >
              {f === 'all' ? `All (${notifications.length})` : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>

        {displayed.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-5xl mb-4">🔔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayed.map((n, i) => {
              const cfg = typeConfig[n.type] || typeConfig.info;
              return (
                <motion.div key={n.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className={`card border ${cfg.border} ${!n.read ? cfg.bg : 'bg-white'} cursor-pointer`}
                  onClick={() => markRead(n.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-xl mt-0.5">{cfg.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-semibold text-sm ${!n.read ? 'text-gray-900' : 'text-gray-700'}`}>{n.title}</h3>
                          {!n.read && <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">{timeAgo(n.createdAt)}</span>
                          <button onClick={e => { e.stopPropagation(); deleteNotification(n.id); }}
                            className="text-gray-300 hover:text-red-400 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                      {n.link && (
                        <a href={n.link} onClick={e => e.stopPropagation()}
                          className="text-xs text-primary-600 hover:underline mt-1 inline-block"
                        >
                          View details →
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
