import { Component, inject } from '@angular/core';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-how',
  imports: [],
  template: `
    <h1 class="mx-auto font-bold text-3xl text-center mb-10">
      چطور یه قسمت تولید می کنم ؟
    </h1>

    <div class="flex flex-nowrap md:items-center gap-4 md:gap-10 md:mx-10 lg:w-1/2 lg:mx-auto">
      <strong class="h-fit text-5xl md:text-9xl text-primary rotate-12">1</strong>

      <div class="flex flex-col gap-2">
        <h2 class="text-3xl font-bold">در جستجو مطلب</h2>
        
        <p class="text-lg">
          من سوالی برایم بوجود می آید. تشنیه ی دانستن و کنکجاوی هستم.
          ساعت ها در اینترنت و کتاب ها و مقاله ها به دنبال نتیجه می گردم.
          در ذهنم یا دفتری به عنوان چرک نویس، مطلب را جمع می کنم.
          آن را شاید در وبلاگ خودم بنویسم.
          یا دانسته جدیدم را با بقیه در هنگام گفتگو انتقال می دهم.
        </p>
      </div>
    </div>

    <div class="flex flex-nowrap md:items-center gap-4 md:gap-10 md:mx-10 lg:w-1/2 lg:mx-auto">
      <div class="flex flex-col gap-2">
        <h2 class="text-3xl font-bold">پادکست سازی با هوش مصنوعی</h2>
        
        <p class="text-lg">
          به سراغ نوت بوک ال ام می روم. جایی که لینک یا متن های منابع مطلب را بهش می دهم.
          با درکی که از منبع ها بدست می آورد بازی می کنم تا بتواند پادکست پر محتوایی را بسازد.
          سپس تعریف می کنم که خروجی باید چگونه باشد.
          در نهایت با یک دکمه پادکست را تولید می کند.
        </p>

        <ul class="list-disc list-inside">
          <li>اول اسم پادکست "آدامس کست" را اعلام کن</li>
          <li>به هیچ عنوان نگو منبع این را گفته است</li>
          <li>در پایان از شنوده چند سوال بپرس</li>
          <li>...</li>
        </ul>
      </div>

      <strong class="h-fit text-5xl md:text-9xl text-primary -rotate-12">2</strong>
    </div>

    <div class="flex flex-nowrap md:items-center gap-4 md:gap-10 md:mx-10 lg:w-1/2 lg:mx-auto">
      <strong class="h-fit text-5xl md:text-9xl text-primary rotate-12">3</strong>

      <div class="flex flex-col gap-2">
        <h2 class="text-3xl font-bold">تصویر بنداگشتی ساختن</h2>
        
        <p class="text-lg">
          لوگوی آدامس کست را به هوش مصنوعی کوپایلوت ماکروسافت می دهم. ازش می خواهم تصویری به این شکل بساز و حتما به شکل استیکر باشد مانند تصویر ضمینه شده و بدون پس زمینه.
          سپس با چند بار درخواست و تغییرات، تصویری که می خواهم را می سازد.
          در نهایت با سایت من عاشق تصویر هستم، تصویر را کوچک و فشرده سازی می کنم.
        </p>
      </div>
    </div>

    <div class="flex flex-nowrap md:items-center gap-4 md:gap-10 md:mx-10 lg:w-1/2 lg:mx-auto">
      <div class="flex flex-col gap-2">
        <h2 class="text-3xl font-bold">بررسی نتایج</h2>
        
        <p class="text-lg">
          بعد از مدتی که فایل صوتی پادکست را تولید شد، آن را گوش می دهم.
          اگر ایرادی داشت، دوباره به نوت بوک ال ام می دهم تا اصلاح کند.
          سپس فایل صوتی را دانلود می کنم.
          در لب تاب خودم فرمت فایل را تغییر می دهم.
          با فشرده سازی سراغ فایل صوتی می روم.
          و تمام.        
        </p>
      </div>

      <strong class="h-fit text-5xl md:text-9xl text-primary -rotate-12">4</strong>
    </div>


    <div class="flex flex-nowrap md:items-center gap-4 md:gap-10 md:mx-10 lg:w-1/2 lg:mx-auto">
      <strong class="h-fit text-5xl md:text-9xl text-primary rotate-12">5</strong>

      <div class="flex flex-col gap-2">
        <h2 class="text-3xl font-bold">انتشار می دهم</h2>
        
        <p class="text-lg">
          به سراغ یک هوش مصنوعی دیگر می روم. 
          متن مطلب را بهش می دهم.
          ازش می خواهم عنوان و خلاصه یک جمله ای و برجسب ها را تولید کند.
          سپس به سراغ اسپوتیفای برای سازنده ها می روم.
          قسمت جدید را آپلود می کنم.
          عنوان و خلاصه را در آن می زنم.
          تصویر را هم آپلود می کنم.
          در نهایت قسمت جدید را منتشر می کنم.
          لینک را کپی و در کانال تلگرام می فرستم.
          و همین روند را برای سایت پیش می برم.
        </p>
      </div>
    </div>


    <blockquote class="text-center font-bold text-xl">
      این بود تمام روند تولید هر قسمت از پادکست آدامس کست
    </blockquote>
  `,
  host: {
    class: 'flex flex-col gap-20 container mx-auto px-4 py-10 min-h-[calc(100dvh-56px-80px)]'
  }
})
export class HowComponent {
  private seoService = inject(SeoService);

  constructor() {
    this.seoService.set({
      title: 'چطور یک قسمت پادکست را تولید می کنم',
      description: 'مراحل کامل تولید یک قسمت از پادکست آدامس کست را کشف کنید. از جستجوی ایده و استفاده از ابزارهای هوش مصنوعی مانند نوت بوک ال ام تا ساخت تصویر و انتشار نهایی در اسپوتیفای.',
      keywords: ['پادکست آدامس کست', 'تولید پادکست', 'ساخت پادکست با هوش مصنوعی', 'مراحل ساخت پادکست', 'نوت بوک ال ام', 'NotebookLM', 'هوش مصنوعی در تولید محتوا', 'پادکست فارسی AI', 'روند تولید محتوا'],
      image: 'https://adamscast.ir/logo.png',
      url: 'https://adamscast.ir/how',
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'چطور یک قسمت پادکست را تولید می کنم',
        description: 'مراحل کامل تولید یک قسمت از پادکست آدامس کست را کشف کنید. از جستجوی ایده و استفاده از ابزارهای هوش مصنوعی مانند نوت بوک ال ام تا ساخت تصویر و انتشار نهایی در اسپوتیفای.',
        image: 'https://adamscast.ir/logo.png',
        url: 'https://adamscast.ir/how'
      }
    });
  }
}
