---
layout: single
type: post
comments: true
date: 2020-11-12 11:30:12 +0330
jdate: 1399-08-22
title: شخصی سازی گراب
author: aminyousefnejad
image: /img/kraski-kisti-tsveta-bumaga.jpg
categories:
    - لینوکس
tags:
    - لینوکس
    - شخصی سازی
---

آکام قبلا یه پست در مورد شخصی سازی میزکار های مختلف نوشته منم گفتم ادامه ش بدم شاید بازم ادامه داشته باشه . باید بگم شخصی سازی توزیع های گنو/لینوکس اینجا تموم نمی شه و حتی از همون صفحه گراب هم دست شما تو شخصی سازی باز گذاشته شده . دیگه کم مونده قابلیت عوض کردن رنگ دیوارای اتاقمونم اضافه کنن ! 

<div id="read-more"></div>

GNU GRUB یا خودمونی تر گراب ، در واقع بوت لودره که اولین نرم افزاری که بعد از روشن شدن کامپیوتر اجرا میشه . کارشم لود کردن و واگذر کردن کنترل سیستم به کرنله .  گراب می تونه سیستم عامل هایی که رو هاردتون نصب هست رو شناسایی بکنه و اجازه می ده که هنگام بوت سیستم عامل های مختلف و حتی ورژن های مختلف کرنل  یه سیستم عاملو انتخاب کنید. 

در حالت عادی بسته به توزیعی که نصب کردید ، گراب یه صفحه بنفش ، سیاه یا آبی رنگه که خیلی باحال نیس . اما جای نگرانی نیست . برنامه نویسیای گراب آدمای خیلی باحالی بودن و تصمیم گرفتن پشیبانی از تمم اضافه کنن . به لطف جامعه خلاق و با استعداده گنو/لینوکس کلی تم واسه گراب هست اگرم هیچ کدومو نپسندید مشکلی نیست خودتون دست به کار بشید ! 



## [تم   مک ](https://www.gnome-look.org/p/1443844/)

![mac_grub_theme](/img/grub-themes/1.png)

## [تم  Xenlism](https://www.gnome-look.org/p/1440862/)

![xenlism_grub_theme](/img/grub-themes/2.jpg)

## [تم  Sleek](https://www.gnome-look.org/p/1414997/)

![sleek_grub_theme](/img/grub-themes/3.png)

## [تم vimix](https://www.gnome-look.org/p/1009236/)

![vimix_grub_theme](/img/grub-themes/4.jpg)

## [تم Tela](https://www.gnome-look.org/p/1307852/)

![tela_grub_theme](/img/grub-themes/5.jpg)

**[There is MOREEEEEEEE !](https://www.gnome-look.org/browse/cat/109/ord/latest/)**

تمی که دانلود میکنید معمولا یه اسکریپ اینستالر داره که خودش همه کارارو انجام میده . فقط شایده احتیاج باشه که پرمیشن اجرا بدید بهش که اونم اینطوریه(حتما باید با sudo اجرا کنید این اسکریپتو):

```sh
chmod 772 install.sh
sudo ./install.sh
```

بعد ریستارت کنید و باید صفحه گرابتون تغییر کرده باشه . 

# نصب Grub Customizer 

گراب کاستومایزر یه واسط گرافیکی واسه کانفیگ کردن گراب هست . با این برنامه می تونید بوت انتری هارو حذف، تغییر نام و ترتبشونو عوض کنید . به کسایی که تازه با گنو/لینوکس آشنا شدن برنامه خوبیه و کار کردن باهاش خیلی راحته . می تونید دیفالت بوت ، بوت تایم اوت و خیلی چیزای دیگه رو هم تغییر بدید .  

![grub-customizer](/img/grub-themes/grub-customizer.png)

از اوبونتو ۱۹٫۰۱ به بعد تو ریپوزیتوری خود اوبونتو هست واسه ورژنای پایین تر اوبونتو باید ریپوزیتوری ppa اضافه کنید . 

```sh
sudo apt update 
sudo apt install grub-customizer
## Older version of Ubuntu 
sudo add-apt-repository ppa:danielrichter2007/grub-customizer
sudo apt-get update 
sudo apt-get install grub-customizer
```

