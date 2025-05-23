---
title: "Spider-sync 使用示例03"
slug: "spider-sync-example"
description: "这是一个Spider-sync同步工具的使用示例文档"
tags: ["技术", "工具", "自动化"]
keywords: ["技术", "工具", "自动化"]
category: "教程"
authors: "wenhao"
date: "2025-05-23"
status: "Published"
image: "https://image.wenhaofree.com/2025/05/9240d7d9a83d2cdc0381f3160780d21b.png"
---

# Spider-sync 使用示例

这是一个示例markdown文档，用于演示Spider-sync的功能。

## 功能特性

Spider-sync 是一个强大的链式同步工具，支持以下功能：

1. **文档迁移** - 自动将markdown文档从源目录迁移到目标目录
2. **Git同步** - 自动提交和推送文档到Git仓库
3. **Notion同步** - 将文档同步到Notion数据库
4. **微信公众号发布** - 自动发布文档到微信公众号

## 使用方法

### 同步单个文件
```bash
python src/main.py sync-file content/example.md
```

### 同步整个目录
```bash
python src/main.py sync-dir content/
```

### 指定同步平台
```bash
python src/main.py sync-file content/example.md -p notion -p wechat
```

### 测试连接
```bash
python src/main.py test
```

## 配置说明

在使用前，请确保：

1. 复制 `.env.example` 为 `.env` 并填入配置
2. 配置Notion集成和数据库ID
3. 配置微信公众号相关信息
4. 确保Git仓库已初始化

## 注意事项

- 文档需要包含YAML前置元数据
- 图片链接建议使用绝对URL
- 确保网络连接正常

祝您使用愉快！
