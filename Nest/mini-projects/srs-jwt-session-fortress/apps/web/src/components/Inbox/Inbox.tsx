import InboxCard from "./InboxCard"
import type { CardInboxItem } from "@project/shared-types"
import {fetchBackend} from "../../api/client"
import { useState, useEffect } from "react";
export default function Inbox(){
    const [cards, setCards] = useState<CardInboxItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function loadCards() {
            try {
                const data = await fetchBackend.get<CardInboxItem[]>('/cards/inbox').then(res => res.data);

                if (isMounted) {
                setCards(data);

                    console.log("DEBUG: Access mounting of cards")
                }
                console.log("Retirve data: ", data)
            } catch (error) {
                console.error('Failed to fetch cards:', error);
            } finally {
                if (isMounted) {
                setIsLoading(false);
                }
            }
        }

        // Initial load
        loadCards();

        // Poll every 5 seconds
        const intervalId = setInterval(loadCards, 5000);;

    return () => {
      isMounted = false; // Prevents state updates if component unmounts
      clearInterval(intervalId); // Cleanup timer on unmount
    };
  }, []);

    const handleCardReviewed = (idToRemove: number)=>{
        setCards((prevCards) => 
            prevCards.filter((c) => c.id !== idToRemove)
        )
    }

  if (isLoading) {
    return <div>Loading cards...</div>;
  }

  if (cards.length === 0) {
    return <div>No cards in inbox!</div>;
  }

  

    return (
  <main className="min-h-screen bg-[#f4efe6] px-4 py-10 text-neutral-900">
    <div className="mx-auto max-w-md space-y-5">
      {/* 1. Header Section */}
      <header className="space-y-1">
        <h1 className="text-2xl font-black tracking-tight text-neutral-900">
          Card Reviewer Inbox
        </h1>
        <p className="text-base font-medium text-neutral-700">
          {cards.length} Pending Triage
        </p>

        {/* Security / Guard Badge */}
        <div className="pt-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d8f3dc] px-3 py-1 text-xs font-semibold text-[#1b4332]">
            <span>✔️</span> Cryptographic Ingest: HMAC-SHA256 &amp; Timestamp verified 🔒
          </span>
        </div>
      </header>

      {/* 2. Cards Feed Container */}
      <section className="space-y-4 pt-2">
        {cards.map((card) => (
          <InboxCard
            key={card.id}
            card={card}
            onReviewed={handleCardReviewed}
          />
        ))}
      </section>
    </div>
  </main>
);
}