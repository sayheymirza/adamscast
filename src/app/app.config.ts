import { ApplicationConfig, provideZoneChangeDetection, isDevMode, Injectable } from '@angular/core';
import { provideRouter, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { provideClientHydration, Title, withEventReplay } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';

import { routes } from './app.routes';


@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`آدامس کست | ${title}`);
    }
  }
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategy
    }
  ]
};
