import { Component, input } from '@angular/core';
import { IEpisode } from '../services/episodes.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-card-episode',
  imports: [NgOptimizedImage],
  template: `
    <img 
      ngSrc="{{item().thumbnail}}" alt="{{item().title}}" 
      width="256" height="256"
    />
  `,
  host: {
    class: 'block overflow-hidden'
  }
})
export class CardEpisodeComponent {
  public item = input.required<IEpisode>();
}
