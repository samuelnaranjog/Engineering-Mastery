import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBackend } from '../../api/client';

export default function CardsReviewDashboard(){
  /* =========================================================================
   * STATE MANAGEMENT & DATA FETCHING PLACEHOLDERS
   * =========================================================================
   * 
   * 1. Navigation / View state:
   *    const [activeTab, setActiveTab] = useState<'card-flow' | 'daily'>('daily');
   * 
   * 2. Server state via TanStack Query (fetching pending review count):
   *    const { 
   *      data: pendingCount = 0, 
   *      isLoading, 
   *      isError 
   *    } = useQuery({
   *      queryKey: ['reviews', 'daily-count'],
   *      queryFn: async () => {
   *        const res = await api.get('/cards/today-count');
   *        return res.data.count;
   *      },
   *    });
   * 
   * 3. Action handling / Navigation:
   *    const handleStartReview = () => {
   *      // navigate('/review/session') or trigger review mutation
   *    };
   * ========================================================================= */

  const { data: cardsDailyCount, isLoading, isError } = useQuery({
         queryKey: ['cardsDailyCount'],
         queryFn: async () => {
           const res = await fetchBackend.get('/cards/review-today');
           return res.data;
         },
    });


  return (
    <div className="flex min-h-screen items-center justify-center bg-[#c9d3db] p-6 text-neutral-800">
      <div className="flex items-center gap-6">
        
        {/* Left Sidebar Navigation */}
        <nav 
          aria-label="Review Navigation"
          className="flex flex-col gap-4 rounded-3xl border-2 border-neutral-900 bg-transparent p-3"
        >
          {/* Card Flow Button */}
          <button
            type="button"
            className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl border-2 border-neutral-900 bg-transparent text-center font-medium leading-tight transition-colors hover:bg-black/5"
            // onClick={() => setActiveTab('card-flow')}
          >
            <span>Card</span>
            <span>Flow</span>
          </button>

          {/* Daily Reviews Button (Active) */}
          <button
            type="button"
            className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-neutral-900 bg-[#a5d8ff] font-medium transition-colors hover:bg-[#91caff]"
            // onClick={() => setActiveTab('daily')}
          >
            Daily
          </button>
        </nav>

        {/* Right Content Column */}
        <div className="flex flex-col gap-5">
          {/* Status Display Card */}
          <div className="flex h-20 w-80 items-center justify-center rounded-2xl border-2 border-neutral-900 bg-transparent text-xl font-medium tracking-tight">
            Cards Pending: {cardsDailyCount} cards
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            className="flex h-20 w-80 items-center justify-center rounded-2xl border-2 border-neutral-900 bg-transparent text-xl font-medium tracking-tight transition-colors hover:bg-black/5 active:scale-[0.99]"
            // onClick={handleStartReview}
          >
            Began the review
          </button>
        </div>

      </div>
    </div>
  );
};
