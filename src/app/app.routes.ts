import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'پادکست رو بجو',
        loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'donate',
        title: 'حمایت',
        loadComponent: () => import('./pages/donate.component').then(m => m.DonateComponent),
    }
];
