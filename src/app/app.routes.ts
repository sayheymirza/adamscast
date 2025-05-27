import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'پادکست رو با هوش مصنوعی مثل آدامس بجو',
        loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'donate',
        title: 'حمایت از ما',
        loadComponent: () => import('./pages/donate.component').then(m => m.DonateComponent),
    },
    {
        path: 'episode/:slug',
        loadComponent: () => import('./pages/episode.component').then(m => m.EpisodeComponent),
    }
];
