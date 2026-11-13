// src/hooks/useAuthUser.ts
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getToken, parseJwt } from '../utils/tokenStore';

export function useAuthUser() {
  // 1. Listen to the global auth state managed by your interceptor
  const { data: isAuthenticated } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: () => false, 
    staleTime: Infinity,
  });

  // 2. React useMemo ensures we only decode the string when the auth state actually changes,
  // preventing unnecessary base64 processing on every component re-render.
  const user = useMemo(() => {
    if (!isAuthenticated) return null;
    
    const token = getToken();
    const parsedJwt = parseJwt<{ sub: number; email: string }>(token);
    console.log('Parsed JWT', parsedJwt)
    return parsedJwt

  }, [isAuthenticated]);

  // 3. Return a clean API for your components
  return {
    isAuthenticated: !!isAuthenticated,
    userId: user?.sub,
    email: user?.email,
  };
}