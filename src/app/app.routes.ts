import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'پادکست رو با هوش مصنوعی مثل آدامس بجو',
        loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'donate',
        title: 'حمایت و کمک به ادامه تولید پادکست',
        loadComponent: () => import('./pages/donate.component').then(m => m.DonateComponent),
    },
    {
        path: 'about',
        title: 'تاریخچه و داستان شکل‌گیری پادکست با هوش مصنوعی',
        loadComponent: () => import('./pages/about.component').then(m => m.AboutComponent),
    },
    {
        path: 'how',
        title: 'چطور یه قسمت تولید می کنم',
        loadComponent: () => import('./pages/how.component').then(m => m.HowComponent),
    },
    {
        path: 'episodes',
        title: 'آخرین قسمت‌ها',
        loadComponent: () => import('./pages/episodes.component').then(m => m.EpisodesComponent),
    },
    {
        path: 'episode/:slug',
        loadComponent: () => import('./pages/episode.component').then(m => m.EpisodeComponent),
    }
];
