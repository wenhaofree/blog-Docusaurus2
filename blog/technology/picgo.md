---
slug: picgo-github
title: picgo配置GitHub图床
date: 2020-03-27
authors: wenhao
tags: [picgo, github]
keywords: [picgo, github]
image: https://cdn.wenhaofree.com/gh/wenhaofree/Image/blog/SCR-20250505-sodl.png
# sticky: 6
---

<!-- truncate -->


## 方式一： 用GitHub配置图床

### 前置条件：

1. 安装PICGO：

   1. https://github.com/Molunerfinn/PicGo

2. 解决mac安装打开失败问题：“PicGo”已损坏，无法打开。 你应该将它移到废纸篓。

   ```shell
   sudo xattr -r -d com.apple.quarantine /Applications/PicGo.app
   ```

3. 配置picgo：
   1. 配置GitHub图床，参考URL： https://picgo.github.io/PicGo-Doc/zh/guide/config.html#github图床
   2. GitHub图床配置：
      1. 仓库名： wenhaofree/Image
      2. 分支名：master
      3. token：https://github.com/settings/tokens 生成token，选择指定仓库，日期永远，得到token, 记得要设置对读写权限；
      5. 存储路径：blog/
      6. 自定义域名：https://cdn.wenhaofree.com/gh/wenhaofree/Image
         1. 因为已经提前配置cnd域名，设置路径为https://cdn.wenhaofree.com/gh/wenhaofree/Image
      7. 验证：上传图片，查看返回的URL是否可以正常打开图片



### 测试图文上传步骤

1. 编写工具Typora
2. 图片上传工具picgo
   1. 上传图片得到URL，写入文档中
3. 测试上传图片

github图床图片如下：
- 如果不能打开说明国内网络问题
<img src="https://cdn.wenhaofree.com/gh/wenhaofree/Image/blog/SCR-20250505-sodl.png" />

cloudflare图床图片如下：
- 国内外网络都可以浏览
<img src="https://img.aistak.com/favicon.ico" />

### 问题记录：
```
451 Unavailable For Legal Reasons

Code: UnavailableForLegalReasons
Message: Due to your account is arrears, it is unavailable until you recharge.
Key: gh/wenhaofree/Image/blog/SCR-20240503-tbjh.jpeg
RequestId: NjgxOTcxNjhfZTYzNDJjMGJfNGQxNl8xNmMwNDEw
TraceId: OGVmYzZiMmQzYjA2OWNhODk0NTRkMTBiOWVmMDAxODc0OWRkZjk0ZDM1NmI1M2E2MTRlY2MzZDhmNmI5MWI1OTQ5YWUxMjNkYTk3NzdjZmZlMDQzOTgxOThkOTNlOWFkYmMwYWZlYmQzZDliZDE4ZDQyYjQxZTk2ZDM3YTE2NWI=

```
这个原因大概率是国内访问网络被屏蔽了， 魔法网络的时候可以正常查看图片。 可以考虑直接使用cloudflare的R2来实现图床功能；


## 方式二： 用Cloudflare R2配置图床

1. 下载picgo 或者piclist工具软件
2. 配置Cloudflare R2图床，参考URL： https://piclist.cn/configure.html#内置aws-s3
    - 新增R2 Bucket
    - 配置自定义域名（可选）
    - 生成API密钥，用于配置； 注意密钥只展示一次，要提前复制下来，后面配置使用；
    <img src="https://image.wenhaofree.com/2025/05/24b3fa3578a026affc05fda720aa1921.png"/>

3. 参考配置示例图片：
<img src="https://image.wenhaofree.com/2025/05/ab9d2eb2d2a0a683a1dffc8150205c34.png"/>