import { Component, inject } from '@angular/core';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-donate',
  imports: [],
  template: `
    <section
      class="container mx-auto flex flex-col py-10 px-4 min-h-[calc(100dvh-56px-80px)]"
    >
      <h1 class="font-bold text-4xl text-center">
        از
        <span>آدامس کست</span>
        حمایت کنید
      </h1>
      <p class="text-center text-xl p-2">
        حمایت شما باعث میشه من بتونم قسمت های جدید تری رو برای شما بسازم و انتشار بدم و کار شما برای من خیلی ارزشمنده
      </p>

      <div class="grid grid-cols-2 md:grid-cols-3 md:mx-10 lg:w-1/2 lg:mx-auto mt-10">
        @for (item of items; track $index) {
          <a href="{{item.link}}" class="border-2 p-4 flex flex-col items-center gap-2 -mt-0.5 -mr-0.5 group hover:bg-secondary hover:text-white hover:z-1 hover:scale-105 hover:border-4 hover:border-[#FAF2DA] transition-all">
            <img [src]="'/images/' +item.image" alt="{{ item.text }}" class="w-full h-auto object-center object-cover my-auto" />
            <h2 class="font-bold mt-auto">{{ item.text }}</h2>

            <button class="text-white bg-secondary w-full h-10">
              {{item.price}}
            </button>
          </a>
        }
      </div>
    </section>
  `,
  styles: ``
})
export class DonateComponent {
  public items: IItem[] = [
    {
      image: '3.png',
      text: 'یک پیتزای خوشمزه',
      link: 'https://zarinp.al/554397',
      price: '350.000 تومان',
    },
    {
      image: '4.png',
      text: 'یک کتاب خوب',
      link: 'https://zarinp.al/554396',
      price: '150.000 تومن',
    },
    {
      image: '5.jpeg',
      text: 'یه دلار آمریکا',
      link: 'https://zarinp.al/554395',
      price: '110.000 تومان'
    },
    {
      image: '1.png',
      text: 'یه شات اسپرسو',
      link: 'https://zarinp.al/554394',
      price: '35.000 تومان',
    },
    {
      image: '2.png',
      text: 'بستنی عروسکی',
      link: 'https://zarinp.al/695491',
      price: '12.000 تومان'
    },
    {
      image: '6.jpg',
      text: 'دو هزار تومن',
      link: 'https://zarinp.al/496124',
      price: '2.000 تومان'
    }
  ];

  private seoService = inject(SeoService);

  constructor() {
    this.seoService.set({
      title: 'حمایت از ما',
      description: 'با حمایت مالی از آدامس کست، به من کمک کنید تا قسمت های جدید تری رو برای شما بسازم و انتشار بدم.',
      keywords: ['آدامس کست', 'حمایت مالی', 'پادکست'],
      image: '/logo.png',
      url: 'https://adamscast.ir/donate',
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'حمایت از ما',
        description: 'با حمایت مالی از آدامس کست، به من کمک کنید تا قسمت های جدید تری رو برای شما بسازم و انتشار بدم.',
        image: 'https://adamscast.ir/logo.png',
        url: 'https://adamscast.ir/donate',
      }
    });
  }
}

interface IItem {
  image: string
  text: string
  link: string
  price: string
}