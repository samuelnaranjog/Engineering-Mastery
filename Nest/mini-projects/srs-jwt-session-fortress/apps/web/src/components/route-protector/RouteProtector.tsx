import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBackend } from "../../api/client";
import axios from "axios";

export default function ProtectedRoute() {

    // 1. useQuery subscribes to the cache and provides the loading state
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

    // 2. Hold the render while the initial auth check runs on a page refresh
    if (isPending || isLoading) {
        console.log('⏳ Auth check is still pending or loading...');
        return <div>Loading session...</div>; // Prevent the premature redirect
    }

    // 3. Redirect ONLY after we are 100% certain the request finished and they are not authenticated
    if (isAuth === false) {
        console.log('❌ User is not authenticated, redirecting to login page');
        console.log('Current isAuth value:', isAuth);
        return <Navigate to="/" replace />;
    }

    // 4. If authorized, render the nested routes
    if (isAuth === true) {
        console.log('✅ User is authenticated, rendering protected route');
        return <Outlet />;
    }

    // Fallback if state is somehow neither true, false, nor loading
    return <div>Loading session...</div>;
}