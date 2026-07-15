# 决策记录

## D-001 网站定位

- 决策：个人最佳实践发布站，专业知识工具属性约 70%，个人品牌属性约 30%。
- 原因：优先帮助访客完成真实任务，而不是展示文章数量。
- 影响：首页和内容页以任务、方法、模板和完成标准组织。

## D-002 内容所有权

- 决策：本地知识库是 canonical 母版，网站 `content/` 是公开派生层。
- 原因：避免两套正文独立演化。
- 影响：每篇发布稿必须保存 `source_id`、来源项目和复核日期。

## D-003 发布方式

- 决策：白名单单向发布，不自动遍历全部知识库。
- 原因：公开安全判断不能由“没有标 private”替代。
- 影响：首期效率略低，但泄露风险和错误同步风险显著降低。

## D-004 技术栈

- 决策：候选内容确认后使用 Astro + Markdown/MDX 构建静态站。
- 原因：内容型网站可保持较低运行复杂度和浏览器 JavaScript 体积。
- 影响：首期不引入登录、数据库和复杂服务端能力。
- 简化替代：若只验证阅读需求，可使用现成文档主题；当前保留 Astro 以支持更清晰的品牌和任务导航。

## D-005 开发启动门槛

- 决策：至少 3 篇真实公开稿通过门禁后，再创建网站程序。
- 原因：使用占位文案会让首页结构和视觉判断偏离真实内容。
- 影响：阶段 0 优先投入内容审核，减少后续返工。

## D-006 顶层类目

- 决策：公开站顶层主类目为 **AI · FDE · 外贸业务 · 国际站 · 独立站**。
- 原因：旧三分法里「外贸」过粗；国际站与独立站是不同工作流；FDE 是稳定对外名称，不改成「客户成功」。
- 影响：导航、领域页、`domain` 枚举与 `content/` 目录按五主类目组织；详细主线见 `docs/TAXONOMY.md`。

## D-007 FDE 命名

- 决策：对外与对内公开层均保留 **FDE**；「客户成功方法」只作为 FDE 域下的 L2 主线。
- 原因：与飞书 FDE 知识库、团队 FDE-KB 一致，避免公开站与内部知识结构两套名称。
- 影响：顶栏、路径、schema 使用 `fde`；文案可解释 FDE 服务一体化经营与交付，但不改名。

## D-008 AI 主线 = 对客实践

- 决策：AI 域以 **对客实践** 为主线，不以模型评测或工具课目录为主线。
- 原因：飞书 AI 知识库资产偏工具与接入，公开站需要按「能对客交付什么」重组；本地 Wiki 已有对客/外部助手与任务卡锚点。
- 影响：AI 领域页 L2 固定为：总方案 → 人机协同工作台 → 对客场景 Playbook → 任务分流 → 核验边界 →（次级）环境基线。工具教程编译进工作台，不单独主导导航。

## D-009 外贸三分

- 决策：将外贸拆为 **外贸业务 / 国际站 / 独立站** 三个主类目。
- 原因：三条工作流的指标、动作和母版来源不同；FDE-KB 也不把国际站细则并入 FDE。
- 影响：原 `trade` 内容按主题迁入 `trade_ops`、`global_platform` 或 `indie_site`。

## D-010 生产托管

- 决策：个人网站生产环境采用 **Cloudflare Pages** 静态托管，使用固定免费地址 `https://will-in-practice.pages.dev`；GitHub Pages 保留为回退入口。
- 原因：Quick Tunnel 依赖本机且 URL 会变，不适合对外传播；Pages 固定域名可关机访问、可对外传播。
- 影响：生产 `base` 为 `/`；默认 `PUBLIC_SITE_URL` / Astro `site` 为 `https://will-in-practice.pages.dev`（可被环境变量覆盖）。接 Git 后仍建议在 CF Production 环境变量写同一值。

## D-012 生产项目已落地

- 决策：Cloudflare Pages 项目名固定为 `will-in-practice`，生产域名 `https://will-in-practice.pages.dev`。
- 原因：首次部署已完成；代码与文档可写死真实 hostname，避免再回落 GitHub origin。
- 影响：`astro.config.mjs` 非 GitHub 构建默认 site 为 pages.dev；CLI 继续 Direct Upload，Git 自动部署需控制台连接仓库。

## D-011 生产内容门禁

- 决策：Cloudflare Pages 与 GitHub Pages 正式构建禁止 `PUBLIC_CONTENT_PREVIEW=true`，仅收录 `approved|published` 且 `public` 内容；构建流水线包含 content / dist / links 自动门禁。
- 原因：防止草稿与非公开内容泄漏到固定生产 URL。
- 影响：本地 `npm run dev` / `preview:build` 仍可预览草稿；线上 Preview 若看草稿必须另加 Access。

## D-013 实践稿写作结构与结构参考边界

- 决策：公开实践稿优先采用「场景与问题 → 核心判断 → 方法拆解 → 风险边界 → 行动工具」五段式，并强制知识关联与可交付行动工具；八宝周等图谱材料只作结构参考。
- 原因：提升任务完成率与可复用性，同时避免把第三方付费/公众号内容近义洗稿进公开站。
- 影响：作者模式须遵守 `docs/WRITING_GUIDE.md`；新稿默认 `maturity: draft` + `visibility: private` + `publication_status: review_required`，未经独立审核不得建议公开。
