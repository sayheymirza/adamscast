import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { EpisodesService } from './services/episodes.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'episode/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const episodesService = inject(EpisodesService);

      return episodesService.items.map(e => ({
        slug: e.slug
      }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
