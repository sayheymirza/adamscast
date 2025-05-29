import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header.component";
import { FooterComponent } from "./components/footer.component";
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <router-outlet />
    <app-footer />
  `,
})
export class AppComponent {
  private router = inject(Router);
  private swUpdate = inject(SwUpdate);

  constructor() {
    this.router.events.subscribe(event => {
      // if rotate end scroll to top
      if (event.constructor.name === 'NavigationEnd' && typeof window !== 'undefined') {
        window.scroll({
          top: 0,
          behavior: 'smooth'
        });
      }
    });

    // Check for service worker updates
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type == 'VERSION_DETECTED' && confirm('قسمت جدید رسید. می خواهید دریافت کنید ؟')) {
          this.swUpdate.activateUpdate().then(() => {
            window.location.reload();
          });
        }
      });
    }
  }
}
