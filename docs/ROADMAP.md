# Roadmap

## 当前状态

阶段 1 完成；阶段 2 部分完成。

- 31 篇 `approved + public` 实践稿
- 货架式首页 / 领域页
- 生产构建门禁（content / dist / links）
- GitHub Pages 已改为正式构建（无草稿）
- Cloudflare Pages 配置文档就绪，**控制台创建待 Will 确认**

## 阶段 0：内容盘点与门禁

- [x] 项目控制文件、内容政策、登记表
- [x] 五主类目 TAXONOMY
- [x] 首批公开派生稿接入（已扩至 31 篇）
- [x] 自动 frontmatter / 敏感词 / dist / 链接门禁
- [ ] 滚动复核事实时效

## 阶段 1：真实内容原型

- [x] Astro 静态站与 design tokens
- [x] 正式构建与本地草稿预览隔离
- [x] 五主类目页面与货架结构
- [x] 实践库 task / audience 筛选
- [x] SEO：canonical、OG、sitemap、robots、JSON-LD
- [x] GitHub Pages 回退部署（正式门禁）

## 阶段 2：视觉与发布闭环

- [x] 首页对齐 DESIGN_SYSTEM 主结构（身份、任务入口、精选、边界、反馈）
- [x] Cloudflare Pages 构建参数与文档（固定 `*.pages.dev`）
- [ ] Will 在 Cloudflare 控制台创建项目并完成首次生产部署
- [ ] 真实用户任务测试（3 人）
- [ ] 轻量分析（需确认）

外部状态变更门槛：部署、域名、付费服务必须由 Will 明确确认。

## 当前下一步

1. Cloudflare Pages：连接仓库、设置 `PUBLIC_SITE_URL`、Node 22、`npm run build` → `dist`
2. 内容：优先国际站 / 外贸业务深页，不单独继续堆 FDE
3. 反馈邮箱与分享图可按实际上线域名再微调
