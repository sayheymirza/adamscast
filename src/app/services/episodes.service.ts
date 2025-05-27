import { Injectable } from '@angular/core';
import database from '../../../public/episodes/database.json';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {
  public items: IEpisode[] = database.reverse();

  public get latest(): IEpisode[] {
    return this.items.length < 5 ?
      this.items :
      this.items.slice(0, 5);
  }

  public oneBySlug(slug: string): IEpisode | undefined {
    return this.items.find(item => item.slug === slug);
  }
}

export interface IEpisode {
  episode: number
  title: string
  description: string
  thumbnail: string
  audio: string
  duration: string
  slug: string
}
