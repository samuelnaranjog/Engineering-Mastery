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