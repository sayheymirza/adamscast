import { Injectable } from '@angular/core';
import database from '../../../public/episodes/database.json';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {
  public items: IEpisode[] = database;
}

export interface IEpisode {
  episode: number
  title: string
  description: string
  thumbnail: string
  audio: string
}
