import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/check');
        setState({
          isAuthenticated: response.ok,
          isLoading: false,
        });

        if (!response.ok) {
          router.push('/');
        }
      } catch (error) {
        setState({
          isAuthenticated: false,
          isLoading: false,
        });
        router.push('/');
      }
    }

    checkAuth();
  }, [router]);

  return state;
} 