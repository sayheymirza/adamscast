import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IEpisode } from '../services/episodes.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-card-episode-row',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  template: `
    <a 
      routerLink="/episode/{{ item().slug }}"
      class="flex flex-nowrap md:items-center gap-4 p-4 min-h-16 relative border-b group"
    >
          <span class="text-primary text-2xl font-bold">
            {{item().episode}}
          </span>

          <div class="flex flex-col flex-1 text-sm">
            <strong class="group-hover:text-primary">{{item().title}}</strong>
            <p>{{item().description}}</p>
          </div>

          <img 
            ngSrc="https://adamscast.ir/episodes/{{item().episode}}/thumbnail.png" alt="{{item().title}}" 
            width="128" height="128"
            class="object-cover object-center absolute left-20 -rotate-12 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all"
            priority
          />

          <svg class="group-hover:fill-primary hidden md:block" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>
        </a>
  `,
  host: {
    class: 'block'
  }
})
export class CardEpisodeRowComponent {
  public item = input.required<IEpisode>();
}
