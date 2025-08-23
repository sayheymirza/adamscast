import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardEpisodeRowComponent } from '../components/card-episode-row.component';
import { CardEpisodeComponent } from "../components/card-episode.component";
import { SectionInfoComponent } from '../components/section-info.component';
import { EpisodesService } from '../services/episodes.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [CardEpisodeComponent, CardEpisodeRowComponent, SectionInfoComponent, NgStyle, RouterLink],
  template: `
    <!-- hero section -->
    <section
      class="w-screen min-h-[calc(100dvh-56px-80px)] relative flex flex-nowrap items-center justify-center overflow-hidden"
      (mousemove)="onMouseMove($event)"
    >
        @for (item of heroEpisodes; track $index) {
          <div
            class="absolute hidden lg:block"
            [ngStyle]="heroEpisodesStyles[$index]"
          >
            <app-card-episode 
              [item]="item"
              class="w-[128px] h-[128px] md:w-[256px] md:h-[256px] transition-all hover:scale-110 opacity-75 hover:opacity-100"
            />
          </div>
        }

      <div class="flex flex-col items-center text-center gap-20 z-1">
        <h1 class="flex flex-col gap-4 whitespace-pre text-5xl sm:text-6xl md:text-8xl font-bold text-secondary text-stroke">
          <span>پادکست رو</span>
          <span>با هوش مصنوعی</span>
          <span class="text-primary">مثل آدامس بجو</span>
        </h1>

        <a 
          href="https://open.spotify.com/show/45AoksMoB8GmeCjHnkl8aa?si=af16144d20be4190"
          target="_blank"
          rel="noopener noreferrer"
          class="
            bg-secondary text-white fill-white text-lg transition-all
            rounded-lg
            flex flex-nowrap items-center gap-4
            h-14 px-4 outline-4 outline-[#DFD7C3]
            hover:bg-primary 
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M12 24c6.624 0 12-5.376 12-12S18.624 0 12 0 0 5.376 0 12s5.376 12 12 12zm4.872-6.344v.001c-.807 0-3.356-2.828-10.52-1.36-.189.049-.436.126-.576.126-.915 0-1.09-1.369-.106-1.578 3.963-.875 8.013-.798 11.467 1.268.824.526.474 1.543-.265 1.543zm1.303-3.173c-.113-.03-.08.069-.597-.203-3.025-1.79-7.533-2.512-11.545-1.423-.232.063-.358.126-.576.126-1.071 0-1.355-1.611-.188-1.94 4.716-1.325 9.775-.552 13.297 1.543.392.232.547.533.547.953a.938.938 0 0 1-.938.944zM4.548 6.998c4.523-1.324 11.368-.906 15.624 1.578 1.091.629.662 2.22-.498 2.22l-.001-.001c-.252 0-.407-.063-.625-.189C15.605 8.55 9.444 8.057 5.458 9.17c-.175.048-.393.125-.625.125-.639 0-1.127-.499-1.127-1.142 0-.657.407-1.029.842-1.155z"></path></g></svg>
          <strong>شنونده شوید</strong>
        </a>

        <button (click)="scrollToBottom()" role="button" class="group flex flex-col items-center justify-center gap-4 cursor-pointer">
          <strong class="relative top-0 transition-all group-hover:scale-125 group-hover:top-20">
            یکم بیا <span class="inline-block text-primary transition-all relative top-1 rotate-12 group-hover:top-0 group-hover:rotate-0">پایین</span> تر
          </strong>

          <svg class=" animate-bounce" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg>
        </button>
      </div>
    </section>

    <app-section-info class="container mx-auto my-20 px-10" />

    <section class="container mx-auto my-20 px-4 md:px-10">
      <h2 class="text-3xl md:text-4xl font-bold text-secondary mb-10">آخرین قسمت‌ها</h2>

      @for (item of episodesService.last(10); track $index) {
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
  `,
})
export class HomeComponent {
  public episodesService = inject(EpisodesService);
  private seoService = inject(SeoService);

  public get heroEpisodes(): any[] {
    // pick last 5 episodes
    const items = this.episodesService.latest;

    // Ensure heroEpisodesStyles has the correct number of elements and set initial positions
    if (this.heroEpisodesStyles.length !== items.length) {
      const defaultPositions = [
        { top: '15%', left: '15%', transform: `rotate(${Math.random() * 24 - 12}deg)` },        // Top-left
        { top: '5%', right: '5%', transform: `rotate(${Math.random() * 24 - 12}deg)` },       // Top-right
        { bottom: '20%', left: '5%', transform: `rotate(${Math.random() * 24 - 12}deg)` },     // Bottom-left
        { bottom: '15%', right: '15%', transform: `rotate(${Math.random() * 24 - 12}deg)` },    // Bottom-right
        { top: '5%', left: '45%', transform: `rotate(${Math.random() * 24 - 12}deg)` }          // Top-center-ish (adjust as needed)
      ];
      this.heroEpisodesStyles = items.map((_, index) => {
        // Get a base position, cycling through defaultPositions if more items than positions
        const basePosition = defaultPositions[index % defaultPositions.length];
        return { ...basePosition }; // Create a new object for each style
      });
    }
    return items;
  }

  public heroEpisodesStyles: any[] = []; // Initialize as empty, will be populated by get heroEpisodes

  // Define parallax factors for each card
  private parallaxFactors: number[] = [0.02, -0.015, 0.025, -0.01, 0.03]; // Adjust as needed

  onMouseMove(event: MouseEvent) {
    const { clientX, clientY } = event;
    if (typeof window !== 'undefined') {
      const { innerWidth, innerHeight } = window;

      const moveX = (clientX - innerWidth / 2);
      const moveY = (clientY - innerHeight / 2);

      this.heroEpisodesStyles.forEach((style, index) => {
        const factor = this.parallaxFactors[index % this.parallaxFactors.length]; // Cycle through factors if more cards than factors
        // Alternate direction for some cards for variety
        const translateX = index % 2 === 0 ? moveX * factor : moveX * -factor;
        const translateY = index % 2 === 0 ? moveY * factor : moveY * -factor;

        // Preserve existing style properties (like top, left) and update/add transform
        this.heroEpisodesStyles[index] = {
          ...style, // Spread the existing style (initial position)
          transform: `translate(${translateX}px, ${translateY}px) rotate(${style.transform ? style.transform.match(/rotate\(([^)]+)\)/)?.[1] : '0deg'})`
        };
      });
    }
  }

  constructor() {
    this.seoService.set({
      title: 'پادکست رو با هوش مصنوعی مثل آدامس بجو',
      description: 'پادکست رو یک پادکست فارسی است که به بررسی و تحلیل هوش مصنوعی و کاربردهای آن در زندگی روزمره می‌پردازد.',
      keywords: ['پادکست', 'هوش مصنوعی', 'AI', 'فناوری', 'تکنولوژی', 'NotebookLM'],
        image: 'https://adamscast.ir/logo.png',
      url: 'https://adamscast.ir',
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'پادکست رو با هوش مصنوعی مثل آدامس بجو',
        description: 'پادکست رو یک پادکست فارسی است که به بررسی و تحلیل هوش مصنوعی و کاربردهای آن در زندگی روزمره می‌پردازد.',
        image: 'https://adamscast.ir/logo.png',
        url: 'https://adamscast.ir'
      }
    });
  }

  public scrollToBottom() {
    if (typeof window != 'undefined') {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      })
    }
  }
}
