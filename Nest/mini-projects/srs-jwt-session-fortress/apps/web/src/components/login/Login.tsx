import { useState, type FormEvent } from 'react';
import type { loginInfo } from '@project/shared-types';
import { fetchBackend } from '../../api/client';
import { useMutation, useQuery} from '@tanstack/react-query';
import { queryClient } from '../../main.tsx';
import {useNavigate, Navigate, Outlet, useLocation } from "react-router-dom";
import {setToken } from '../../utils/tokenStore.ts';
import axios from 'axios';

interface LoginResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
  };
}

export default function Login() {
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 1. Declare the mutation at the TOP LEVEL of the component
    const loginMutation = useMutation({
      mutationFn: async (credentials: loginInfo) => {
        const res = await fetchBackend.post<LoginResponse>('/auth/login', credentials);
        return res.data;
      },
      onSuccess: (data) => {
        // Synchronously flip the React Query cache key
        queryClient.setQueryData(['isAuthenticated'], true);
        console.log('Is Authenticated:', queryClient.getQueryData(['isAuthenticated'])); // Check the cache value

        // Store the access token 
        setToken(data.accessToken);
        
        navigate('/inbox');
      },
    });


    const location = useLocation();
    
    //THE LOGIC: Read the requested route from state, OR default to "/inbox"
    const destination = location.state?.from?.pathname || "/inbox";

    // Reverse guard : If the user is already authenticated, redirect them to the inbox
      const { data: isAuth, isLoading, isPending } = useQuery({ 
          queryKey: ['isAuthenticated'],
          queryFn: async () => {
              try {
                  // If this returns 200, execution continues to the next line
                  const response = await fetchBackend.get('/auth/me');
                  
                  console.log('✅ Authenticated user check successful:', response.data);
                  return true;
                  
              } catch (error) {
                  // If the backend returns 401/403, Axios throws and jumps directly here
                  if (axios.isAxiosError(error)) {
                  console.log(
                      '❌ Authenticated user check failed:', 
                      error.response?.status, 
                      error.response?.statusText || error.message
                  );
                      // Return false so your 'isAuth' variable cleanly becomes false
                      return false;
                  }
              }
          },
          // Optional but recommended for auth checks: don't retry on 401s
          retry: false 
      });

      // . Hold the render while the initial auth check runs on a page refresh
      if (isPending || isLoading) {
          console.log('⏳ Auth check is still pending or loading...');
          return <div>Loading session...</div>; // Prevent the premature redirect
      }

      if(isAuth){
        navigate(destination);
      }
    // 2. Event handler simply calls the mutation trigger
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const credentials: loginInfo = {
        email: email.trim().toLowerCase(),
        password,
      };

      loginMutation.mutate(credentials); // trigger function
    };

  return (
    <main className="min-h-screen bg-[#f4efe6] px-4 py-10 text-neutral-900">
      <form
        className="mx-auto flex max-w-sm flex-col gap-4 rounded-lg bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-black tracking-tight">Login</h1>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="rounded border border-neutral-300 px-3 py-2"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="rounded border border-neutral-300 px-3 py-2"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {loginMutation.error && (
          <p className="text-sm font-medium text-red-700" role="alert">
            {loginMutation.error.message}
          </p>
        )}

        <button
          className="rounded bg-neutral-900 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  );
}