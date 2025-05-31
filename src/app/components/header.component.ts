import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <nav class="container mx-auto flex items-center justify-between px-4 h-20">
      <a routerLink="/" class="flex flex-nowrap items-center md:gap-2 group -mr-4 md:mr-0">
        <img 
          ngSrc="logo.png" 
          alt="لوگوی آدامس کست" 
          width="85"
          height="85"
          class="group-hover:-rotate-12 transition-all ease-in-out"
        />

        <strong class="text-xl">
          <span class="inline-block relative top-0 right-0 transition-all group-hover:scale-200 group-hover:rotate-12 group-hover:opacity-0 group-hover:-top-10 group-hover:-right-10">آدامس</span>
          &nbsp;
          <span class="inline-block relative top-0 left-0 transition-all group-hover:scale-200 group-hover:-rotate-12 group-hover:opacity-0 group-hover:-top-10 group-hover:-left-10">کست</span>
        </strong>
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
