---
layout: single
type: post
comments: true
title: استفاده از Tor با حالت Transparent proxy
date: 2021-01-18 21:53:01 +0330
jdate: 1399-10-29
author: akamohebbi
image: /img/tor-wallpaper-with-matrix-style.jpg
categories:
    - لینوکس
    - Tor
tags:
    - لینوکس
    - Tor
    - حریم خصوصی
---

اینترنت هر روز بیشتر از روز قبل کاربر داره و این کاربرها برای اهداف بسیار متفاوتی از اینترنت استفاده می کنن. ولی نهایتا این دولت ها هستن که اون رو کنترل می کنن. دولت‌ها در مقام کدخدا تصمیم می گیرند که کاربران بتونند کجاها برن و کجاها نرند. گاهی اوقات کاربرا از دو طرف ضربه می خورن و هم از خارج و هم از داخل محدود میشن. مثل ما کاربران ایرانی که هم تحریم هستیم و هم فیلتر.

<div id="read-more"></div>

ولی واقعا خیلی مسخره است. چرا یکی باید به عنوان کدخدا اینطوری تصمیم بگیره؟ برای همین می تونید از نرم افزارهای مشخصی برای حل این مشکل استفاده کنید. اما بهترین نرم افزار همیشه و همیشه Tor بوده و هست. اول اینکه رایگانه و دوم همیشه وصله و کار می کنه(مادامی که اینترنت داشته باشید Tor رو هم دارید) و سوم هم اینکه Tor بشدت به حریم خصوصی شما احترام می گذاره و شما کاملا به طور ناشناس در Tor فعال خواهید بود.

در لینوکس وقتی Tor رو نصب می کنید به حالت پیشفرض می تونید از پروکسی Socks5 اون استفاده کنید که خیلی هم عالیه. ولی چی میشه وقتی بخواید ترافیک کل سیستم رو از Tor عبور بدید؟ برای این کار می تونید از این اسکریپت ساده پایین استفاده کنید.

```bash
#!/bin/bash

[ $( id -u) != "0" ] && echo "This script needs root privileges!" && exit

printf "VirtualAddrNetwork 10.192.0.0/10\nAutomapHostsOnResolve 1\nTransPort 9040\nDNSPort 5353" > /tmp/torrc

echo "Starting TOR..."

killall tor > /dev/null 2>&1

tor -f /tmp/torrc > /tmp/tor.log &

echo "Wait for TOR bootstrap..."

grep -q 'Done' <(tail -f /tmp/tor.log)

echo "Bootstrap ok!"

# Backup iptables rules
echo "Backup IPTABLES rules..."
iptables-save > /tmp/backup

echo "Setting firewall rules..."
NON_TOR="192.168.1.0/24 192.168.0.0/24"

iptables -F
iptables -t nat -F

iptables -t nat -A OUTPUT -m owner --uid-owner 0 -j RETURN
iptables -t nat -A OUTPUT -p udp --dport 53 -j REDIRECT --to-ports 5353
for NET in 192.168.1.0/24 192.168.0.0/24 127.0.0.0/9 127.128.0.0/10; do
 iptables -t nat -A OUTPUT -d $NET -j RETURN
done
iptables -t nat -A OUTPUT -p tcp --syn -j REDIRECT --to-ports 9040

iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
for NET in 192.168.1.0/24 192.168.0.0/24 127.0.0.0/8; do
 iptables -A OUTPUT -d $NET -j ACCEPT
done
iptables -A OUTPUT -m owner --uid-owner 0 -j ACCEPT
iptables -A OUTPUT -j REJECT

echo "Done!"
echo "Press any key to stop transparent proxy..."
read -n 1
killall tor

echo "Clear tor rules and restore previous configuration..."
sudo iptables -P INPUT ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo iptables -P OUTPUT ACCEPT
sudo iptables -F
sudo iptables -X
sudo iptables -t nat -F
sudo iptables -t nat -X
sudo iptables -t mangle -F
sudo iptables -t mangle -X
sudo iptables -t raw -F
sudo iptables -t raw -X

#restore previous rules
iptables-restore < /tmp/backup;

#Cleaning up
rm /tmp/backup
rm /tmp/tor.log
rm /tmp/torrc
```

البته راه های دیگه هم هست ولی فعلا ساده ترین روشی که میشه ازش استفاده کرد همینه. امیدوارم برای همه مفید باشه.