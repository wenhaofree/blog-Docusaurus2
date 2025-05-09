---
slug: mac-mini-setup-guide
title: 2025年如何用不到8K的预算升级到超强Mac Mini，提升开发效率300%！从选购到开发环境搭建，一文搞定！
date: 2025-05-08
authors: wenhao
tags: [mac, development, productivity, tools]
keywords: [mac mini, development setup, productivity tools, mac configuration]
image: https://image.wenhaofree.com/2025/05/df26869bb9a34a2add178cb9f562d06d.jpg
# sticky: 6
---

<!-- truncate -->
### 为什么要购买Mac Mini？

在日常工作中，电脑性能直接决定了我的工作效率。以前使用的Mac主机，容量总是很快就爆满，特别是在开发App程序时，Xcode和其他开发工具占用的内存空间非常大，经常需要清理磁盘空间。虽然我现在使用的是16GB的内存，但当同时开启Cursor、浏览器和Xcode等应用时，系统的内存占用常常超标，需要频繁清理。

此外，未来我还计划进行一些本地大模型的操作，现有配置的电脑在这方面也有些吃力。因此，经过一番深思熟虑，我决定购买一台新Mac Mini，配置为1T硬盘、32G内存、M4（10+10C/32G/1T）。

### 购买价格

在对比了官方价格、港货价格、教育优惠价格、国家补贴价格等多种渠道后，我发现，配置相同的Mac Mini，价格差距有时能达到3000元左右。信息差带来的价格差，实在是太明显了。最终，我通过合适的渠道，以国家补贴价格，花费不到7K的价格顺利购买到心仪的设备。
官方价格：
<img src="https://image.wenhaofree.com/2025/05/6100bc5421c398ab45e3d01acb9ced5a.png"/>

教育价格：
<img src="https://image.wenhaofree.com/2025/05/910a86e1242b899ab954102462a7e817.png"/>

国家补贴价格：
<img src="https://image.wenhaofree.com/2025/05/8e5628c4574c5be756643ee0631d0f0c.jpg"/>


### 新机安装必备配置与软件

#### 配置

1. **iCloud ID登录**：因为我之前的密码和账号数据大多通过iCloud同步，所以必须登录iCloud账号，确保数据的无缝对接。苹果的加密功能做得相当出色，安全性很高。
2. **触发角设置**：用来快速启动台，提升工作效率。这个可以根据个人习惯进行自定义。

#### 必备工具

* **ClashX**
  由于一些不可抗力的原因，GitHub的仓库已经关闭，我自己准备了一些最新版的ClashX软件，可以直接下载。

* **Notion**
  作为我的笔记工具，Notion功能强大，不仅能记录各种信息，还是我工作中的第二大脑。并且可以通过网页版操作，效果一点不差。

* **Chrome**
  谷歌浏览器在开发和调试上是我的首选。当然，Arc浏览器的界面布局也非常不错，但它有些耗内存。对于日常浏览和开发调试，我还是习惯使用Chrome。

* **Raycast**
  这是Mac专属的快速检索工具，不仅能帮我快速找到文件，还能通过插件支持调用大模型进行对话。简而言之，它就是Mac上的“Everything”。

* **Gmail**
  作为主用的邮箱，选择Gmail会比较方便。可以选择网页版或使用客户端，功能都很强大。

### 开发工具

* **Cursor**
  最新的AI编程工具，对于写代码的人来说非常实用，不仅能提高效率，还能提供智能提示。

* **IDEA**
  我习惯使用这个开发环境，支持Java、Python、Go等语言，特别适合开发。虽然Cursor用得熟练的情况下，也可以不用IDEA。

* **Warp**
  本地终端工具，支持命令记录和自动提示。最牛的是它能使用自然语言与大模型对话，直接获取命令，省去了记住一堆复杂命令的麻烦。

* **OrbStack**
  类似于Docker Desktop，但它启动速度更快，占用资源更少。特别适合Mac用户，Windows暂时不支持。

* **Xcode**
  iOS开发必备，想做苹果应用开发的朋友都知道，Xcode占用的资源巨大，如果磁盘小，系统频繁卡顿是常态。

### 大模型工具

* **Ollama**
  用于本地调测大模型，支持主流开源大模型的更新。

* **Cherry Studio**
  本地大模型对话工具，多个供应商集成，支持MCP服务调用等，免费提供本地服务。

* **AnythingLLM**
  用作本地知识库，可以将大模型的对话基于知识库进行处理。虽然Cherry Studio也能做到这一点，但如果你更喜欢这个工具的界面，可以选择它。

### 交流工具

* **微信**
* **Telegram**
* **Discord**
* **飞书**

### 笔记工具

* **Obsidian**
  适合做本地笔记，插件丰富，如果你不希望数据同步到第三方服务器，可以选择它。

### 截图工具

* **Shottr**
  如果不喜欢微信截图，Shottr是一个不错的选择，它支持长图截取，方便记录和分享。

### 视频工具

* **Screen Studio**
* **剪映**
* **OBS**

### 翻译工具

* **Bob Translate**
* **欧陆词典**
* **沉浸式翻译插件**

### 输入法

* **推荐**：苹果自带输入法
  **自选**：

  * 搜狗输入法：曾经用过，但听说它有监听问题，所以弃用了。
  * 谷歌输入法
  * 微信输入法
  * 讯飞输入法

### 终端软件工具

* **oh-my-zsh**
  习惯使用Z命令，快速操作目录。

* **Homebrew**
  Mac上必备的软件包管理工具。

* **fnm + node + ppm**
  前端打包工具。

* **pyenv + python + pip**
  推荐使用pyenv来管理项目代码。

* **goenv + go**
  用于Go语言环境管理。

### Chrome浏览器插件

* **篡改猴**
* **沉浸式翻译工具**
* **Cookiemanager**：用于cookie管理
* **ADblock**：去广告，提升浏览体验
* **Wappalyzer**：查看网站技术栈
* **ProxySwitchyOmega**
* **SEOquake**
* **Notion Web Clipper**：快速将文章保存到Notion

---

以上提到的所有软件和工具，我都已经打包好了，下载地址如下：

[点击下载](https://pan.quark.cn/s/241156b02460)



