import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header.component";
import { FooterComponent } from "./components/footer.component";

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
}
