'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addToCompare } from '@/store/store';
import toast from 'react-hot-toast';

const telanganaColleges = [
  // Top Tier - IITs & IIITs
  { id: '1', name: 'IIT Hyderabad', location: 'Hyderabad, Telangana', ranking: 8, avgPackage: '₹24 LPA', fees: '₹2.2L/yr', rating: 4.8, courses: 45, type: 'IIT', aiScore: 92, eamcetCutoff: 450, placementRate: 96 },
  { id: '2', name: 'IIIT Hyderabad', location: 'Hyderabad, Telangana', ranking: 15, avgPackage: '₹28 LPA', fees: '₹2.0L/yr', rating: 4.9, courses: 35, type: 'IIIT', aiScore: 95, eamcetCutoff: 380, placementRate: 98 },
  
  // Central Universities
  { id: '3', name: 'University of Hyderabad', location: 'Hyderabad, Telangana', ranking: 38, avgPackage: '₹14 LPA', fees: '₹60K/yr', rating: 4.4, courses: 50, type: 'Central University', aiScore: 75, eamcetCutoff: 800, placementRate: 70 },
  { id: '4', name: 'Osmania University', location: 'Hyderabad, Telangana', ranking: 45, avgPackage: '₹12 LPA', fees: '₹50K/yr', rating: 4.2, courses: 60, type: 'Central University', aiScore: 72, eamcetCutoff: 850, placementRate: 65 },
  
  // Top Private Engineering Colleges - Hyderabad
  { id: '5', name: 'CBIT Hyderabad', location: 'Hyderabad, Telangana', ranking: 52, avgPackage: '₹18 LPA', fees: '₹1.8L/yr', rating: 4.5, courses: 40, type: 'Private', aiScore: 82, eamcetCutoff: 650, placementRate: 88 },
  { id: '6', name: 'VNR VJIET', location: 'Hyderabad, Telangana', ranking: 58, avgPackage: '₹17 LPA', fees: '₹1.6L/yr', rating: 4.4, courses: 38, type: 'Private', aiScore: 80, eamcetCutoff: 700, placementRate: 85 },
  { id: '7', name: 'GRIET Hyderabad', location: 'Hyderabad, Telangana', ranking: 65, avgPackage: '₹16 LPA', fees: '₹1.5L/yr', rating: 4.3, courses: 36, type: 'Private', aiScore: 78, eamcetCutoff: 750, placementRate: 82 },
  { id: '8', name: 'Vasavi College of Engineering', location: 'Hyderabad, Telangana', ranking: 72, avgPackage: '₹15 LPA', fees: '₹1.4L/yr', rating: 4.2, courses: 34, type: 'Private', aiScore: 76, eamcetCutoff: 800, placementRate: 80 },
  { id: '9', name: 'CVR College of Engineering', location: 'Hyderabad, Telangana', ranking: 78, avgPackage: '₹14 LPA', fees: '₹1.3L/yr', rating: 4.1, courses: 32, type: 'Private', aiScore: 74, eamcetCutoff: 850, placementRate: 78 },
  { id: '10', name: 'MGIT Hyderabad', location: 'Hyderabad, Telangana', ranking: 85, avgPackage: '₹13 LPA', fees: '₹1.2L/yr', rating: 4.0, courses: 30, type: 'Private', aiScore: 72, eamcetCutoff: 900, placementRate: 75 },
  { id: '11', name: 'SNIST Hyderabad', location: 'Hyderabad, Telangana', ranking: 92, avgPackage: '₹12 LPA', fees: '₹1.1L/yr', rating: 3.9, courses: 28, type: 'Private', aiScore: 70, eamcetCutoff: 950, placementRate: 72 },
  { id: '12', name: 'GNITS Hyderabad', location: 'Hyderabad, Telangana', ranking: 98, avgPackage: '₹11 LPA', fees: '₹1.0L/yr', rating: 3.8, courses: 26, type: 'Private', aiScore: 68, eamcetCutoff: 1000, placementRate: 70 },
  { id: '13', name: 'KMIT Hyderabad', location: 'Hyderabad, Telangana', ranking: 105, avgPackage: '₹10 LPA', fees: '₹95K/yr', rating: 3.7, courses: 24, type: 'Private', aiScore: 66, eamcetCutoff: 1050, placementRate: 68 },
  { id: '14', name: 'Chaitanya Bharathi Institute', location: 'Hyderabad, Telangana', ranking: 115, avgPackage: '₹13 LPA', fees: '₹1.2L/yr', rating: 4.0, courses: 28, type: 'Private', aiScore: 72, eamcetCutoff: 900, placementRate: 75 },
  { id: '15', name: 'Sreenidhi Institute of Science and Technology', location: 'Hyderabad, Telangana', ranking: 120, avgPackage: '₹12 LPA', fees: '₹1.1L/yr', rating: 3.9, courses: 26, type: 'Private', aiScore: 70, eamcetCutoff: 950, placementRate: 72 },
  { id: '16', name: 'Gokaraju Rangaraju Institute of Engineering', location: 'Hyderabad, Telangana', ranking: 125, avgPackage: '₹11 LPA', fees: '₹1.0L/yr', rating: 3.8, courses: 24, type: 'Private', aiScore: 68, eamcetCutoff: 1000, placementRate: 70 },
  { id: '17', name: 'Malla Reddy College of Engineering', location: 'Hyderabad, Telangana', ranking: 130, avgPackage: '₹10 LPA', fees: '₹95K/yr', rating: 3.7, courses: 22, type: 'Private', aiScore: 66, eamcetCutoff: 1050, placementRate: 68 },
  { id: '18', name: 'Vardhaman College of Engineering', location: 'Hyderabad, Telangana', ranking: 135, avgPackage: '₹9 LPA', fees: '₹90K/yr', rating: 3.6, courses: 20, type: 'Private', aiScore: 64, eamcetCutoff: 1100, placementRate: 65 },
  { id: '19', name: 'Deccan College of Engineering and Technology', location: 'Hyderabad, Telangana', ranking: 140, avgPackage: '₹9 LPA', fees: '₹85K/yr', rating: 3.5, courses: 19, type: 'Private', aiScore: 62, eamcetCutoff: 1150, placementRate: 62 },
  { id: '20', name: 'Brilliant Grammar School', location: 'Hyderabad, Telangana', ranking: 145, avgPackage: '₹8 LPA', fees: '₹80K/yr', rating: 3.5, courses: 17, type: 'Private', aiScore: 62, eamcetCutoff: 1150, placementRate: 62 },
  
  // Government Engineering Colleges - Hyderabad
  { id: '21', name: 'JNTUH College of Engineering', location: 'Hyderabad, Telangana', ranking: 110, avgPackage: '₹11 LPA', fees: '₹80K/yr', rating: 3.8, courses: 32, type: 'Government', aiScore: 70, eamcetCutoff: 950, placementRate: 72 },
  { id: '22', name: 'Shadan College of Engineering and Technology', location: 'Hyderabad, Telangana', ranking: 150, avgPackage: '₹7 LPA', fees: '₹75K/yr', rating: 3.4, courses: 16, type: 'Private', aiScore: 60, eamcetCutoff: 1200, placementRate: 60 },
  { id: '23', name: 'Bhoj Reddy Engineering College', location: 'Hyderabad, Telangana', ranking: 155, avgPackage: '₹6 LPA', fees: '₹70K/yr', rating: 3.3, courses: 15, type: 'Private', aiScore: 58, eamcetCutoff: 1250, placementRate: 58 },
  { id: '24', name: 'Narayana Engineering College', location: 'Hyderabad, Telangana', ranking: 160, avgPackage: '₹5 LPA', fees: '₹65K/yr', rating: 3.2, courses: 14, type: 'Private', aiScore: 56, eamcetCutoff: 1300, placementRate: 55 },
  
  // Warangal Region
  { id: '25', name: 'NIT Warangal', location: 'Warangal, Telangana', ranking: 20, avgPackage: '₹20 LPA', fees: '₹1.5L/yr', rating: 4.6, courses: 40, type: 'NIT', aiScore: 85, eamcetCutoff: 600, placementRate: 90 },
  { id: '26', name: 'Kakatiya University', location: 'Warangal, Telangana', ranking: 155, avgPackage: '₹7 LPA', fees: '₹45K/yr', rating: 3.4, courses: 22, type: 'Government', aiScore: 60, eamcetCutoff: 1200, placementRate: 60 },
  { id: '27', name: 'Vaagdevi College of Engineering', location: 'Warangal, Telangana', ranking: 165, avgPackage: '₹6 LPA', fees: '₹60K/yr', rating: 3.3, courses: 18, type: 'Private', aiScore: 58, eamcetCutoff: 1250, placementRate: 58 },
  { id: '28', name: 'Marri Laxman Reddy Institute of Technology', location: 'Warangal, Telangana', ranking: 170, avgPackage: '₹5 LPA', fees: '₹55K/yr', rating: 3.2, courses: 16, type: 'Private', aiScore: 56, eamcetCutoff: 1300, placementRate: 55 },
  
  // Nizamabad Region
  { id: '29', name: 'Telangana University', location: 'Nizamabad, Telangana', ranking: 150, avgPackage: '₹6 LPA', fees: '₹35K/yr', rating: 3.3, courses: 20, type: 'Government', aiScore: 58, eamcetCutoff: 1250, placementRate: 58 },
  { id: '30', name: 'Sreenidhi Institute Nizamabad', location: 'Nizamabad, Telangana', ranking: 175, avgPackage: '₹5 LPA', fees: '₹50K/yr', rating: 3.1, courses: 14, type: 'Private', aiScore: 54, eamcetCutoff: 1350, placementRate: 52 },
  
  // Karimnagar Region
  { id: '31', name: 'Satavahana University', location: 'Karimnagar, Telangana', ranking: 160, avgPackage: '₹6 LPA', fees: '₹40K/yr', rating: 3.3, courses: 18, type: 'Government', aiScore: 58, eamcetCutoff: 1250, placementRate: 58 },
  { id: '32', name: 'Rajiv Gandhi University of Knowledge Technologies', location: 'Karimnagar, Telangana', ranking: 165, avgPackage: '₹8 LPA', fees: '₹50K/yr', rating: 3.5, courses: 20, type: 'Government', aiScore: 62, eamcetCutoff: 1150, placementRate: 62 },
  
  // Mahabubnagar Region
  { id: '33', name: 'Mahabubnagar Engineering College', location: 'Mahabubnagar, Telangana', ranking: 140, avgPackage: '₹8 LPA', fees: '₹75K/yr', rating: 3.5, courses: 18, type: 'Government', aiScore: 62, eamcetCutoff: 1150, placementRate: 62 },
  { id: '34', name: 'Nizam College', location: 'Hyderabad, Telangana', ranking: 145, avgPackage: '₹7 LPA', fees: '₹40K/yr', rating: 3.4, courses: 25, type: 'Government', aiScore: 60, eamcetCutoff: 1200, placementRate: 60 },
  
  // Additional Private Colleges - Hyderabad
  { id: '35', name: 'Rajiv Gandhi School of Engineering', location: 'Hyderabad, Telangana', ranking: 180, avgPackage: '₹4 LPA', fees: '₹60K/yr', rating: 3.0, courses: 12, type: 'Private', aiScore: 52, eamcetCutoff: 1400, placementRate: 50 },
  { id: '36', name: 'Anurag University', location: 'Hyderabad, Telangana', ranking: 185, avgPackage: '₹4 LPA', fees: '₹55K/yr', rating: 2.9, courses: 11, type: 'Private', aiScore: 50, eamcetCutoff: 1450, placementRate: 48 },
  { id: '37', name: 'Jyothishmathi Institute of Technology and Science', location: 'Hyderabad, Telangana', ranking: 190, avgPackage: '₹3 LPA', fees: '₹50K/yr', rating: 2.8, courses: 10, type: 'Private', aiScore: 48, eamcetCutoff: 1500, placementRate: 45 },
  { id: '38', name: 'Geethanjali Institute of Science and Technology', location: 'Hyderabad, Telangana', ranking: 195, avgPackage: '₹3 LPA', fees: '₹45K/yr', rating: 2.7, courses: 9, type: 'Private', aiScore: 46, eamcetCutoff: 1550, placementRate: 42 },
  { id: '39', name: 'Vignan University', location: 'Hyderabad, Telangana', ranking: 200, avgPackage: '₹2 LPA', fees: '₹40K/yr', rating: 2.6, courses: 8, type: 'Private', aiScore: 44, eamcetCutoff: 1600, placementRate: 40 },
  { id: '40', name: 'Sai Nath University', location: 'Hyderabad, Telangana', ranking: 205, avgPackage: '₹2 LPA', fees: '₹35K/yr', rating: 2.5, courses: 7, type: 'Private', aiScore: 42, eamcetCutoff: 1650, placementRate: 38 },
];

export default function UniversitiesPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ type: '', minRating: 0, minAIScore: 0 });
  const [universities] = useState(telanganaColleges);
  const router = useRouter();
  const dispatch = useDispatch();
  const compareList = useSelector((state: RootState) => state.compare.universities);

  const filtered = universities.filter(u => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.location.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.type && u.type !== filters.type) return false;
    if (filters.minRating && u.rating < filters.minRating) return false;
    if (filters.minAIScore && u.aiScore < filters.minAIScore) return false;
    return true;
  });

  const handleAddToCompare = (u: any) => {
    if (compareList.length >= 4) { toast.error('Maximum 4 colleges can be compared'); return; }
    dispatch(addToCompare(u as any));
    toast.success('Added to comparison');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Telangana Colleges</h1>
            <p className="text-gray-600 mt-1">Discover {filtered.length} engineering colleges in Telangana</p>
          </div>
          {compareList.length > 0 && (
            <button onClick={() => router.push('/compare')} className="btn-primary mt-4 md:mt-0">
              Compare ({compareList.length})
            </button>
          )}
        </div>

        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                className="input-field" placeholder="Search colleges, locations..."
              />
            </div>
            <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="input-field md:w-48">
              <option value="">All Types</option>
              <option value="IIT">IIT</option>
              <option value="NIT">NIT</option>
              <option value="IIIT">IIIT</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
              <option value="Central University">Central University</option>
            </select>
            <select value={filters.minRating} onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })} className="input-field md:w-48">
              <option value="0">Min Rating</option>
              <option value="3">3+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
            <select value={filters.minAIScore} onChange={(e) => setFilters({ ...filters, minAIScore: Number(e.target.value) })} className="input-field md:w-48">
              <option value="0">AI Score</option>
              <option value="50">50+</option>
              <option value="60">60+</option>
              <option value="70">70+</option>
              <option value="80">80+</option>
            </select>
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Showing {filtered.length} of {universities.length} colleges
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((u, i) => (
            <motion.div key={u.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
              className="card cursor-pointer group hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-lg">{u.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{u.name}</h3>
                    <p className="text-sm text-gray-500">{u.location}</p>
                  </div>
                </div>
                <span className="badge-primary">{u.type}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="text-sm font-bold text-blue-700">{u.aiScore}</div>
                  <div className="text-xs text-blue-600">AI Score</div>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <div className="text-sm font-bold text-green-700">{u.placementRate}%</div>
                  <div className="text-xs text-green-600">Placement</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center text-sm">
                <div>
                  <div className="font-bold text-gray-900">#{u.ranking}</div>
                  <div className="text-xs text-gray-500">Rank</div>
                </div>
                <div>
                  <div className="font-bold text-green-600">{u.avgPackage}</div>
                  <div className="text-xs text-gray-500">Avg Pkg</div>
                </div>
                <div>
                  <div className="font-bold text-accent-600">{u.fees}</div>
                  <div className="text-xs text-gray-500">Fees</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★</span>
                  <span className="font-medium">{u.rating}</span>
                </div>
                <span className="text-xs text-gray-500">EAMCET: {u.eamcetCutoff}</span>
              </div>

              <div className="flex space-x-2 pt-4 border-t border-gray-100">
                <button onClick={() => router.push(`/universities/${u.id}`)} className="flex-1 btn-primary text-sm py-2">
                  View Details
                </button>
                <button onClick={() => handleAddToCompare(u)} className="btn-secondary text-sm py-2 px-3">
                  Compare
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-gray-500">No colleges match your filters</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
