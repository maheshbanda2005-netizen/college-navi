'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import { clearAuth } from '@/lib/auth';
import { useRouter, usePathname } from 'next/navigation';
import type { UserRole } from '@/types';

const navLinks = [
  { href: '/universities', label: 'Universities' },
  { href: '/compare', label: 'Compare' },
  { href: '/scholarships', label: 'Scholarships' },
  { href: '/admission-predictor', label: 'Predictor' },
  { href: '/career-guidance', label: 'Career' },
  { href: '/chatbot', label: 'AI Chat' },
  { href: '/community', label: 'Community' },
];

const userMenuLinks = [
  { href: '/notifications', icon: '🔔', label: 'Notifications' },
  { href: '/profile', icon: '👤', label: 'Profile' },
  { href: '/saved', icon: '❤️', label: 'Saved Universities' },
  { href: '/applications', icon: '📋', label: 'Applications' },
  { href: '/settings', icon: '⚙️', label: 'Settings' },
];

const dashboardRouteMap: Record<UserRole, string> = {
  student: '/dashboard/student',
  parent: '/dashboard/parent',
  university: '/dashboard/university',
  counselor: '/dashboard/counselor',
  admin: '/dashboard/admin',
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    clearAuth();
    router.push('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/dashboard/student';
    return dashboardRouteMap[user.role] || '/dashboard/student';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2 shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:inline">EduNavigator <span className="text-primary-600">AI</span></span>
            </Link>
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith(link.href) ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                  </div>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-medium text-gray-900 text-sm">{user?.name}</div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </div>
                    <Link href={getDashboardLink()} className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>
                      <span>📊</span><span>Dashboard</span>
                    </Link>
                    {userMenuLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>
                        <span>{link.icon}</span><span>{link.label}</span>
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 my-1" />
                    <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full">
                      <span>🚪</span><span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="btn-secondary text-sm py-2 px-4">Log In</Link>
                <Link href="/register" className="btn-primary text-sm py-2 px-4">Sign Up Free</Link>
              </div>
            )}
          </div>

          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 my-2" />
            {isAuthenticated ? (
              <>
                <Link href={getDashboardLink()} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Dashboard</Link>
                {userMenuLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {link.label}
                  </Link>
                ))}
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-2 pt-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center btn-secondary text-sm py-2">Log In</Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center btn-primary text-sm py-2">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
