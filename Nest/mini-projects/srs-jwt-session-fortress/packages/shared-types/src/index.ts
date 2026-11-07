// packages/shared-types/src/index.ts
export interface CalculateInput {
  n1: number;
  n2: number;
}

export interface CalculateResult {
  result: number;
}

export interface CreateCard {
  front: string,
  back: string,
  deck: string,
}

export interface ReviewCard{
  status: string
}

export type { loginInfo } from './auth';

// 1. Runtime object (preserved as plain JS after type stripping)
export const CardStatus = {
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  PENDING: 'PENDING'
} as const;

// 2. Compile-time type union: 'ACCEPTED' | 'REJECTED' (stripped at runtime)
export type CardStatus = (typeof CardStatus)[keyof typeof CardStatus];


export interface CardInboxItem {
  id: number;
  deck: string;
  front: string;
  back: string;
  status: CardStatus;
  // Over HTTP/JSON, Date objects serialize to ISO-8601 strings
  receivedAt: Date; 
  reviewedAt: Date | null;
}