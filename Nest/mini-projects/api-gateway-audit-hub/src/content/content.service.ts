import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto.js';
import { UpdateContentDto } from './dto/update-content.dto.js';
import  {Article, initialArticles} from './entities/articles.entity.js'

@Injectable()
export class ContentService {
  private articles: Article[] = [...initialArticles]

  findAll() {
    return this.articles;
  }

  findByOwner(owner: string ){
    const ownerArticles = this.articles.filter(article => article.owner == owner)
    return ownerArticles
  }


}
