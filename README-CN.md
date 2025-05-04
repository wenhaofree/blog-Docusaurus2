## TODO-fwh
1. Android文章的图片待替换
2. 

## 问题记录：
1. 站点配置三级目录无法加载出内容
    - 因为没有再sidebars.js中配置目录
    - 方案：需要在sidebar中配置目录；参见"侧边栏目录"文档
2. docusaurus的to的路由如何设置
    - 
3. 想实现skill下拉点击react跳转后只有该react的信息，无其他信息
    - 方案：需要在sidebars中重新定义单独的数据结构；参加01命令函数


## 分支介绍：
1. feature_v2.0_react:
- 重新生成React目录标头





<h2 align="center">
文浩的个人博客
</h2><br>

<pre align="center">
 Build with 🦖<a href="https://docusaurus.io/">Docusaurus</a> 
</pre>

<p align="center">
<br>
<a href="https://wenhao.cn">🖥 Online Preview</a>
<br><br> 
<a href="https://vercel.com/new/clone?repository-url=https://github.com/wenhao/blog/tree/main&project-name=blog&repo-name=blog" rel="nofollow"><img src="https://vercel.com/button" /></a>
<a href="https://app.netlify.com/start/deploy?repository=https://github.com/wenhao/blog" rel="nofollow"><img src="https://www.netlify.com/img/deploy/button.svg" /></a>
<a href="https://stackblitz.com/github/wenhao/blog" rel="nofollow"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" /></a>
</p>

## 👋 Introduction

在这里我会分享各类技术栈所遇到问题与解决方案，带你了解最新的技术栈以及实际开发中如何应用，并希望我的开发经历对你有所启发。

如果你想要搭建一个类似的站点，可直接 [Fork](https://github.com/wenhao/blog/fork) 本仓库使用，或者通过 [StackBlitz](https://stackblitz.com/github/wenhao/blog) 在线运行本项目，或通过 [Vercel](https://vercel.com/new/clone?repository-url=https://github.com/wenhao/blog/tree/main&project-name=blog&repo-name=blog) 一键部署。

## ✨ Features

- ✍️ **Markdown** - 写作方便
- 🎨 **Beautiful** - 整洁，美观
- 🖥️ **PWA** - 支持 PWA，可安装，离线可用
- 🏞️ **i18n** - 支持国际化
- 💯 **SEO** - 搜索引擎优化，易于收录
- 📊 **谷歌分析** - 支持 Google Analytics
- 🔎 **全文搜索** - 支持 [Algolia DocSearch](https://github.com/algolia/docsearch)
- 🗃️ **博文视图** - 不同的博文视图，列表、宫格、卡片
- 🌈 **资源导航** - 收集并分享有用、有意思的资源
- 📦 **项目展示** - 展示你的项目，可用作于作品集

我的修改：[Docusaurus 主题魔改](https://wenhao.cn/docs/docusaurus-guides)

## 📊 Catalogue

```bash
├── blog                           # 博客
│   ├── first-blog.md
├── docs                           # 文档/笔记
│   └── doc.md
├── data                           # 项目/导航/友链数据
│   ├── friend.ts                  # 友链
│   ├── project.ts                 # 项目
│   └── resource.ts                # 资源导航
├── i18n                           # 国际化
├── src
│   ├── components                 # 组件
│   ├── css                        # 自定义CSS
│   ├── pages                      # 自定义页面
│   ├── plugin                     # 自定义插件
│   └── theme                      # 自定义主题组件
├── static                         # 静态资源文件
│   └── img                        # 静态图片
├── docusaurus.config.js           # 站点的配置信息
├── sidebars.js                    # 文档的侧边栏
├── package.json
├── tsconfig.json
└── yarn.lock
```

## 📥 Start

```sh
git clone https://github.com/wenhao/blog.git
cd blog
yarn
yarn start
```

Build

```sh
yarn run build
```

## 📝License

[MIT](./LICENSE)
