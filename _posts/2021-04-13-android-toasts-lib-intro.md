---
date: 2021-04-13 10:01:01 +0330
jdate: 1400-01-24
title: معرفی ۷ کتابخانه اندروید برای ساختن Toast
author: akamohebbi
categories:
    - آموزش برنامه نویسی اندروید
tags:
    - معرفی
    - آموزش برنامه نویسی اندروید
    - کتابخانه های اندرویدی
image: /uploads/android-toast-libs-intro/android_toast_example_linux98ir.jpeg
---

تا قبل از اندروید ۵ که گوگل متریال دیزاین رو معرفی کرد توسعه دهنده  های اندروید خیلی خوب می تونستن از Toast ها استفاده کنن (البته حالا هم  استفاده می کنن و بعد از معرفی Snackbar و متد های جدید طراحی ظاهر برنامه  دیگه یجورایی Toast داره فراموش میشه) صد البته که کتابخانه های شخصی ثالث خفنی هم در  کنار SDK استاندارد وجود داشت. شاید Toast استاندارد تو اندروید دیگه به قولی دولوپریش deprecated شده باشه اما بازم هستن کتابخونه خفن هایی که میشه ازشون استفاده کرد و بعضی هاشون هنوزم در حال توسعه هستن.

> تو فیلم خارجی ها دیدن یارو بلد میشه مثلا لیوانش رو میاره بالا و شروع می  کنه یه حرفی رو زدن و بقیه هم بهش گوش میدن. فک کنم به این می گن Toast.

خودم تاحالا از این کتابخونه های استفاده نکردم و این یجورایی برای منم  جدید هستن و خیلی زیاد مشتاقم تو یکی از پروژه های که می خوام انجام بدم  ازشون استفاده کنم و علاوه بر بهتر کردن ظاهر برنامه قابلیت های بیشتری هم  بهش اضافه کنم. خدا می دونه که تا قبل از آشنایی با این کتابخونه های چه  دهنی ازم سرویس شده بود واسه ساختن یه Toast با استایلی که می خوام. تو این پست قصد دارم ۷ مورد از بهترین کتابخونه های اندروید برای ساختن Toast های خفن رو معرفی کنم.

<div id="read-more"></div>

## [DynamicToast](https://github.com/pranavpandey/dynamic-toasts)

{%
	include helpers/image.html
	src="/uploads/android-toast-libs-intro/dynamictoast_example_linux98ir.png"
	alt="نمونه Toast های ساخته شده با کمک کتابخانه اندروید DynamicToast"
%}

این کتابخونه خیلی جالبه چون از اندروید ۹ به بالا میشه ازش استفاده کرد و  تو دو تا ورژن مختلف هم عرضه شده. برای پروژه هایی که از AndroidX (وات د  هل .. این دیگه چیه؟!!) و پروژه هایی با ورژن پایین تر. تو اسکرین شات بالا هم که دیگه کامل قدرت این کتابخاونه رو می بینید و شما می تونید رنگ پس  زمینه، اندازه یا نوع فونت پیام و آیکن رو تغیر بدید. در ادامه یه مثال هم  ازش ببینید بد نیست.

```java
DynamicToast.Config.getInstance()
    // Background color for default toast.
    .setDefaultBackgroundColor(@ColorInt int defaultBackgroundColor)
    // Tint color for default toast.
    .setDefaultTintColor(@ColorInt int defaultTintColor)
    // Background color for error toast.
    .setErrorBackgroundColor(@ColorInt int errorBackgroundColor)
    // Background color for success toast.
    .setSuccessBackgroundColor(@ColorInt int successBackgroundColor)
    // Background color for warning toast.
    .setWarningBackgroundColor(@ColorInt int warningBackgroundColor)
    // Custom icon for error toast. Pass `null` to use default icon.
    .setErrorIcon(@Nullable Drawable errorIcon)
    // Custom icon for success toast. Pass `null` to use default icon.
    .setSuccessIcon(@Nullable Drawable successIcon)
    // Custom icon for warning toast. Pass `null` to use default icon.
    .setWarningIcon(@Nullable Drawable warningIcon)
    // Disable icon for all the toasts.
    .setDisableIcon(boolean disableIcon)
    // Custom icon size in `pixels` for all the toasts.
    .setIconSize(int iconSize)
    // Custom text size in `SP` for all the toasts.
    .setTextSize(int textSize)
    // Custom text typeface for all the toasts. Pass `null` to use system typeface.
    .setTextTypeface(@Nullable Typeface textTypeface)
    // Custom background drawable for all the toasts. Pass `null` to use default background.
    .setToastBackground(@Nullable Drawable toastBackground)
    // Apply customisations.
    .apply();
```

اگر سری به [مخزن پروژه DynamicToast در گیت هاب](https://github.com/pranavpandey/dynamic-toasts) بزنید اطلاعات بیشتری می تونید ببینید و اونجوری که من دیدم خیلی خوب و به همراه مثال توضیح داده شده. هرچند نهایتا زیاد مهم نیست ولی توسعه دهنده  این کتابخونه Pranav Pandey از هند هست. ممنون ازش که همچین کتابخونه خفنی  رو ساخته.

## [Noty](https://github.com/emre1512/Noty)

{%
	include helpers/image.html
	src="/uploads/android-toast-libs-intro/noty_example_linux98ir.png"
	alt="نمونه Toast های ساخته شده با کمک کتابخانه اندروید Noty"
%}

کتابخونه Noty بیشتر شبیه یه Snackbar بشدت قابل شخصی سازیه تا یه کتابخونه Toast. اینجا فقط به یک مثال اشاره می کنم که در ساده ترین حالت یه  Toast درست می کنه.

```java
Noty.init(YourActivity.this, "Your warning message", yourLayout, Noty.WarningStyle.SIMPLE).show();
```

بهترین کار اینه که حتما به [مخزن پروژه Noty در گیت هاب](https://github.com/emre1512/Noty) سر بزنید. اونجا طبق معمول اطلاعات خیلی بیشتری به همراه مثال و فایل ها گیف از نحوه عملکرد مثال هاش داره.

## [SimpleToast](https://github.com/Pierry/SimpleToast)

{%
	include helpers/image.html
	src="/uploads/android-toast-libs-intro/simpletoast_example_linux98ir.png"
	alt="نمونه Toast های ساخته شده با کمک کتابخانه اندروید SimpleToast"
%}

راستش از نظر خودم این کتابخونه چندان جالب نیست و قیافه Toast هاش خیلی  دمده شدن ولی خب بازم قیافه دلیل بر ضعیف بودن نیست و می تونید ازش تو  پروژه هاتون استفاده کنید که خیلی زیاد هم ساده است. اگر با Toast درست  کردن در اندروید آشنا باشید با یه به نمونه کدهای پایین خواهید دید که چقدر ساده میشه ازش استفاده کرد.

```java
SimpleToast.ok(Context, CharSequence);
SimpleToast.error(Context, CharSequence);
SimpleToast.info(Context, CharSequence);
SimpleToast.muted(Context, CharSequence);
SimpleToast.warning(Context, CharSequence);
```

## [StyleableToast](https://github.com/Muddz/StyleableToast)

{%
	include helpers/image.html
	src="/uploads/android-toast-libs-intro/styleabletoast_example_linux98ir.png"
	alt="نمونه Toast های ساخته شده با کمک کتابخانه اندروید StyleableToast"
%}

از بین این لیست تا الان StyleableToast رو واقعا دوست دارم. اگر مقدمه  این پست رو کامل خونده باشید حتما دیدین که گفتم خیلی وقت پیش دهنم رو درست کردن استایل شخصی برای Toast سرویس می شد. اگر از اول این کتابخونه رو می شناختم و ازش استفاده می کردم زندگی واقعا برام ساده تر می شد.

StyleableToast تموم اون چیزیه که نفر می تونه بخواد. شما می تونید  استایل دلخواه تون رو تو فایل styles.xml اضافه کنید و بر اساس نیاز ازش  استفاده کنید یا اینکه مستقیما استایل های دلخواه تون رو در فایل جاوا  اضافه کنید. به نظرم دیگه توضیح بیشتری لازم نیست و خیلی ممنون از توسعه  دهنده این کتابخونه خفن.

## [TastyToast](https://github.com/yadav-rahul/TastyToast)

{%
	include helpers/image.html
	src="/uploads/android-toast-libs-intro/tastytoast_example_linux98ir.jpeg"
	alt="نمونه Toast های ساخته شده با کمک کتابخانه اندروید TastyToast"
%}

دیدن که Toast ها پیشفرض تو اندروید چقدر کسل کننده و زشت هستن. اگر قصد  استفاده از Toast های خفن با انیمیشن دارید می تونید از این کتابخونه  استفاده کنید. مخزن این پروژه نمونه کد زیادی نزاشتن و منم ازش استفاده  نکردم ولی تو اینترنت تونستم چندتایی مثال ازش پیدا کنم.

```java
// ۱٫ Success message
TastyToast.makeText(
    getApplicationContext(), 
    "Success message!", 
    TastyToast.LENGTH_LONG, 
    TastyToast.SUCCESS
);
// ۲٫ Warning message
TastyToast.makeText(
    getApplicationContext(), 
    "Warning message!", 
    TastyToast.LENGTH_LONG, 
    TastyToast.WARNING
);
// ۳٫ Error message
TastyToast.makeText(
    getApplicationContext(), 
    "Error message!", 
    TastyToast.LENGTH_LONG, 
    TastyToast.ERROR
);
// ۴٫ Info message
TastyToast.makeText(
    getApplicationContext(), 
    "Info message!", 
    TastyToast.LENGTH_LONG, 
    TastyToast.INFO
);
// ۵٫ Default message
TastyToast.makeText(
    getApplicationContext(), 
    "Default message!", 
    TastyToast.LENGTH_LONG, 
    TastyToast.DEFAULT
);
// ۶٫ Confusion message
TastyToast.makeText(
    getApplicationContext(), 
    "Confusion message!", 
    TastyToast.LENGTH_LONG, 
    TastyToast.CONFUSING
);
```

## [SuperToasts](https://github.com/JohnPersano/SuperToasts)

{%
	include helpers/image.html
	src="/uploads/android-toast-libs-intro/supertoasts_example_linux98ir.jpeg"
	alt="نمونه Toast های ساخته شده با کمک کتابخانه اندروید SuperToasts"
%}

طبق معمول لازمه دوباره اشاره کنم که من از هیچ کدوم از کتابخونه های این  لیست تا به الان استفاده نکردم. اینو نوشتم که مقدمه معرفی این کتابخونه  باشه. اونجوری که در اسرین شات بالا دارید می بینید می تونید از این  کتابخونه برای ساختن Toast یا Snackbar و حتی ProgressDialog هم استفاده  کنید. جالب نیست؟!!

```java
SuperActivityToast.create(getActivity(), new Style(), Style.TYPE_BUTTON)
    .setButtonText("UNDO")
    .setButtonIconResource(R.drawable.ic_undo)
    .setOnButtonClickListener("good_tag_name", null, onButtonClickListener)
    .setProgressBarColor(Color.WHITE)
    .setText("Email deleted")
    .setDuration(Style.DURATION_LONG)
    .setFrame(Style.FRAME_LOLLIPOP)
    .setColor(PaletteUtils.getSolidColor(PaletteUtils.MATERIAL_PURPLE))
    .setAnimations(Style.ANIMATIONS_POP).show();
```

مخزن این پروژه فایل README کاملی نداره و فقط به یه مثال بسنده کرده ولی  اگر به wiki اون سر بزنید اطلاعات خیلی بیشتر به همراه مثال و اسکرین شات  داره که بسیییار زیاد کامل تره. شاید تو اسکرین شات های بالا زشت به نظر  برسه ولی واقعا یکی از بهترین کتابخونه های اندروید به حساب میاد.

## [Toasty](https://github.com/GrenderG/Toasty)

{%
	include helpers/image.html
	src="/uploads/android-toast-libs-intro/toasty_example_linux98ir.jpeg"
	alt="نمونه Toast های ساخته شده با کمک کتابخانه اندروید Toasty"
%}

از بین همه کتابخانه هایی که معرفی شد از نظر من Toasty با اختلاف  بهترین کتابخانه است. اگه به مخزن این پروژه در گیت هاب بردید خواهید دید  که Toasty خودش رو “The usual Toast, but with steroids” معرفی کرده.  داداچیا می دونن منظور Toasty چیه. توضیح بیشتری لازم نیست چون می تونید به مخزنش برید و مستندات لازم رو اونجا پیدا کنید.

اینم از معرفی ۷ کتابخانه اندروید برای ساختن Toast. به نظرم خیلی می  تونه برای افراد مبتدی مفید باشه چون ساده است و بهشون کمک کنه با نحوه کار با کتابخونه های شخص ثالث در اندروید آشنا بشن و همینطور برای باقی افرادی که توسعه دهنده اندروید هستن.

ازشون استفاده کنید و بهم بگید به نظرتون بهترین مورد تو این لیست از شما کدوم یکیه؟