import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { IEpisode } from '../services/episodes.service';

@Component({
  selector: 'app-card-episode',
  imports: [NgOptimizedImage],
  template: `
    <img 
      ngSrc="https://adamscast.ir/episodes/{{item().episode}}/thumbnail.png" alt="{{item().title}}" 
      width="256" height="256"
      class="w-full h-auto object-cover object-center"
      priority
    />
  `,
  host: {
    class: 'block overflow-hidden'
  }
})
export class CardEpisodeComponent {
  public item = input.required<IEpisode>();
}
