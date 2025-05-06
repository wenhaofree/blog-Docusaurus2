---
slug: stripe-local-dev-setup
title: Stripe 本地开发环境配置指南
date: 2024-07-30
authors: wenhao
tags: [stripe, payment, webhook, cli, local-development, 开发环境]
keywords: [stripe, cli, 本地开发, webhook, 支付, 测试]
image: https://image.wenhaofree.com/2025/05/edccadd3d7292a973513e33fed062463.png
---

<!-- truncate -->

# Stripe 本地开发环境配置指南

在开发集成了 Stripe 支付功能的应用程序时，能够在本地环境中高效地测试和调试至关重要。Stripe 提供了强大的命令行工具（Stripe CLI），可以极大地简化本地开发流程。本文将指导你完成 Stripe 本地开发环境的配置。

<img src="https://image.wenhaofree.com/2025/05/edccadd3d7292a973513e33fed062463.png" alt="Stripe CLI" />


## 为什么需要本地开发环境？

- **快速迭代**: 在本地修改和测试代码比部署到线上环境快得多。
- **调试方便**: 可以直接在本地使用调试工具检查 Webhook 事件处理逻辑。
- **节省成本**: 避免在生产环境中使用真实支付进行测试。
- **模拟事件**: 轻松模拟各种 Stripe 事件，测试边缘情况。

## 第一步：安装 Stripe CLI

Stripe CLI 是进行本地开发的核心工具。根据你的操作系统，选择合适的安装方式：

**macOS (使用 Homebrew):**
```bash
brew install stripe/stripe-cli/stripe
```

**Windows (使用 Scoop 或手动下载):**
```powershell
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe
```
或者从 [Stripe CLI GitHub Releases](https://github.com/stripe/stripe-cli/releases/latest) 页面下载 `.exe` 文件。

**Linux (使用 Snapcraft 或手动下载):**
```bash
sudo snap install stripe --classic
```
或者从 GitHub Releases 页面下载 `.deb` 或 `.rpm` 包。

安装完成后，可以通过运行以下命令验证安装是否成功：
```bash
stripe version
```

## 第二步：登录 Stripe CLI

安装完成后，需要将 Stripe CLI 连接到你的 Stripe 账户。运行以下命令：
```bash
stripe login
```
这个命令会打开浏览器，要求你登录 Stripe 账户并授权 CLI 访问。授权成功后，CLI 会自动配置好你的测试模式 API 密钥。

## 第三步：设置 Webhook 转发

Webhook 是 Stripe 向你的应用程序发送事件通知（如支付成功、订阅更新等）的方式。在本地开发时，你需要一种方法将这些来自 Stripe 的事件转发到你本地运行的服务器上。Stripe CLI 的 `listen` 命令可以实现这一点。

假设你的本地应用程序正在 `http://localhost:3000/webhook` 监听 Stripe 事件，你可以运行以下命令：
```bash
stripe listen --forward-to http://localhost:3000/webhook
```

运行此命令后，Stripe CLI 会：

1.  创建一个临时的 Webhook 端点 URL。
2.  监听发送到该 URL 的所有事件。
3.  将接收到的事件转发到你指定的本地 URL (`http://localhost:3000/webhook`)。

同时，它会输出一个 **Webhook signing secret** (形如 `whsec_...`)。你需要将这个 secret 配置到你的本地应用程序中，用于验证接收到的 Webhook 事件是否确实来自 Stripe。

**重要提示**: 确保你的本地服务器正在运行，并且能够接收 POST 请求到指定的 Webhook 路径。

## 第四步：使用测试模式和测试数据

在本地开发和测试时，务必使用 Stripe 的 **测试模式 (Test Mode)**。

- **测试 API 密钥**: Stripe CLI 登录后会自动使用测试密钥。在你的应用程序代码中，也应该使用测试环境的 API 密钥（形如 `sk_test_...` 和 `pk_test_...`）。这些密钥可以在 Stripe Dashboard 的"开发者" -> "API 密钥"部分找到。
- **测试卡号**: Stripe 提供了多种[测试卡号](https://stripe.com/docs/testing#cards)，可以模拟不同的支付场景（成功、失败、需要 3D Secure 验证等）。
- **测试银行账户和支付方式**: 同样，Stripe 也提供了用于测试 ACH、SEPA 等其他支付方式的[测试账户信息](https://stripe.com/docs/testing)。

## 第五步：触发测试事件

除了等待真实操作（如在你的测试网站上完成一次购买）触发事件外，你还可以使用 Stripe CLI 直接触发特定的测试事件，这对于测试 Webhook 处理逻辑非常有用。

例如，触发一个 `payment_intent.succeeded` 事件：
```bash
stripe trigger payment_intent.succeeded
```

你可以触发多种[预定义的事件](https://stripe.com/docs/cli/trigger)。如果 `stripe listen` 正在运行，你将看到这个事件被转发到你的本地服务器。

## 总结

配置 Stripe 本地开发环境的核心步骤包括：

1.  **安装 Stripe CLI**。
2.  **使用 `stripe login` 连接账户**。
3.  **使用 `stripe listen --forward-to <your_local_webhook_url>` 转发 Webhook 事件**，并配置好 Webhook signing secret (`whsec_...`)。
4.  **确保使用测试 API 密钥 (`sk_test_...`, `pk_test_...`) 和测试数据**。
5.  **使用 `stripe trigger <event_name>` 模拟事件**进行测试。

通过以上步骤，你可以搭建一个高效、便捷的 Stripe 本地开发环境，加速你的支付功能开发和测试过程。