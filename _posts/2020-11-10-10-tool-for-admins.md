---
layout: single
type: post
comments: true
title: معرفی ۹ ابزار پایتون برای سیستم ادمین ها 
date: 2020-11-10 14:46:01 +0330
jdate: 1399-8-20
categories:
  - معرفی
  - پایتون
author: aminyousefnejad
tags: 
    - معرفی
    - ابزار
    - پایتون
---

جدای از اینکه سیستم ادمین بودن خیلی باحال و با کلاسه ، سختای خودشو داره . انجام دادن کارای تکراری ، آپدیت نگه داشتن سیستم ، سر کار داشتن با کانفیگ های مختلف و مهمتر اینکه اگه سیستم کرش کرد و داون شد اول یغه تورو میگیرن .و باور کنید اصلا شبیه فیلما نیس.

اما یه سری ابزار وجود داره که کار ادمینارو یکم راحت تر میکنه با این ابزارا می تونید یک سری وظایف ساده یا پیچیده رو اوتمات کنین . و به جای اینکه خودتونو درگیر کانفیگ و deployment کنید روی چیزای دیگه تمرکز کنین و امکانات بیشتری برای کاربر نهایی آماده کنید . 

<div id="read-more"></div>


## 1- Fabric
فابریک یه ابزاره که با Paramiko و Invoke ساخته شده . و با سرور ها از طریق ssh ارتباط برقرار می کنه و یک سری کار که شما بهش میگیدو انجام میده . از این نظر فابریک مقیاس پذیری زیادی داری می تونید چندین سرورو کانفیگ کنید یا کارای ساده تری باهاش انجام بدید 

طریقه نصب :
```sh
sudo pip3 install fabric
```
بعد از نصب باید فایل بسازید به اسم `fabfile.py` و دستورات رو داخل تابعی بنویسید . که بعد توسط cli فابریک قابل اجرا شدن هستن . 
برای مثال من میخوام اول تو سرور یک دایرکتوری بسازم و بعد فایلی رو از روی سیستم خودم کپی کنم توی دایرکتوری سرور . 

```python 
from fabric import Connection , task 

@task 
def remote_copy(c): 
  c.run('mkdir -p /home/linux98/data_dir')
  c.put('data.scv' , '/home/linux98/data_dir')
```

خب خط اول فراخوانی کتابخانه های  لازم هست   . توی این فایل هر تابعی که میسازید به عنوان کامند می تونید ازش استفاده کنید پس قبل از هر تابع باید از anotation `@task` استفاده بکنید یا فابریک اون تابع رو به عنوان کلمند بشناسه . 

برای نمایش لیست کامند ها 
```sh
fab --list

output : 
Available tasks:

  remote-copy
```
خب می بینید که تابعی که ساختیم تو لیست دستورات هست . حالا میریم سر وقت اجرا 

```sh 
fab -H username@server_ip_address remote-copy --prompt-for-login-password
```
یوزرنیم و آی پی آدرس سرور خودتون جایگزین کنید .بعد از اینکه پسوردو وارد کردید طبق چیزی که خودمون خواستیم دایرکتوری توی هوم یوزرمون تو سرور ایجاد میکنه و فایلمون رو کپی می کنه اونجا . 

## 2- psutil
psutil مخفف `process and system utilites `هست. پس کار این ابزار مثل اسمش مانیتور کردن وضعیت سرور و مدیریت پروسس هاست. تقریبا به درد بخوره ولی به نظرم رو سرور های لینوکسی زیاد کاربرد نداشته باشه چون  لینوکس خودش ابزار های بهتری برای مدیریت و مانیتور پروسس ها  داره .

برای مثال شاید بخوایید که وضعیت سی پی یو رو ببینید یا بفهمید چقدر از هاردتون داره مصرف میشه.
برخلاف قبلی اینو پکیجو باید رو سرور نصب کنید .
```sh 
sudo pip3 install psutil 
```
یک فایل ایجاد کنید به اسم دلخواهتون و کد های زیرو داخلش بنویسید 
```python 
import psutil

cpu_stats = psutil.cpu_stats();
print(cpu_stats)

disk_usage = psutil.disk_usage('/home')
print(disk_usage)
```
و بعد اجراش کنید . 
```sh 
python3 filename.py 

output:
scpustats(ctx_switches=60303822, interrupts=16651852, soft_interrupts=12215394, syscalls=0)
sdiskusage(total=68363395072, used=56980271104, free=7866359808, percent=87.9)
```
## 3- Click
کلیک یه پکیجه که خیلی سریع می تونیم باهاش کامند argument های خیلی ساده درس کنیم . 
برای مثال اسکریپی که بالا با psutil نوشتیم می تونیم وابسته با ورودی بکنیم و بگم اگه ورودی cpu بود فقط اطلاعات سی پی یو رو نشون بده اگه ورودی disk بود فقط اطلاعات دیسکو 

```sh
sudo pip3 install click
```
و اسکریپ بالا به این شکل خواهد بود 
```python
import click
import psutil

@click.command()
@click.option('--task', default='all', help='all, cpu or disk')
def get_stats(task):
  click.echo('getting stats %s' % task)
  if (task == 'cpu' or task == 'all'):
    cpu_stats = psutil.cpu_stats();
    click.echo(cpu_stats)
  if (task == 'disk' or task == 'all'):
    disk_usage = psutil.disk_usage('/home')
    click.echo(disk_usage)

if __name__ == '__main__':
  get_stats()
```
و نحوه اجرا به این صورت 
```sh
python3 stats.py --task all
```
## 4- Salt 
سالت هم مثل فابریک بهمون این اجازه رو میده که سیستم های ریموت رو مدیریت کنیم . ولی یک ویژگی خوب سالت اینکه در مقابل رویداد های مختلف می تونه واکنش نشون بده و امکان اجرای یه فرآیند خود ترمیمی رو بهمون بده . 

تو این پست نمی شه در مورد سالت توضیح داد برای اطلاعات بیشتر به داکیونتشون مراجعه کنید 

[SaltStack Documentation](https://docs.saltstack.com/en/latest/)

## 5- Selenium 
کار اصلی سلنیوم اتومات کردن برنامه های تحت وب هست برای مقاصد آزمایش ولی خودشون میگن که فقط به اینجا محدود نمی شه  و کارای خسته کننده مدیریت هم می شه باهاش انجام بگیره . 

[SeleniumHQ Browser Automation](https://www.selenium.dev/)

## 6- Ansible 
خب اینم یکی دیگه از ابزار های اوپن سورسه که دیپلوی کردن نرم افزار ها ، مدیریت تنظیمات و غیره میشه باهاش اتومات کرد . 

انسیبل به اصطلاح یه سری playbooks داره که سیستم ادمین یکسری کارهارو(خودش بهشون میگه play) توش به زبان YAML می نویسه و انسیبل به دستورات رو تو سرور اجرا میکنه . 
برای مثال پلی بوک که نوشته شده تا آپاچی سرور رو روی یک یا چنتا هاست نصب کنه .
```yaml 
---
- hosts: all
  become: true
  vars:
    vars/variables.yml
  tasks:
    - name: Update apt-cache
      apt: update_cache=yes

    - name: Install apache web server
      apt: name=apache2 state=latest

    - name: Create document root
      file: path={{ document_root_path }} state=directory owner=www-data group=www-data

    - name: Copy index.html
      copy: src=index.html dest={{ document_root_path }}/index.html owner=”{{ owner }}” mode=0644

    - name: Set up virtual hosts file
      template: src=virtualhosts.conf dest=/etc/apache2/sites-available/000-default.conf
      notify: Restart Apache
  
  handlers:
    - name: Restart Apache
      service: name=apache2 state=restarted
```

## 7 -Requests 
رکوئست یه کتابخونه س که خیلی ساده و شیک میشه باهاش http رکوئست فرستاد. 

```python
req = requests.get(‘<url>’)
print(req.status_code)
```

[Requests: HTTP for Humans™ — Requests 2.24.0 documentation](https://requests.readthedocs.io/en/master/)

## 8- pywin32 
این کتابخانه واسه ادمین سرور های ویندوزی خیلی با ارزشه چون بهشون دسترسی به توابع درون api win32 رو میده .

با این کتابخونه می تونید لاگ های ویندزو بخونید .تیکه کد زیر سیستم لاگ ویندزو باز می کنه تعداد رکودهاشو میشماره و نشون میده . 

```python
import win32evtlog
system_event_log=win32evtlog.OpenEventLog(None, "System")
count = win32evtlog.GetNumberOfEventLogRecords(system_event_log)

print(count)

win32evtlog.CloseEventLog(system_event_log)
```

[pywin32 : pywin32 provides access to Windows API ](https://github.com/mhammond/pywin32)

## 9- 2to3 
نمی دونم دقیقا چرا اینجاس؟! . اما اگر برنامه ای از قدیما با پایتون ۲ نوشتید می تونید به راحتی منتقلش کنید و با پایتون ۳ اجراش کنید 

```sh
2to3 -w my_script.py
```
آپشن -w تغییرات رو مستقیما رو همون فایل انجام میده پس یه کپی از فایلتون بگیرید . 
