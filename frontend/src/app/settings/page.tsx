'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: true, push: true, sms: false, whatsapp: false,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Appearance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div><div className="font-medium">Theme</div><div className="text-sm text-gray-500">Choose your preferred theme</div></div>
                <select value={theme} onChange={e => setTheme(e.target.value)} className="input-field w-40">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div><div className="font-medium">Language</div><div className="text-sm text-gray-500">Select interface language</div></div>
                <select value={language} onChange={e => setLanguage(e.target.value)} className="input-field w-40">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="ta">Tamil</option>
                  <option value="te">Telugu</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              {[
                { key: 'email', label: 'Email Notifications', desc: 'Application updates, deadlines' },
                { key: 'push', label: 'Push Notifications', desc: 'Real-time alerts in browser' },
                { key: 'sms', label: 'SMS Alerts', desc: 'Important updates via text' },
                { key: 'whatsapp', label: 'WhatsApp Updates', desc: 'Convenient chat updates' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div><div className="font-medium">{label}</div><div className="text-sm text-gray-500">{desc}</div></div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={(notifications as any)[key]} onChange={() => setNotifications({ ...notifications, [key]: !(notifications as any)[key] })} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Privacy</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div><div className="font-medium">Profile Visibility</div><div className="text-sm text-gray-500">Who can see your profile</div></div>
                <select className="input-field w-40"><option>Public</option><option>Universities Only</option><option>Private</option></select>
              </div>
              <div className="flex items-center justify-between">
                <div><div className="font-medium">Data Sharing</div><div className="text-sm text-gray-500">Share data for better recommendations</div></div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={handleSave} className="btn-primary">Save All Settings</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
