import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-info',
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <a routerLink="/about" class="flex flex-col items-center gap-2 p-4 text-center group">
        <img
          ngSrc="/images/about.png" alt="درباره آدامس کست از تاریخچه تا امروز"
          width="165"
          height="165"
          class="mb-4 rotate-6 transition-all group-hover:scale-150 group-hover:rotate-12"
        />

        <h3 class="text-xl font-bold group-hover:text-primary">
          درباره آدامس کست
        </h3>
        <p>اگر دوست دارید یکم درباره تاریخچه خود ما بیشتر بدونید</p>
      </a>

      <a routerLink="/how" class="flex flex-col items-center gap-2 p-4 text-center group">
        <img 
          ngSrc="/images/how.png" alt="روند تولید قسمت های آدامس کست"
          width="165"
          height="165"
          class="mb-4 -rotate-6 transition-all group-hover:scale-150 group-hover:-rotate-12"
        />
        <h3 class="text-xl font-bold group-hover:text-primary">
          روند تولید قسمت
        </h3>
        <p>چطور ما یه قسمت از پادکست رو تولید می کنید</p>
      </a>

      <a href="https://forms.gle/Qp3a5v5VFmStueTg6" target="_blank" class="flex flex-col items-center gap-2 p-4 text-center group">
        <img 
          ngSrc="/images/feedback.png" alt="نظر و پیشنهادات شنوندگان آدامس کست"
          width="165"
          height="165"
          class="mb-4 -rotate-6 transition-all group-hover:scale-150 group-hover:-rotate-12"
        />
        <h3 class="text-xl font-bold group-hover:text-primary">
          ارتباط سازی کنید
        </h3>
        <p>
          اگر نظر یا پیشنهاد و حتی درخواست یک قسمت ویژه دارید
        </p>
      </a>
  `,
  host: {
    class: 'grid sm:grid-cols-3 gap-4 sm:gap-10'
  }
})
export class SectionInfoComponent {

}
