'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const savedItems = [
  { id: 1, name: 'Indian Institute of Technology Bombay', location: 'Mumbai, Maharashtra', type: 'IIT', match: '95%', rating: 4.8, savedAt: '2 days ago' },
  { id: 2, name: 'Indian Institute of Technology Delhi', location: 'New Delhi', type: 'IIT', match: '92%', rating: 4.9, savedAt: '3 days ago' },
  { id: 3, name: 'National Institute of Technology Trichy', location: 'Tiruchirappalli, TN', type: 'NIT', match: '88%', rating: 4.6, savedAt: '5 days ago' },
  { id: 4, name: 'BITS Pilani', location: 'Pilani, Rajasthan', type: 'Private', match: '82%', rating: 4.5, savedAt: '1 week ago' },
];

export default function SavedPage() {
  const [items, setItems] = useState(savedItems);

  const removeItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Saved Universities</h1>
            <p className="text-gray-600 mt-1">{items.length} universities saved</p>
          </div>
          <Link href="/universities" className="btn-primary text-sm">Browse More</Link>
        </div>

        {items.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-5xl mb-4">🏛️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved universities</h3>
            <p className="text-gray-500 mb-6">Start exploring and save your favorite universities</p>
            <Link href="/universities" className="btn-primary">Explore Universities</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="card flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-xl">{item.name.charAt(0)}</span>
                  </div>
                  <div>
                    <Link href={`/universities/${item.id}`} className="font-semibold text-gray-900 hover:text-primary-600">{item.name}</Link>
                    <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                      <span>{item.location}</span>
                      <span>•</span>
                      <span className="badge-primary text-xs">{item.type}</span>
                      <span>•</span>
                      <span>★ {item.rating}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Saved {item.savedAt}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">{item.match}</div>
                    <div className="text-xs text-gray-500">Match</div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 p-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
