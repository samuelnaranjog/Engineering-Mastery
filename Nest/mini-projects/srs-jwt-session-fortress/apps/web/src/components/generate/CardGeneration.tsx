import { useState, type FormEvent } from 'react';
import { useMutation, useIsMutating } from '@tanstack/react-query';
import { fetchBackend } from '../../api/client'; // Your default axios instance
import { useAuthUser } from '../../hooks/UseAuthUser';
interface GenerationRequest {
  deck: string;
  content: string;
}

interface GeneratedCardResponse {
  front: string;
  back: string;
  deck: string;
  userId: number;
}

interface CardGenerationProps {
  userId?: number;
}

export default function CardGeneration() {
  const [deck, setDeck] = useState('');
  const [content, setContent] = useState('');
  const {userId} = useAuthUser()
  console.log('This is the user ID:', userId)

  // Global pending count across the app (optional, but requested in your prompt)
  const pendingCount = useIsMutating({ mutationKey: ['generate-card'] });

  // useMutation is the correct TanStack hook for POST requests
  const { mutate, isPending, data, isError, error, reset } = useMutation({
    mutationKey: ['generate-card'],
    mutationFn: async (payload: GenerationRequest) => {
      // Uses the NestJS routing controller we built earlier
      const response = await fetchBackend.post<GeneratedCardResponse>(
        'cards/webhooks/n8n/generate-card',
        payload
      );
      return response.data;
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userId === undefined) return;

    // Trigger the mutation directly
    mutate({
      deck: deck.trim(),
      content: content.trim(),
    });
  };

  const handleClear = () => {
    setDeck('');
    setContent('');
    reset(); // Clears the mutation data to generate a new one
  };

  return (
    <section className="min-h-screen bg-[#f4efe6] p-8 space-y-6">
      
      {/* Header Section */}
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black tracking-tight text-neutral-900">
            Front End Generation
          </h1>
          <span className="bg-[#d8f3dc] text-[#1b4332] text-xs font-semibold px-3 py-1 rounded-full">
            Secure Generation
          </span>
        </div>
        <h2 className="text-base font-medium text-neutral-700">
          Pending generations in queue: {pendingCount}
        </h2>
      </header>

      {/* Generation Form */}
      <form
        className="bg-white rounded-3xl p-6 shadow-sm space-y-4 max-w-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
            New Card
          </span>
        </div>

        <div className="bg-[#f7f3ec] rounded-2xl p-4 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-neutral-900" htmlFor="deck">
              Deck
            </label>
            <input
              className="w-full rounded-xl border border-[#ebe5d8] bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-neutral-500"
              id="deck"
              required
              value={deck}
              onChange={(e) => setDeck(e.target.value)}
              placeholder="e.g. Back-end Systems"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-neutral-900" htmlFor="content">
              Content to study
            </label>
            <textarea
              className="min-h-28 w-full resize-y rounded-xl border border-[#ebe5d8] bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-neutral-500"
              id="content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste the source material here..."
            />
          </div>
        </div>

        {userId === undefined && (
          <p className="text-sm font-medium text-red-700">
            User session is missing. Please sign in again.
          </p>
        )}
        
        {isError && (
          <p className="text-sm font-medium text-red-700">
            {error?.message || 'Failed to generate card via n8n.'}
          </p>
        )}

        <button
          className="w-full bg-[#f3c048] hover:bg-[#eab335] active:scale-[0.98] text-neutral-900 font-bold rounded-2xl py-3 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit"
          disabled={isPending || userId === undefined}
        >
          {isPending ? 'Generating via AI...' : 'Generate Card'}
        </button>
      </form>

      {/* Generated Result Card */}
      {data && (
        <article className="bg-white rounded-3xl p-6 shadow-sm space-y-4 max-w-xl">
          <div className="flex items-center justify-between gap-3">
            <span className="bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
              Deck: {data.deck}
            </span>
            <span className="bg-[#ebe5d8] text-neutral-700 text-xs font-medium px-3 py-1.5 rounded-full">
              ID: {data.userId}
            </span>
          </div>

          <div className="bg-[#f7f3ec] rounded-2xl p-4 space-y-3">
            <p className="text-sm text-neutral-800">
              <span className="font-bold text-neutral-900 block mb-0.5">Front:</span>
              {data.front}
            </p>
            <hr className="border-[#ebe5d8]" />
            <p className="text-sm text-neutral-800">
              <span className="font-bold text-neutral-900 block mb-0.5">Back:</span>
              {data.back}
            </p>
          </div>

          {/* Review Actions */}
          <div className="flex gap-3 pt-2">
            <button 
              onClick={handleClear}
              className="flex-1 bg-[#ee6b58] hover:bg-[#e45a46] active:scale-[0.98] text-white font-bold rounded-2xl py-3 transition-transform"
            >
              Reject & Retry
            </button>
            <button 
              onClick={() => console.log('Save to inbox DB...')}
              className="flex-1 bg-[#f3c048] hover:bg-[#eab335] active:scale-[0.98] text-neutral-900 font-bold rounded-2xl py-3 transition-transform"
            >
              Accept Card
            </button>
          </div>
        </article>
      )}
    </section>
  );
}