import { NgOptimizedImage } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardEpisodeRowComponent } from '../components/card-episode-row.component';
import { EpisodesService } from '../services/episodes.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-episode',
  imports: [NgOptimizedImage, CardEpisodeRowComponent],
  template: `
    @if(item) {
      <img 
        ngSrc="{{item.thumbnail}}" alt="{{item.title}}" 
        width="256" height="256"
        class="object-cover object-center rotate-12"
        priority
      />

      <h2 class="text-3xl md:text-4xl font-bold text-secondary mt-10 mb-5">
        {{item.title}}
      </h2>

      <p class="text-lg md:text-xl text-secondary mb-10 w-1/2 text-center">
        {{item.description}}
      </p>

      <!-- audio -->
      <audio controls class="w-full max-w-2xl">
        <source src="{{item.audio}}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>

    <section class="container mx-auto my-20 px-10">
      <h2 class="text-3xl md:text-4xl font-bold text-secondary mb-10">آخرین قسمت‌ها</h2>

      @for (item of episodesService.latest; track $index) {
        <app-card-episode-row 
          [item]="item"
        />
      }
    </section>
    }
  `,
  host: {
    class: 'flex flex-col items-center justify-start min-h-[calc(100dvh-56px-80px)]',
  }
})
export class EpisodeComponent {
  public episodesService = inject(EpisodesService);
  private activatedRoute = inject(ActivatedRoute);
  private seoService = inject(SeoService);

  public item: any;

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      const slug = params['slug'];

      if (slug) {
        this.item = this.episodesService.oneBySlug(slug);

        this.seoService.set({
          title: this.item.title,
          description: this.item.description,
          image: this.item.thumbnail,
          url: `https://adamscast.ir/episode/${slug}`,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'PodcastEpisode',
            title: this.item.title,
            description: this.item.description,
            image: this.item.thumbnail,
            audio: {
              '@type': 'AudioObject',
              url: this.item.audio
            }
          }
        });
      }
    });
  }
}
