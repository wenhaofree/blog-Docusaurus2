---
slug: How-to-introduce-TailwindCSS-in-Docusaurus
title: 如何在Docusaurus中引入TailwindCSS
date: 2023-10-26
authors: wenhao
tags: ['General']
keywords: ['Default']
---
https://farer.org/2021/10/08/docusaurus-with-tailwindcss/ 

最近在重新撸我们 Kratos 文档的  landing page 。我们的文档站用了 facebook 开源的 Docusaurus 作为文档平台，这里写样式想偷懒用一下 TailwindCSS，就需要把 Tailwind 集成到现有的 Docusaurus 项目中，我在官方仓库中找到了 这个 issue ，稍做调整后用在了我们自己的项目里，该方法在 2.0.0-beta6 可用。 
Docusaurus 是基于 React 的项目，它的 landing page 是一个独立的 component，另外想修改其它组件，比如 navbar 或者 footer，可以参考  Swizzling theme components  把相应的组件代码暴露出来以便修改。 
我们这次主要想实现的是，能够使用 tailwind 定义我们新组件的样式，并且不与 docusaurus 自带的样式冲突。 
## Step 0: 安装依赖

<!-- truncate -->

首先安装 tailwind 需要的依赖 
```plain text
yarn add -D tailwindcss postcss autoprefixer postcss-cli postcss-nested postcss-preset-env

```
## Step 1: 定义插件

<!-- truncate -->

在项目里创建一个 docusaurus 的插件，比如我这里名字叫  postcss-tailwind-loader.js  代码从下面抄一下。 
```plain text
module.exports = function (context, options) {
    return {
        name: 'postcss-tailwindcss-loader',
        configurePostCss(postcssOptions) {
            postcssOptions.plugins.push(
                require('postcss-import'),
                require('tailwindcss'),
                require('postcss-nested'),
                require('autoprefixer'),
            )
            return postcssOptions
        },
    }
}

```
## Step 2: 引入插件

<!-- truncate -->

在  docusaurus.config.js  的  plugins  里面，把上面创建的文件引入进来，以便生效 
```plain text
  plugins: [
    "./postcss-tailwind-loader"
  ],

```
## Step 3: 创建 tailwind 配置

<!-- truncate -->

创建  tailwind.config.js 
```plain text
module.exports = {
    purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.tsx'],
    darkMode: false,
    theme: {},
    variants: {
        extend: {},
    },
    plugins: []
}

```
## Step 4: CSS 中引入 Tailwind

<!-- truncate -->

修改  src/css/custom.css ，在里面添加 
```plain text
.tailwind {
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    @tailwind screens;
}

```
与 issue 中提到的方式不太一样，我们这里使用了  postcss-nested ，这样可以把 tailwind 的样式限制在带有有 class tailwind  的容器中，不会干扰 docusaurus 已有的样式。你也可以根据具体需要直接全局应用。 
如果是像我们这样定义，则在所有需要用 tailwind 写样式的部分，就在最外层容器加一个  className="tailwind"  即可生效。 
具体完整代码可以参考列在后面的我们的文档仓库。 
## Reference

<!-- truncate -->

- go-kratos.dev Repo
-  完整代码参考
- Move to Tailwind / Tailwind Preset



 > 在遵循创作的康庄大道上，若我的文字不慎踏入了他人的花园，请告之我，我将以最快的速度，携带着诚意和尊重，将它们从您的视野中撤去。
