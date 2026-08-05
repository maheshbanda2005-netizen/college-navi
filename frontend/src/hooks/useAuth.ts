import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppSelector } from '@/store/store';
import type { UserRole } from '@/types';

export function useAuth() {
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);
  return { user, isAuthenticated, loading };
}

export function useRequireAuth(redirectUrl = '/login') {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push(redirectUrl);
  }, [isAuthenticated, loading, router, redirectUrl]);

  return { isAuthenticated, loading };
}

export function useRequireRole(allowedRoles: UserRole[], redirectUrl = '/dashboard/student') {
  const { user, loading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && !allowedRoles.includes(user.role)) router.push(redirectUrl);
  }, [user, loading, allowedRoles, router, redirectUrl]);

  return { user, loading };
}
