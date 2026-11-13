import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { Toaster } from 'sonner';
// Query Client
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// Components
import Login from './components/login/Login.tsx';
import Inbox from './components/Inbox/Inbox.tsx';


// Route protector
import ProtectedRoute from './components/route-protector/RouteProtector.tsx';
import CardGeneration from './components/generate/CardGeneration.tsx';
import CardsReviewDashboard from './components/card-review-system/cardsReviewInbox.tsx';
import CardReviewContainer from './components/card-review-system/CardReviewContainer.tsx';
// Setup Query Client
export const queryClient = new QueryClient();

//queryClient.setQueryData(['isAuthenticated'], false);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        
        {/* MOVED HERE: Outside of Routes, but inside the app providers */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: 'bg-neutral-900 text-white rounded-2xl border-none shadow-lg font-sans',
              error: 'bg-[#ee6b58] text-white',
              success: 'bg-[#d8f3dc] text-[#1b4332]',
            },
          }}
        />

        <Routes>
          <Route path="/" element={<Login />} />

          {/* Protected routes, only accessible after login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/generate-cards" element={<CardGeneration/>} />
            <Route path="/review/cards-inbox" element={<CardsReviewDashboard/>} />
            <Route path="/review/cards-today" element={<CardReviewContainer/>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
