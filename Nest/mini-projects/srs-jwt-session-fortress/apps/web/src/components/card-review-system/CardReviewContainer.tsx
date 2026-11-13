
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchBackend } from "../../api/client";
import Card from "./Card";
import { useMemo, useState } from "react";
import { queryClient } from "../../main";
import { toast } from 'sonner';
import axios from "axios";

import type { DbCard } from "@project/shared-types"
import type { CardReviewedDataSubmission } from "@project/shared-types";

export default function CardReviewContainer(){
    // This component should hold the data of the current cards on review
    // it should perform pagination
    
    // Intitlaize state and pass down
    const [cardIndex, setCardIndex] = useState<number>(0);

    const { data: cards, isPending, isError, error } = useQuery({
        queryKey: ['CardsToReviewToday'],
        queryFn: async () => {
                   const res = await fetchBackend.get<DbCard[]>('/cards/review-today-data');
                   return res.data;
                 },
    });

    // Handle submission of grades
    const submitCardReviwedInfo = useMutation({
        mutationFn: async (data: CardReviewedDataSubmission) => {
        const res = await fetchBackend.put('/cards/update-card-status', data);
        return res.data;
        },
        onSuccess: (data) => {
        },
        onError: (err: any) => {
            // Perform rollback in case of error
            setCardIndex((val : number) => val - 1)
            console.log('Try to Perform rollback')
            const message = 'Failed to save your review. Please try again.'
            

            toast.error(message);   
        },
    });

   // 2. Empty & completion guards
    if (!cards || cards.length === 0) return <div>No review pending today...</div>;
    if (cardIndex >= cards.length) {
        queryClient.invalidateQueries({queryKey: ['CardsToReviewToday']})
        return (<div>Session complete!</div>);
    }

    // 3. Derived directly on every render—no useMemo or listener needed
    const currentCard = cards[cardIndex];

    
    console.log('Received cards data', cards)

    if (isPending) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

return (
        <div className="flex flex-col items-center justify-center w-full min-h-[70vh] pt-29 space-y-8">
            <Card 
                setCardIndex={setCardIndex} 
                cardData={currentCard} 
                submitCardReviwedInfo={submitCardReviwedInfo.mutate} 
            />
        </div>
    );

}