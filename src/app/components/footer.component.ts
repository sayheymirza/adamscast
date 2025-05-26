import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer>
      <div class="container mx-auto h-14 flex items-center justify-between">
        <p>&copy; 1404 آدامس کست - تمامی حقوق محفوظ است</p>
        <p>کاری از <a class="text-primary" href="https://khodmirza.ir" rel="follow sponsor">خود میرزا</a></p>
      </div>
    </footer>
  `,
  styles: ``
})
export class FooterComponent {

}
