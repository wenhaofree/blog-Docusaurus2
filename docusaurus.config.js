const { to } = require('@react-spring/web')
const path = require('path')
const beian = '京ICP备2020034168号-1'
/** 首页头部提示语链接 */
const announcementBarContent = `<a href="/typescript-full-stack-technology-trpc" target="_blank">Typescript 全栈最值得学习的技术栈 TRPC</a>`

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '文浩Marvin',
  titleDelimiter: '-',
  url: 'https://wenhaofree.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'wenhao',
  projectName: 'blog',
  tagline: '文浩Marvin,一个分享有趣好用APP和网站技术的博主',
  onBrokenLinks: 'warn',
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    image: 'img/logo.png',
    // announcementBar: {
    //   id: 'announcementBar-3',
    //   content: announcementBarContent,
    // },
    metadata: [
      {
        name: 'keywords',
        content: '文浩Marvin,文浩,Marvin,文浩博客,文浩开发工程师',
      },
      {
        name: 'keywords',
        content: 'java, javascript, typescript, node, react, vue, web, python',
      },
      {
        name: 'google-adsense-account',
        content: 'ca-pub-5455845858903578',
      }
    ],
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: '文浩Marvin',
      logo: {
        alt: '文浩Marvin',
        src: 'https://leanoss.fuwenhao.club/EY85A3N1eez2zuEcxJh71m2MdNqQOxYk/logo.jpg',
        srcDark: 'https://leanoss.fuwenhao.club/EY85A3N1eez2zuEcxJh71m2MdNqQOxYk/logo.jpg',
      },
      hideOnScroll: true,
      items: [
        {
          label: '博客',
          position: 'right',
          to: 'blog',
          // items: [
          //   {
          //     label: '标签',
          //     to: 'tags',
          //   },
          //   {
          //     label: '归档',
          //     to: 'archive',
          //   },
          // ],
        },
        {
          label: '更多',
          position: 'right',
          items: [
            {
              label:'笔记',
              to:'docs/skill/',
            },
            {
              label: '资源',
              to: 'resource',
            },
          ]
        },
//        {
//          label: 'Wiki',
//          position: 'right',
//          // to:'docs/skill/',
//          items: [
//            {
//              label: 'Java系列',
//              to: 'https://wiki.fuwenhao.club/',
//            },
//            {
//              label: '精简系列',
//              to: 'docs/skill/',
//            }
//          ]
//        },
//        {
//          label: 'Skill',
//          position: 'right',
//          items: [
//            //对应sidebars.js的type目录,实现效果需要单独定义目录
//            {
//              label: 'React',
//              to: 'docs/category/react-1'
//            },
//            {
//              label: 'JavaScript',
//              to: 'docs/category/JavaScript-1',
//            },
//          ]
//        },
        // {
        //   label: '工具',
        //   position: 'right',
        //   items: [
        //     {
        //       label: 'API服务',
        //       to: 'https://api.wenhao.cn',
        //     },
        //     {
        //       label: 'JS代码还原',
        //       to: 'https://js-de-obfuscator.wenhao.cn',
        //     },
        //     {
        //       label: 'CyberChef加密',
        //       to: 'https://cipher.wenhao.cn',
        //     },
        //     {
        //       label: 'Transform',
        //       to: 'https://transform.wenhao.cn',
        //     },
        //     {
        //       label: '网盘',
        //       to: 'https://pan.wenhao.cn',
        //     },
        //   ],
        // },
//        {
//          label: '导航',
//          position: 'right',
//          to: 'resource',
//        },
        // {
        //   label: '项目',
        //   position: 'right',
        //   to: 'project',
        // },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            {
              label: '标签',
              to: 'tags',
            },
            {
              label: '归档',
              to: 'archive',
            },
            {
              label: 'Wiki',
              to: 'docs/skill',
            },
            // {
            //   label: '实战项目',
            //   to: 'project',
            // },
            // {
            //   label: '前端示例',
            //   to: 'https://example.wenhao.cn',
            // },
          ],
        },
        {
          title: '社交媒体',
          items: [
            {
              label: '关于我',
              to: '/about',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/wenhaofree',
            },
            // {
            //   label: '掘金',
            //   href: 'https://juejin.cn/user/2348212569772654',
            // },
            // {
            //   label: 'Discord',
            //   href: 'https://discord.gg/M8cVcjDxkz',
            // },
          ],
        },
        {
          title: '更多',
          items: [
            // {
            //   label: '友链',
            //   position: 'right',
            //   to: 'friends',
            // },
            {
              label: '导航',
              position: 'right',
              to: 'resource',
            },
            // {
            //   label: '我的站点',
            //   position: 'right',
            //   to: 'website',
            // },
            // {
            //   html: `<a href="https://docusaurus.io/zh-CN/" target="_blank"><img style="height:50px;margin-top:0.5rem" src="/img/buildwith.png" /><a/>`,
            // },
          ],
        },
      ],
      copyright: `<p><a href="http://beian.miit.gov.cn/" >${beian}</a></p><p>Copyright © 2020 - 2025 wenhaofree </p>`,
    },
    prism: {
      theme: require('prism-react-renderer').themes.vsLight,
      darkTheme: require('prism-react-renderer').themes.vsDark,
      additionalLanguages: ['java', 'php', 'rust', 'toml', 'bash', 'diff', 'json'],
      defaultLanguage: 'javascript',
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    algolia: {
      appId: 'H6Q9D03AHN',
      apiKey: '70944edb01c2cea5696cec2369cb6ef9',
      indexName: 'fuwenhao',
    },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
      config: {},
    },
    giscus: {
      repo: 'fwh666/blog-Docusaurus2',
      repoId: 'R_kgDOJlSEGQ',
      category: 'General',
      categoryId: 'DIC_kwDOJlSEGc4CWogK',
      theme: 'light',
      darkTheme: 'dark',
    },
    liveCodeBlock: {
      playgroundPosition: 'top',
    },
    socials: {
      github: 'https://github.com/wenhaofree',
      twitter: 'https://twitter.com/wenhaofree',
      juejin: 'https://juejin.cn/user/2348212569772654',
      csdn: 'https://blog.csdn.net/wenhao12',
      qq: 'https://wpa.qq.com/msgrd?v=3&amp;uin=347246463&amp;site=qq',
      zhihu: 'https://www.zhihu.com/people/wenhaomarvin',
      cloudmusic: 'https://music.163.com/#/user/home?id=',
    },
  },
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: '文浩开发工程师',
      },
    },
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.js',
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-TBMXJKG84N',
          anonymizeIP: true,
        },
        // debug: true,
      }),
    ],
  ],
  // themes: ['@docusaurus/theme-live-codeblock'],
  // themes: [
  //   require.resolve("@easyops-cn/docusaurus-search-local"),
  //   {
  //     // ... Your options.
  //     // `hashed` is recommended as long-term-cache of index file is possible.
  //     indexDocs: true,
  //     indexDocSidebarParentCategories: 0,
  //     indexBlog: true,
  //     indexPages: false,
  //     style: undefined,
  //     maxSearchResults: 8,
  //     hashed: true,
  //     // For Docs using Chinese, The is recommended to set to:
  //     language: ["en", "zh"],
  //   },
  // ],
  plugins: [
    'docusaurus-plugin-image-zoom',
    'docusaurus-plugin-sass',
    path.resolve(__dirname, './src/plugin/plugin-baidu-tongji'),
    path.resolve(__dirname, './src/plugin/plugin-baidu-push'),
    [
      path.resolve(__dirname, './src/plugin/plugin-content-blog'),
      {
        path: 'blog',
        routeBasePath: '/',
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/wenhaofree/blog-Docusaurus2/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: '文浩Marvin:个人博客',
        blogSidebarCount: 10,
        blogSidebarTitle: '最近更新',
        postsPerPage: 10,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'all',
          title: '文浩',
          copyright: `Copyright © ${new Date().getFullYear()} 文浩 <p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
        },
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        disableInDev: false,
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(51 139 255)',
          },
        ],
      },
    ],
  ],
  stylesheets: [],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },
  scripts: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5455845858903578',
      async: true,
      crossorigin: 'anonymous',
    },
    {
      src: 'https://umami.wenhaofree.com/script.js',
      defer: true,
      'data-website-id': '871f4046-f21c-4e43-aae2-483143b6fb04',
    },
  ],
}

module.exports = config
