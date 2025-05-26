import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <nav class="container mx-auto flex items-center justify-between h-20">
      <a routerLink="/" class="flex flex-nowrap items-center gap-4">
        <img 
          ngSrc="logo.png" 
          alt="لوگوی آدامس کست" 
          width="85"
          height="85"
        />

        <strong class="text-xl">آدامس کست</strong>
      </a>

      <div class="flex-1"></div>

      <a
        routerLink="/donate" 
        class="
          text-secondary text-lg transition-all 
          border-2 border-secondary rounded-lg 
          h-10 px-4 flex items-center
          outline-4 outline-[#DFD7C3]
          -rotate-4
          hover:bg-secondary hover:text-white hover:rotate-0
        ">
        حمایت کنید
      </a>
    </nav>
  `,
  styles: ``
})
export class HeaderComponent {

}
