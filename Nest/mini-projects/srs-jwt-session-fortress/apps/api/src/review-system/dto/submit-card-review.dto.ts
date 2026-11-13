import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class UpdateCardSchedulerDto {
  @IsInt()
  @IsNotEmpty()
  cardId: number;

  @IsInt()
  @Min(1)
  @Max(4)
  @IsNotEmpty()
  difficulty: number;
}