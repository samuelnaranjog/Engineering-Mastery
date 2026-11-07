import { ReviewCard, CardStatus } from "@project/shared-types";
import { IsEnum, IsNotEmpty} from "class-validator";

export class ReviewCardDto {
  @IsNotEmpty()
  @IsEnum(CardStatus, {
    message: 'status must be a valid CardStatus value (ACCEPTED, REJECTED)',
  })
  status: CardStatus;
}