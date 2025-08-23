import { Component, inject } from '@angular/core';
import { EpisodesService } from '../services/episodes.service';
import { CardEpisodeRowComponent } from "../components/card-episode-row.component";
import { SeoService } from '../services/seo.service';
import { SectionInfoComponent } from "../components/section-info.component";

@Component({
  selector: 'app-episodes',
  imports: [CardEpisodeRowComponent, SectionInfoComponent],
  template: `
    <h2 class="text-3xl md:text-4xl font-bold text-secondary mb-10">همه قسمت ها</h2>

    @for (item of episodesService.items; track $index) {
      <app-card-episode-row 
        [item]="item"
      />
    }

    <app-section-info class="container mx-auto my-10 px-10" />
  `,
  host: {
    class: 'flex flex-col container mx-auto pt-10 min-h-[calc(100dvh-56px-80px)]'
  }
})
export class EpisodesComponent {
  public episodesService = inject(EpisodesService);
  private seoService = inject(SeoService);

}
