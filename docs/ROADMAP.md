# Roadmap

## 当前状态

阶段 2 完成；阶段 3 内容加深进行中。

- 35 篇 `approved + public` 实践稿（原 31 + 外贸/国际站 4 篇）
- 货架式首页 / 领域页
- 生产构建门禁（content / dist / links）
- GitHub Pages 回退（正式构建，无草稿）
- Cloudflare Pages 生产：https://will-in-practice.pages.dev
- **Git 已连接**：`main` push 触发生产构建

## 阶段 0：内容盘点与门禁

- [x] 项目控制文件、内容政策、登记表
- [x] 五主类目 TAXONOMY
- [x] 首批公开派生稿接入
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

- [x] 首页对齐 DESIGN_SYSTEM 主结构
- [x] Cloudflare Pages 构建参数与固定 `*.pages.dev`
- [x] 项目 `will-in-practice` 生产部署
- [x] 生产默认 `PUBLIC_SITE_URL` / canonical
- [x] Git 连接实现 `main` 自动部署
- [ ] 真实用户任务测试（3 人）
- [ ] 轻量分析（需确认）

外部状态变更门槛：部署、域名、付费服务必须由 Will 明确确认。

## 阶段 3：内容加深与运营（进行中）

- [x] 补强外贸业务：跟进维护、展会执行
- [x] 补强国际站：发品内容清单、推广诊断
- [x] 首页反馈邮箱统一为 `will@willinpractice.com`
- [ ] 继续国际站 / 外贸业务深页（样品、客诉、RFQ 模板等）
- [ ] 3 人任务测试
- [ ] 分享图微调（可选）

## 当前下一步

1. push 本批内容，确认 CF Git 自动部署 success
2. 约 3 人按真实任务走一遍站点
3. 按反馈继续补深页
