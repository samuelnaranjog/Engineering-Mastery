import { CardStatus, type CardInboxItem, type ReviewCard } from "@project/shared-types"
import { fetchBackend } from "../../api/client"


interface CardProps {
  card: CardInboxItem;
  onReviewed: (id: number) => void;
}

export default  function InboxCard ({card, onReviewed}: CardProps){

    const cardAction = async (action: CardStatus) =>{

        
        console.log("DEBUG INBOX CARD: action to perform:", action)
        const payload: ReviewCard  = {status: action} 
        console.log("DEBUG INBOX CARD: payload:", payload)
        try{
            // 1. Type it as the actual item the database returns
            const returnedCard: CardInboxItem = await fetchBackend.post(`/cards/${card.id}/decision`, payload);

            // 2. Access the properties directly on the returned object
            console.log(`Card with id: ${returnedCard.id} Status updated to ${returnedCard.status}`);

            if (returnedCard && returnedCard.status === action) {
                onReviewed(card.id); 
            }
            
        }
        catch (error) {
            console.log('This is the value of card', card)
            console.error(`Failed to update card #${card.id}:`, error);
            // Optional: alert user or add rollback logic if request fails
        }
        
        
    }
    return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
            <div className="bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">DECK: {card.deck.toUpperCase()}</div>
            <div className="bg-[#ebe5d8] text-neutral-700 text-xs font-medium px-3 py-1.5 rounded-full">CARD ID: #{card.id}</div>
        </div>

        <div className="bg-[#f7f3ec] rounded-2xl p-4 space-y-2 mb-5">
            <p className="text-sm text-neutral-800"><strong className="font-bold text-neutral-900 mr-1">Front:</strong>{card.front}</p>
            <p className="text-sm text-neutral-800"><strong className="font-bold text-neutral-900 mr-1">Back:</strong>{card.back}</p>
        </div>
        
        <button className="bg-[#f3c048] hover:bg-[#eab335] active:scale-[0.98] text-neutral-900 font-bold rounded-2xl py-3 w-[48%] mr-[4%]" onClick={() => cardAction(CardStatus.ACCEPTED)}>Accept Card</button>
        <button className="bg-[#ee6b58] hover:bg-[#e45a46] active:scale-[0.98] text-white font-bold rounded-2xl py-3 w-[48%]" onClick={() => cardAction(CardStatus.REJECTED)}>Reject Card</button>
    </div>
)
}

