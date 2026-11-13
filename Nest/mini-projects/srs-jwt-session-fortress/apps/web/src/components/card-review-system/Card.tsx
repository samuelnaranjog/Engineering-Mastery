import { useState } from "react"
import type { DbCard } from "@project/shared-types"
import type { CardReviewedDataSubmission } from "@project/shared-types";

interface CardProps {
  setCardIndex: Dispatch<SetStateAction<number>>;
  cardData: DbCard;
  submitCardReviwedInfo: (data: CardReviewedDataSubmission) => void;
}

export default function Card ({setCardIndex, cardData, submitCardReviwedInfo}: CardProps){
    const [isBack, setIsBack] = useState<boolean>(false)
    
    
    const {id: cardId, front, back } = cardData

    const onGrading = (selectedGrade: number)=>{
        // Trigger the submit
        setCardIndex((val : number) => val + 1)
        submitCardReviwedInfo({ cardId, difficulty: selectedGrade })
        setIsBack(false)
     
    }

    if (!isBack) {
        // Renders the front
        return (
            <div className="bg-[#ebe5d8] rounded-3xl p-6 shadow-sm w-full max-w-sm min-h-[420px] flex flex-col justify-between">
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4 space-y-2">
                    <h2 className="text-2xl font-black tracking-tight text-neutral-900">
                        Front
                    </h2>
                    <p className="text-sm text-neutral-800 leading-relaxed">
                        {front}
                    </p>
                </div>

                <button
                    type="button"
                    className="w-full bg-[#f3c048] hover:bg-[#eab335] active:scale-[0.98] text-neutral-900 font-bold rounded-2xl py-3 transition-all"
                    onClick={()=> setIsBack(true)}
                >
                    Check
                </button>
            </div>
        )
    }
    else {
        // Returns the back
        return (
            <div className="bg-[#ebe5d8] rounded-3xl p-6 shadow-sm w-full max-w-sm min-h-[420px] flex flex-col justify-between">
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4 space-y-2">
                    <h2 className="text-2xl font-black tracking-tight text-neutral-900">
                        Back
                    </h2>
                    <p className="text-sm text-neutral-800 leading-relaxed">
                        {back}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-4">
                    <button
                        type="button"
                        onClick={() => onGrading(1)}
                        className="bg-[#ee6b58] hover:bg-[#e45a46] active:scale-[0.98] text-white font-bold rounded-2xl py-3 transition-all"
                    >
                        1 · Again
                    </button>
                    <button
                        type="button"
                        onClick={() => onGrading(2)}
                        className="bg-[#f3c048] hover:bg-[#eab335] active:scale-[0.98] text-neutral-900 font-bold rounded-2xl py-3 transition-all"
                    >
                        2 · Hard
                    </button>
                    <button
                        type="button"
                        onClick={() => onGrading(3)}
                        className="bg-[#f3c048] hover:bg-[#eab335] active:scale-[0.98] text-neutral-900 font-bold rounded-2xl py-3 transition-all"
                    >
                        3 · Good
                    </button>
                    <button
                        type="button"
                        onClick={() => onGrading(4)}
                        className="bg-[#d8f3dc] hover:brightness-95 active:scale-[0.98] text-[#1b4332] font-bold rounded-2xl py-3 transition-all"
                    >
                        4 · Easy
                    </button>
                </div>
            </div>
        )
    }
}