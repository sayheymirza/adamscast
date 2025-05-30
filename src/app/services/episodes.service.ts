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

  public last(count: number = 1): IEpisode[] {
    return this.items.slice(0, count);
  }

  public oneBySlug(slug: string): IEpisode | undefined {
    return this.items.find(item => item.slug === slug);
  }
}

export interface IMindmapNode {
  name: string;
  children?: IMindmapNode[];
}

export interface IEpisode {
  episode: number
  title: string
  description: string
  thumbnail: string
  audio: string
  mindmap?: IMindmapNode
  duration: string
  slug: string
}
