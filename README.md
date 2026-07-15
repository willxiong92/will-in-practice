# Will 的最佳实践网站

## 当前结论

本项目建设一个面向公开访客的专业知识工具站。顶层主类目为：

**AI · FDE · 外贸业务 · 国际站 · 独立站**

本地知识库与飞书知识库是 canonical 母版；本项目只保存经过筛选与复核的公开发布稿。类目细则见 `docs/TAXONOMY.md`。

## 当前阶段

阶段 2 推进中：生产安全构建、Cloudflare Pages 配置就绪（待控制台创建）、SEO 与货架式导航已落地。

- 五主类目 + 首页总览卡 + 领域货架分组
- **31 篇** `approved + public` 实践正文
- 正式构建门禁：`guard:content` → build → `guard:dist` → `guard:links`
- GitHub Pages 作为回退入口（正式构建，不含草稿）
- Cloudflare Pages 固定 `*.pages.dev`：见 `docs/CLOUDFLARE_PAGES.md`（需 Will 在控制台创建项目）

## 目录

```text
个人网站搭建/
├── AGENTS.md
├── README.md
├── content-registry.yaml
├── content/                 # 公开发布稿
├── docs/
│   ├── CLOUDFLARE_PAGES.md  # CF Pages 操作说明
│   ├── CONTENT_POLICY.md
│   ├── DECISIONS.md
│   ├── DESIGN_SYSTEM.md
│   ├── ROADMAP.md
│   └── TAXONOMY.md
├── scripts/                 # 内容 / dist / 链接门禁
├── site/                    # Astro 源码
└── public/
```

## 关键边界

- 正式线上构建只收录 `publication_status: approved|published` 且 `visibility: public`。
- `team` / `private` / `review_required` 不得进入 `dist`。
- `PUBLIC_CONTENT_PREVIEW=true` 仅用于本地草稿预览，禁止用于 GitHub/Cloudflare 生产构建。
- 不自动同步全量知识库；不引入登录、数据库、评论或 AI 聊天。

## 构建命令

| 命令 | 用途 |
|---|---|
| `npm run dev` | 本地开发（预览模式，可含草稿） |
| `npm run build` | **正式生产构建**（根路径 `/`，门禁全开） |
| `npm run build:github` | 正式构建 + GitHub Pages base |
| `npm run preview:build` | 本地草稿预览构建（不可用于生产） |
| `npm run guard:content` | frontmatter / 敏感模式检查 |
| `npm run guard:dist` | 非公开内容与泄漏检查 |
| `npm run guard:links` | 站内链接检查 |

生产构建请设置：

```bash
PUBLIC_SITE_URL=https://<project-name>.pages.dev npm run build
```

未设置时默认 canonical 回退到 GitHub Pages 完整 URL，**不会虚构** Cloudflare 地址。

## 部署地址

| 环境 | 地址 | 状态 |
|---|---|---|
| 本地 | http://localhost:4321 | `npm run dev` |
| GitHub Pages（回退） | https://willxiong92.github.io/will-in-practice/ | 已自动部署正式构建 |
| Cloudflare Pages | `https://<project-name>.pages.dev` | **待 Will 创建项目**，建议名 `will-in-practice` |

## 下一步

1. Will 在 Cloudflare 控制台创建 Pages 项目并配置 `PUBLIC_SITE_URL`（见 `docs/CLOUDFLARE_PAGES.md`）。
2. 继续补强国际站 / 外贸业务内容深度。
3. 可选：Cloudflare Access 保护 Preview 草稿环境。
