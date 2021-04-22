---
layout: single
type: post
comments: true
date: 2020-11-08 10:36:01 +0330
jdate: 1399-08-18
title: آموزش نصب LAMP
author: aminyousefnejad
categories:
    - آموزش
tags:
    - آموزش
    - لینوکس
    - سرور
---

lamp stack گروهی از نرم افزار های اوپن سورس هست که کنار هم نصب میشن تا سرور رو میزبان سایت های دینامیک و وب آپ ها بکنه . لمپ در واقع مخفف لینوکس ، وب سرور آپاچی دیتابیس mysql و محتوای داینامیک توسط پی اچ پی پردازش میشه . 
تو این پست آپاچی و مای اسکیوال و پی اچ پی رو روی اوبونتو نصب می کنیم . 


<div id="read-more"></div>



## قدم اول - نصب آپاچی 

```sh 
sudo apt update 
sudo apt install apache2
```

### تنظیم فایروال 
باید مطمئن بشید که فایل اجازه عبور به ترافیک http و https رو داده . فایروالی که من استفاده می کنم ufw هست که به صورت پیش فرض روی اوبونتو نصب هست .برای مشاهده پروفایل های برنامه ها تو فایروال دستور زیر رو وارد می کنیم : 
```sh
sudo ufw app list
```
خروجی:
```ts
Available applications:
  Apache
  Apache Full
  Apache Secure
  OpenSSH`
```
اجازه همه ورودی ترافیک http و https رو برای این پروفایل صادر می کنیم :
```sh
sudo ufw allow in "Apache Full"
```
### آی پی آدرس 
اگه دارید لمپ رو لوکال نصب می کنید یا روی ماشین مجازی فهمیدم آی پیتون زیاد سخت نیس . یکی از دو روش زیر :
```sh
ifconfig
or 
ip add 
```
اگه دارید رو vps نصب می کنید هم تا الآن باید فهمیده باشید آی پی تون چیه :/
اگه نه کد زیر رو بزنید 
```sh 
sudo apt install curl 
curl http://icanhazip.com
```

# نصب مای اسکیوال (mysql) 

```sh
sudo apt install mysql-server 
```
بعد از این که نصب تموم شد اسکریپت که همراه با مای اسکیوال نصب میشه رو اجرا بکنید . که یک سری تنظیمات پیش فرض رو حذف می کنه و می تونید لول پسورد سختگیرانه رو هم ست بکنید . چیز سختی نداره پس توضیحش نمی دم :)
```sh
sudo mysql_secure_installation
```
- نکته : از ورژن ۵٫۷ مای اسکیوال و به بعد ، کاربر روت مای اسکیوال  به صورت پیش فرض با پلاگین auth_socket اعتبار سنجی میشه به جای پسورد . که برای امنیت خوبه ولی وقتی بخواید با نرم افزار هایی مثل phpmyadmin با روت لاگین کنید  دردسر میشه . هرچند به نظرم بهتره با روت لاگین نکنید ولی اگه میخوایید این کارو بکنید تو ادامه اینکار انجام میدیم اگه نه  برید قسمت بعدی .

برای فعال کردن `mysql_native_password` برای یوزر روت کامند لاین مای اسکیوال رو تو ترمینال باز کنید : 
```sh 
sudo mysql 
```
برای چک کردین اینکه هر یوزر چطور اعتبار سنجی میشه کوئری زیر رو اجرا کنید 
```sql
SELECT user,authentication_string,plugin,host FROM mysql.user;
```
خروجی : 
```ts 
+------------------+-------------------------------------------+-----------------------+-----------+
| user             | authentication_string                     | plugin                | host      |
+------------------+-------------------------------------------+-----------------------+-----------+
| root             |                                           | auth_socket           | localhost |
| mysql.session    | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost |
| mysql.sys        | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost |
| debian-sys-maint | *CC744277A401A7D25BE1CA89AFF17BF607F876FF | mysql_native_password | localhost |
+------------------+-------------------------------------------+-----------------------+-----------+
4 rows in set (0.00 sec)
```
خب همونطور که می بینید روت با `autho_socket ` اعتبار سنجی میشه . برای تغییر دادنش به پسورد دستور زیر رو وارد کنید . 
```sql 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```
دستور زیرو بزنید تا تیبل مجوز ها ریلود بشه و تنظیماتتون اعمال 
```sql 
FLUSH PRIVILEGES; 
```
## ساخت یک کاربر با تمام دسترسی ها 
```sql
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL ON * . * TO 'admin'@'localhost';
FLUSH PRIVILEGES;

```
# نصب پی اچ پی 
```sh 
sudo apt install php libapache2-mod-php php-mysql 
```
به صورت دیفالت آپاچی دنبال فایل  index.html میگرده . ولی میشه تغییرش داد و به فایل های پی اچ پی اولیت داد . برای اینکار : 
```sh 
sudo vim /etc/apache2/mods-enabled/dir.conf
```
پ . ن : من از ادیتور ویم استفاده کردم شما با هر کدوم راحت تر هستید اونو جایگزین کنید 


اینو:
```ts 
<IfModule mod_dir.c>
    DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm
</IfModule>
```
اینطوری کنید :
```ts
<IfModule mod_dir.c>
    DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm
</IfModule>
```
آپاچی رو ریستارت کنید  
```sh 
sudo systemctl restart apache2 
```
# تنظیم هاست مجازی 
− پ .ن : اگه برای یادگیری میخواید این قسمتو رد کنید و فایلاتونو تو مسیر `/var/www/html/`  بزارید


برای اینکه بیشتر از یک دامین رو هاست کنیم میام یکسری هاست مجازی درس می کنیم . برای اینکار یه دایرکتوری درست کنید به اسم دلخواه تون مثلا : 
```sh 
sudo mkdir /var/www/your_domain 
```
مالکیت دایرکتوری که ایجاد کردید رو به یوزر فعلی تغییر بدید که هر بار برای تغییرات دست به دامن دسترسی روت نشید . 
```sh 
sudo chown $USER:$USER /var/www/your_domain 
```
خب همه فیلاتونو  کپی کنید تو دایرکتوری که ساختید و آماده بشید برای کانفیگ هاست مجازی : 
```sh 
sudo vim /etc/apache2/sites-avaiable/your_domain.conf 
```
این پایین الگو تنظیماته که خیلی شبیه دیفالت هست . کپی و پیست کنید تو فایلی که ایجاد کردید و تغییرات لازم رو بدید . 
مهمترین چیزی که باید تغییر بدید 
DocumentRoot هست  به مسیر دایرکتوری که ایجاد کردید.
```xml
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName your_domain
    ServerAlias www.your_domain
    DocumentRoot /var/www/your_domain
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```
سیوش کنید . هاست رو فعال کنید 
```sh 
sudo a2ensite your_domain.conf 
```
هاست دیفالت رو غیرفعال کنید .
```sh
sudo a2dissite 000-default.conf
```
چک کنیم که اررور سینتکسی نداشته باشیم 
```sh 
sudo apache2ctl configtest
```
آپاچی رو ریستارت کنیم . 
```sh
sudo systemctl restart apache2 
```


حله و اوکی هست  . امیدوارم به دردتون بخوره این آموزش . سوالی داشیتد تو گروهی تلگرام مطرح کنید سعی می کنم جواب بدم . 
بای بای 
