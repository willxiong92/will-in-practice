# Roadmap

## 当前状态

阶段 1 完成；阶段 2 基本完成（生产已上线，发布闭环收口中）。

- 31 篇 `approved + public` 实践稿
- 货架式首页 / 领域页
- 生产构建门禁（content / dist / links）
- GitHub Pages 回退（正式构建，无草稿）
- Cloudflare Pages 生产：https://will-in-practice.pages.dev

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
- [x] Cloudflare Pages 项目 `will-in-practice` 已创建并完成生产部署（https://will-in-practice.pages.dev）
- [x] 生产默认 `PUBLIC_SITE_URL` / canonical 指向 pages.dev
- [ ] 连接 Git 实现 `main` 自动部署（控制台一步，见 CLOUDFLARE_PAGES.md）
- [ ] 真实用户任务测试（3 人）
- [ ] 轻量分析（需确认）

外部状态变更门槛：部署、域名、付费服务必须由 Will 明确确认。

## 阶段 3：内容加深与运营（进行中）

- [ ] 优先补强 **国际站 / 外贸业务** 深页（不单独继续堆 FDE）
- [ ] 替换占位反馈邮箱为真实地址
- [ ] 按实际上线域名微调分享图（可选）

## 当前下一步

1. （可选）Dashboard 连接 Git + 环境变量，结束 CLI 手动部署
2. 内容：国际站 / 外贸业务深页
3. 真实反馈邮箱 + 3 人任务测试
