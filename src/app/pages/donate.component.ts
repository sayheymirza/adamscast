import { Component } from '@angular/core';

@Component({
  selector: 'app-donate',
  imports: [],
  template: `
    <section
      class="container mx-auto flex flex-col py-10 min-h-[calc(100dvh-56px-80px)]"
    >
      <h1 class="font-bold text-4xl text-center">
        از
        <span>آدامس کست</span>
        حمایت کنید
      </h1>
      <p class="text-center text-xl p-2">
        حمایت شما باعث میشه من بتونم قسمت های جدید تری رو برای شما بسازم و انتشار بدم و کار شما برای من خیلی ارزشمنده
      </p>

      <div class="grid grid-cols-3 w-1/2 mx-auto mt-10">
        @for (item of items; track $index) {
          <a href="{{item.link}}" class="border-2 p-4 flex flex-col items-center gap-2 -mt-0.5 -mr-0.5">
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
}

interface IItem {
  image: string
  text: string
  link: string
  price: string
}