# Cloudflare Pages 部署说明

> 状态：**项目已创建，生产已上线**  
> 生产地址：https://will-in-practice.pages.dev  
> 不要使用 Quick Tunnel；生产使用固定 `*.pages.dev`。

## 当前项目

| 项 | 值 |
|---|---|
| 项目名 | `will-in-practice` |
| 生产域名 | https://will-in-practice.pages.dev |
| 账号 | willxiong92@gmail.com |
| 连接方式（当前） | **Direct Upload**（`wrangler pages deploy`） |
| Git 连接 | **未连接**（见下方「接 Git 自动部署」） |

## 构建参数（接 Git 时使用）

| 项 | 值 |
|---|---|
| 仓库 | `willxiong92/will-in-practice` |
| Production branch | `main` |
| Framework preset | Astro（或 None） |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/`（仓库根） |
| Node.js version | `22`（`NODE_VERSION=22`） |
| 自定义域名 | 暂不购买 |

## 环境变量（接 Git 后在 Pages → Settings 配置）

Production：

| Name | Value |
|---|---|
| `PUBLIC_CONTENT_PREVIEW` | `false` |
| `PUBLIC_SITE_URL` | `https://will-in-practice.pages.dev` |
| `NODE_VERSION` | `22` |

Preview（可选）：

| Name | Value |
|---|---|
| `PUBLIC_CONTENT_PREVIEW` | `false`（默认只出 approved+public） |
| `PUBLIC_SITE_URL` | Preview URL 或留空 |

> 草稿预览请只用本地 `npm run preview:build`。若必须用 Cloudflare Preview 看草稿，应加 Cloudflare Access，且仅在 Preview 设 `PUBLIC_CONTENT_PREVIEW=true`。

## 手动 / CLI 部署（当前默认）

本机已 `wrangler login` 后：

```bash
# 生产构建（默认 canonical = will-in-practice.pages.dev）
npm run build

# 部署 dist 到生产
env -u HTTP_PROXY -u HTTPS_PROXY -u http_proxy -u https_proxy -u ALL_PROXY -u all_proxy \
  npx wrangler pages deploy dist --project-name=will-in-practice --branch=main
```

> 若本机走了系统代理导致 API 失败，用上面的 `env -u *PROXY*` 清代理再部署。

## 接 Git 自动部署（推荐，需在控制台点一次）

Direct Upload 项目**不能**通过 wrangler 一键改绑 Git，需在 Dashboard 操作：

1. 打开 [Cloudflare Dashboard → Workers & Pages → will-in-practice](https://dash.cloudflare.com/)
2. Settings → Builds & deployments → **Connect to Git**（或创建 Git 连接的新 Pages 项目并指向同一仓库）
3. 授权 GitHub，选择 `willxiong92/will-in-practice`
4. 填上表构建参数 + Production 环境变量
5. 保存后 push `main` 应触发 Production 部署
6. 验证 https://will-in-practice.pages.dev/ 与 `/library`

若「Connect to Git」对已有 Direct Upload 项目不可用：可新建 Git 连接的 Pages 项目（同名可能冲突时用临时名再迁域名），或继续用 CLI 部署。

## 本地验证

```bash
# 根路径生产构建（Cloudflare）
npm run build

# GitHub Pages 回退路径构建
npm run build:github
```

## 与 GitHub Pages 的关系

| 环境 | base | 正式构建是否含草稿 |
|---|---|---|
| Cloudflare Pages（生产） | `/` | 否（`approved+public` only） |
| GitHub Pages（回退） | `/will-in-practice/` | 否 |
| 本地 `npm run dev` | `/` | 是（预览模式） |
