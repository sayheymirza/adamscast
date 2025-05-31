import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardEpisodeRowComponent } from '../components/card-episode-row.component';
import { MindmapComponent } from "../components/mindmap/mindmap.component";
import { SectionInfoComponent } from '../components/section-info.component';
import { EpisodesService } from '../services/episodes.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-episode',
  imports: [NgOptimizedImage, CardEpisodeRowComponent, SectionInfoComponent, MindmapComponent, RouterLink],
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

      <p class="text-lg md:text-xl text-secondary mb-10 md:w-1/2 text-center">
        {{item.description}}
      </p>

      <!-- audio -->
      <audio controls class="w-full max-w-2xl">
        <source src="{{item.audio}}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>

    @if(item.mindmap) {
      <app-mindmap 
        class="w-full max-w-2xl"
        [nodes]="item.mindmap"
      />
    }

    <section class="container mx-auto my-20 px-4 md:px-10">
      <h2 class="text-3xl md:text-4xl font-bold text-secondary mb-10">آخرین قسمت‌ها</h2>

      @for (item of episodesService.latest; track $index) {
        <app-card-episode-row 
          [item]="item"
        />
      }

      <a routerLink="/episodes" class="text-primary group text-center flex items-center justify-center gap-4 mt-10">
        <strong class="transition-all rotate-12 scale-105 group-hover:rotate-0 group-hover:scale-100">مشاهده</strong>
        <strong class="transition-all rotate-6 scale-150 group-hover:rotate-0 group-hover:scale-100 group-hover:-mx-2">همه</strong>
        <strong class="transition-all -rotate-6 scale-80 group-hover:rotate-0 group-hover:scale-100">قسمت ها</strong>
      </a>
    </section>

    <app-section-info class="container mx-auto my-10 px-10" />
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
