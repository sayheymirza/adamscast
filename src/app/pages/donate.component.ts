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

    <section class="container mx-auto flex flex-col px-4 pb-10">
      <h2 class="mx-auto font-bold text-2xl mt-10 mb-4">شما ما رو حمایت کردید</h2>

      <div class="flex flex-col gap-4 md:mx-10 lg:w-1/2 lg:mx-auto">
        @for (item of donates; track $index) {
          <div class="flex flex-col gap-2 w-full p-4 bg-black/5 border-2 group">
            <a 
              href="{{item.link}}" 
              target="_blank"
              class="flex flex-nowrap items-center gap-4 cursor-pointer"
              rel="external sponsored"
            >
              <img src="{{item.image}}" alt="حمایت گر گرامی {{item.name}} در آدامس کست" 
              class="w-10 h-10 rounded-full object-center object-cover"
              />
              <strong>{{item.name}}</strong>

              <svg 
                xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                class="fill-red-500 -rotate-12 -ms-1 mb-3 animate-ping"
              >
                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>
              </svg>
            </a>

            <p>
              {{item.comment}}
            </p>

            <div class="flex flex-wrap items-center gap-2 mt-4">
              @for (item of item.items; track $index) {
                <div class="flex flex-nowrap items-center gap-1" title="{{item.count}} تا {{item.text}}">
                  <strong>X{{ item.count }}</strong>
                  <img [src]="'/images/' +item.image" alt="{{ item.text }}"  
                    class="w-8 h-8 object-center object-cover"
                  />
                </div>
              }
            </div>
          </div>
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
      text: 'یه پیتزای خوشمزه',
      link: 'https://zarinp.al/554397',
      price: '400.000 تومان',
    },
    {
      image: '4.png',
      text: 'یه کتاب خوب',
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
      price: '50.000 تومان',
    },
    {
      image: '2.png',
      text: 'بستنی عروسکی',
      link: 'https://zarinp.al/695491',
      price: '20.000 تومان'
    },
    {
      image: '6.jpg',
      text: 'دو هزار تومن',
      link: 'https://zarinp.al/496124',
      price: '2.000 تومان'
    }
  ];

  public donates: IDonate[] = [
    {
      image: 'https://khodmirza.ir/wp-content/uploads/2025/03/1613934304293-300x300.jpeg',
      name: 'خود میرزا',
      link: 'https://khodmirza.ir',
      comment: 'درسته من خودت تولید کننده این پادکست هستم ولی زمان هایی بوده که خودم رو حمایت هم کردم که این فعالیت رو پیش ببرم. خوش حالم از این پادکست که می تونه مفید باشه برای گروهی از آدم ها.',
      items: [
        {
          image: '4.png',
          text: 'یه کتاب خوب',
          link: 'https://zarinp.al/554396',
          price: '150.000 تومن',
          count: 2,
        },
      ]
    }
  ];

  private seoService = inject(SeoService);

  constructor() {
    this.seoService.set({
      title: 'حمایت و کمک به ادامه تولید پادکست',
      description: 'با حمایت مالی خود از پادکست آدامس کست، به تولید محتوا کمک کنید. هر حمایتی، گامی برای ادامه این مسیر است.',
      keywords: ['حمایت از پادکست', 'آدامس کست', 'حمایت مالی', 'پادکست فارسی', 'هوش مصنوعی', 'کمک مالی به تولید محتوا', 'دونیت پادکست'],
      image: '/logo.png',
      url: 'https://adamscast.ir/donate',
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'حمایت و کمک به ادامه تولید پادکست',
        description: 'با حمایت مالی خود از پادکست آدامس کست، به تولید محتوای فارسی کمک کنید. هر حمایتی، گامی برای ادامه این مسیر است.',
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
  count?: number
}

interface IDonate {
  image: string
  name: string
  link: string
  comment: string
  items: IItem[]
}