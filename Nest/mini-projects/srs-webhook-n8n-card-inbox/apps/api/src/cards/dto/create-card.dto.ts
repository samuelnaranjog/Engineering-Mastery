import type {CreateCard} from '@project/shared-types'

export class CreateCardDto implements CreateCard {
    
    front: string
    
    back: string
    deck: string
}