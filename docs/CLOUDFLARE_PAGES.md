# Cloudflare Pages 部署说明

> 状态：配置就绪，**等待 Will 在控制台创建项目**  
> 不要使用 Quick Tunnel；生产使用固定 `*.pages.dev`。

## 建议参数

| 项 | 值 |
|---|---|
| 连接方式 | GitHub 仓库 `willxiong92/will-in-practice` |
| Production branch | `main` |
| Framework preset | Astro（或 None） |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/`（仓库根） |
| Node.js version | `22`（Environment variable `NODE_VERSION=22` 或兼容 `20`） |
| 自定义域名 | 暂不购买 |

## 环境变量（Pages → Settings → Environment variables）

Production：

| Name | Value |
|---|---|
| `PUBLIC_CONTENT_PREVIEW` | `false` |
| `PUBLIC_SITE_URL` | `https://<你创建的项目名>.pages.dev` |
| `NODE_VERSION` | `22` |

Preview（可选，仅分支预览）：

| Name | Value |
|---|---|
| `PUBLIC_CONTENT_PREVIEW` | `false`（默认仍只出 approved+public） |
| `PUBLIC_SITE_URL` | 可用 Cloudflare 自动 Preview URL，或留空使用构建机默认 |

> 草稿预览请只用本地 `npm run preview:build`。若必须用 Cloudflare Preview 看草稿，应加 Cloudflare Access，且仅在 Preview 环境设 `PUBLIC_CONTENT_PREVIEW=true`。

## 建议项目名

| 候选项目名 | 预期地址 |
|---|---|
| `will-in-practice`（推荐） | `https://will-in-practice.pages.dev` |
| `willinpractice` | `https://willinpractice.pages.dev` |

项目名以 Cloudflare 控制台实际可用为准；代码中**不写死**虚构 hostname。

## Will 需在控制台完成的步骤

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → Create → Pages → Connect to Git  
2. 授权 GitHub，选择 `willxiong92/will-in-practice`  
3. 填写上表构建参数并创建项目  
4. 配置 Production 环境变量 `PUBLIC_SITE_URL` 为真实 `*.pages.dev`  
5. 触发一次 Production 部署，确认首页与 `/library` 可访问  
6. （可选）关闭或保留 GitHub Pages 作为回退入口  

## 本地验证（创建项目前）

```bash
# 根路径生产构建（模拟 Cloudflare）
PUBLIC_SITE_URL=https://example.pages.dev npm run build

# GitHub Pages 回退路径构建
npm run build:github
```

## 与 GitHub Pages 的关系

| 环境 | base | 正式构建是否含草稿 |
|---|---|---|
| Cloudflare Pages | `/` | 否（`approved+public` only） |
| GitHub Pages | `/will-in-practice/` | 否（已改为正式门禁） |
| 本地 `npm run dev` | `/` | 是（预览模式） |
