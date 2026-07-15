# Will 的最佳实践网站

## 当前结论

本项目建设一个面向公开访客的专业知识工具站。顶层主类目为：

**AI · FDE · 外贸业务 · 国际站 · 独立站**

本地知识库与飞书知识库是 canonical 母版；本项目只保存经过筛选与复核的公开发布稿。类目细则见 `docs/TAXONOMY.md`。

## 当前阶段

阶段 3 内容加深：生产已上线，Git 自动部署已接通。

- 五主类目 + 首页总览卡 + 领域货架分组
- **66 篇** `approved + public` 实践正文
- 正式构建门禁：`guard:content` → build → `guard:dist` → `guard:links`
- **生产**：https://will-in-practice.pages.dev （Cloudflare Pages + Git `main`）
- GitHub Pages 作为回退入口（正式构建，不含草稿）

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

## 安全边界

- 正式线上构建只收录 `publication_status: approved|published` 且 `visibility: public`。
- `team` / `private` / `review_required` 不得进入 `dist`。
- `PUBLIC_CONTENT_PREVIEW=true` 仅用于本地草稿预览，禁止用于 GitHub/Cloudflare 生产构建。
- 不自动同步全量知识库；不引入登录、数据库、评论或 AI 聊天。

## 构建命令

| 命令 | 用途 |
|---|---|
| `npm run dev` | 本地开发（预览模式，可含草稿） |
| `npm run build` | **正式生产构建**（根路径 `/`，门禁全开；默认 CF canonical） |
| `npm run build:github` | 正式构建 + GitHub Pages base |
| `npm run preview:build` | 本地草稿预览构建（不可用于生产） |
| `npm run guard:content` | frontmatter / 敏感模式检查 |
| `npm run guard:dist` | 非公开内容与泄漏检查 |
| `npm run guard:links` | 站内链接检查 |

生产构建默认 `PUBLIC_SITE_URL=https://will-in-practice.pages.dev`（可被环境变量覆盖）：

```bash
npm run build
# 或显式指定
PUBLIC_SITE_URL=https://will-in-practice.pages.dev npm run build
```

## 部署地址

| 环境 | 地址 | 状态 |
|---|---|---|
| 本地 | http://localhost:4321 | `npm run dev` |
| GitHub Pages（回退） | https://willxiong92.github.io/will-in-practice/ | 已自动部署正式构建 |
| Cloudflare Pages（生产） | **https://will-in-practice.pages.dev** | 已上线（长期免费固定域名） |

CLI 部署（Direct Upload）：

```bash
npm run build
env -u HTTP_PROXY -u HTTPS_PROXY -u http_proxy -u https_proxy -u ALL_PROXY -u all_proxy \
  npx wrangler pages deploy dist --project-name=will-in-practice --branch=main
```

接 Git 自动部署步骤见 `docs/CLOUDFLARE_PAGES.md`。

## 下一步

1. 继续从本地结构化 wiki 编译公开实践（AI / 独立站 / 外贸）。
2. 滚动复核事实时效。
3. 可选：任务测试、轻量分析、自定义域名（需 Will 确认）。
