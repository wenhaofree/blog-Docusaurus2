---
slug: conversion-of-unicode-encoding-in-python-to-Chinese
title: python中unicode编码转换为中文
date: 2023-11-17
authors: wenhao
tags: ['General']
keywords: ['Default']
---
https://zhuanlan.zhihu.com/p/489885748 

![Image](https://prod-files-secure.s3.us-west-2.amazonaws.com/b0012720-ccd1-41ef-9ca9-02f55a45f30f/07c1c2b8-42bf-417f-b328-5ffb5c2a89c8/v2-313068f1b4f5c492af64d13ffefe46d5_1440w.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231125T072006Z&X-Amz-Expires=3600&X-Amz-Signature=df10d854a02aea9d88a21402bee21908ff61f65e335df4f998fb31e8927095af&X-Amz-SignedHeaders=host&x-id=GetObject)
我们使用python中，遇到爬取网站情况，用到unicode编码，我们需要将它转换为中文，unicode编码转换为中文的方法有四种：使用unicode_escape 解码、使用encode()方法转换，再调用bytes.decode()转换为字符串形式、 使用json.loads 解码（为json 格式）、使用eval（遇到Unicode是通过requests在网上爬取的时候）。具体内容请看本文。 
方法一：使用unicode_escape 解码 
<!-- truncate -->
```plain text
unicode = b'\\u4f60\\u597d'
re = unicode.decode("unicode_escape")
print(re)

返回：你好
```
方法二：使用encode()方法转换，再调用bytes.decode()转换为字符串形式 
```plain text
s = r'\u4f60\u597d'
print(s.encode().decode("unicode_escape"))
```
方法三： 使用json.loads 解码（为json 格式） 
```plain text
str = '\u4eac\u4e1c\u653e\u517b\u7684\u722c\u866b'

print json.loads('"%s"' %str)
```
方法四：使用eval（遇到Unicode是通过requests在网上爬取的时候） 
以上就是小编整理的python中将unicode编码转换为中文的方法，希望能对你有所帮助哟~ 



 > 在遵循创作的康庄大道上，若我的文字不慎踏入了他人的花园，请告之我，我将以最快的速度，携带着诚意和尊重，将它们从您的视野中撤去。
