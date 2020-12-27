# [لینوکس 98](https://linux98.ir/)

پروژه وبلاگ لینوکس 98

توسعه داده شده با سایت ساز استاتیک جکیل و هاست شده ری سرویس گیت هاب پیجز

## چطور روی کامپیوتر خودمون اجراش کنیم

اول باید Ruby رو روی سیستم تون نصب کنید

```
sudo apt update
sudo apt install ruby-full build-essential zlib1g-dev
```

حالا باید متغیر های لازم رو توی فایل `.bashrc` رو تنظیم کنید

```
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

و در آخر Jekyll و پلاگین های لازم رو نصب می کنیم با دستور پایین

```
gem install jekyll bundler jekyll-sitemap jekyll-seo-tag jekyll-feed jemoji jekyll-paginate
```
برای اجرا کردن می تونید از دستور پایین استفاده کنید و سایت رو در `localhost:4000` به صورت پیشفرض مشاهده کنید

```
jekyll server
```
