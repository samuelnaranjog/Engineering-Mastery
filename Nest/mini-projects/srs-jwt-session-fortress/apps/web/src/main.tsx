import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

// Query Client
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// Components
import Login from './components/login/Login.tsx';
import Inbox from './components/Inbox/Inbox.tsx';


// Route protector
import ProtectedRoute from './components/route-protector/RouteProtector.tsx';
// Setup Query Client
export const queryClient = new QueryClient();

//queryClient.setQueryData(['isAuthenticated'], false);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Protected routes, only accessible after login */}

          <Route element={<ProtectedRoute />}>
            <Route path="/inbox" element={<Inbox />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
