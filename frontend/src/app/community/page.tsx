'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const posts = [
  { id: 1, author: 'Rahul K.', role: 'Student', avatar: 'R', content: 'Just got my admit from IIT Bombay for MTech AI! The admission predictor on this platform was spot on! 🎉', likes: 24, comments: 8, time: '2h ago', tag: 'Success Story' },
  { id: 2, author: 'Priya S.', role: 'Parent', avatar: 'P', content: 'My daughter is looking for good NITs for CSE. Any recommendations? We are from Tamil Nadu.', likes: 15, comments: 12, time: '4h ago', tag: 'Question' },
  { id: 3, author: 'Dr. Sharma', role: 'Counselor', avatar: 'D', content: 'Tips for JEE Advanced 2025: Focus on conceptual clarity over mugging. Solve previous year papers. Time management is key!', likes: 45, comments: 18, time: '6h ago', tag: 'Guidance' },
  { id: 4, author: 'Ananya M.', role: 'Student', avatar: 'A', content: 'Which is better for AI/ML - IIT Hyderabad or IIIT Hyderabad? Would love to hear from current students.', likes: 32, comments: 21, time: '8h ago', tag: 'Discussion' },
  { id: 5, author: 'Vikram P.', role: 'Alumni', avatar: 'V', content: 'As an IIT Delhi alumni, I can say the placement scene is incredible. But choose based on your interest, not just package!', likes: 67, comments: 14, time: '12h ago', tag: 'Alumni Insights' },
];

export default function CommunityPage() {
  const [postContent, setPostContent] = useState('');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community</h1>
            <p className="text-gray-600">Connect with students, alumni, and counselors</p>
          </div>
        </div>

        <div className="card mb-6">
          <textarea
            value={postContent} onChange={(e) => setPostContent(e.target.value)}
            className="w-full border-0 resize-none focus:ring-0 text-gray-700 placeholder-gray-400" rows={3}
            placeholder="Share your thoughts, ask questions, or start a discussion..."
          />
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <div className="flex space-x-2">
              {['📷', '🔗', '📄'].map((icon) => (
                <button key={icon} className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center">{icon}</button>
              ))}
            </div>
            <button onClick={() => { setPostContent(''); alert('Post shared!'); }} className="btn-primary text-sm py-1.5 px-4">Post</button>
          </div>
        </div>

        <div className="space-y-4">
          {posts.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{post.author}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{post.role}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{post.time}</span>
                  </div>
                  <div className="mt-1">
                    <span className="badge bg-primary-50 text-primary-700 text-xs mb-2">{post.tag}</span>
                  </div>
                  <p className="text-gray-700 mt-1">{post.content}</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-primary-600">👍 <span>{post.likes}</span></button>
                    <button className="flex items-center space-x-1 hover:text-primary-600">💬 <span>{post.comments}</span></button>
                    <button className="hover:text-primary-600">Share</button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
