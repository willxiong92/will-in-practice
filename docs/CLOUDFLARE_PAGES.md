# Cloudflare Pages 部署说明

> 状态：**生产已上线，Git 已连接，团队与管理员权限已启用**
> 生产地址：https://will-in-practice.pages.dev  
> 不要使用 Quick Tunnel；生产使用固定 `*.pages.dev`。

## 当前项目

| 项 | 值 |
|---|---|
| 项目名 | `will-in-practice` |
| 生产域名 | https://will-in-practice.pages.dev |
| 账号 | willxiong92@gmail.com |
| 连接方式 | **GitHub** `willxiong92/will-in-practice`（`main` → Production） |
| 备用 | Direct Upload / `wrangler pages deploy` 仍可用 |

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

Production Secrets（只在 Cloudflare 控制台配置，不写入 GitHub）：

| Name | 用途 |
|---|---|
| `TEAM_PASSWORD` | 团队成员共享访问口令 |
| `ADMIN_USER` | 管理员账号 |
| `ADMIN_PASSWORD` | 管理员密码 |
| `SESSION_SECRET` | HMAC 会话签名密钥，建议使用至少 32 字节随机值 |

可选绑定：

| Binding | 类型 | 用途 |
|---|---|---|
| `WIP_ACCESS_AUDIT` | KV | 保存 30 天脱敏登录与退出记录；未绑定不影响权限运行 |

`public/_worker.js` 会随构建进入 `dist/_worker.js`，使 Cloudflare Pages 使用 Advanced Mode。公开内容仍免登录；只有 `/team/` 与 `/admin/` 受控。GitHub Pages 不运行 Worker，所以这些页面只允许包含公开安全信息。

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

## Git 自动部署（已接通）

- 仓库：`willxiong92/will-in-practice`
- Production branch：`main`
- 推送 `main` 后 Cloudflare 会 `clone_repo → npm run build → deploy`
- 若 Git 安装异常，可 `POST .../pages/projects/will-in-practice/source` 重挂（需账号已授权 GitHub App）

日常发布：

```bash
git push origin main
# 在 Cloudflare Deployments 查看 Production 是否 success
```

## 本地验证

```bash
# 根路径生产构建（Cloudflare）
npm run build

# GitHub Pages 回退路径构建
npm run build:github

# 权限边界测试（不需要真实口令）
npm run test:access
```

## 与 GitHub Pages 的关系

| 环境 | base | 正式构建是否含草稿 |
|---|---|---|
| Cloudflare Pages（生产） | `/` | 否（`approved+public` only） |
| GitHub Pages（回退） | `/will-in-practice/` | 否 |
| 本地 `npm run dev` | `/` | 是（预览模式） |
