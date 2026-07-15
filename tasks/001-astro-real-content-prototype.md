# Task: Astro real-content prototype

## Objective

创建可本地运行的 Astro 网站原型，使用三篇真实预览稿完成首页、实践库和正文页，并严格执行既定视觉系统。

## Context

- 当前阶段：真实内容原型。
- 品牌：Will in Practice。
- Design Read：面向中国外贸、客户成功与 AI 实践者的编辑型知识站。
- 视觉参数：`6 / 3 / 4`。
- 所有内容仍是本地预览稿，不得发布或连接外部服务。

## Allowed Scope

- 可读取：项目全部文件。
- 可修改：`site/`、`package.json`、lockfile、`README.md`、`docs/ROADMAP.md`。
- 可新增：Astro 项目所需配置、组件、布局、样式、测试或检查脚本。
- 可引用：`public/images/hero-workbench.png` 和 `content/` 下三篇预览稿。

## Forbidden

- 不得修改 `AGENTS.md`、`docs/CONTENT_POLICY.md`、`docs/DECISIONS.md`、`docs/DESIGN_SYSTEM.md`、`content-registry.yaml` 和三篇内容正文。
- 不得把内容状态改成 `public`、`approved` 或 `published`。
- 不得部署、购买服务、绑定域名或修改任何外部系统。
- 不得引入数据库、登录、评论、AI 聊天、CMS 或后端服务。
- 不得使用 AI 紫色渐变、玻璃卡片、三张等宽功能卡、假 Dashboard、虚构数据或客户 Logo。
- 不得使用 em dash 字符。

## Requirements

1. 使用 Astro 和 TypeScript，优先原生 CSS 与少量客户端 JavaScript。
2. 实现首页、`/library`、动态正文页、`/about`、`/search`、404。
3. 内容通过 Astro content collection 或等价的类型安全方式读取，不复制正文。
4. 首页使用非对称首屏，引用真实主视觉；实现任务入口、精选内容、领域地图、最新更新、关于与反馈入口。
5. 实践库支持领域和内容形式筛选，并实现无结果状态与清除筛选。
6. 正文页显示元数据、适用对象、目录、正文、完成标准、风险边界和相关内容。
7. 全站实现 light/dark token、键盘导航、跳转到正文、清晰 focus、移动端菜单和 reduced motion。
8. 不依赖远程字体、远程图片或运行时外部 API。
9. 所有可见中文必须自然、具体，不使用占位文案。
10. 在页面明显位置标识当前内容为本地预览，避免被误认为已公开发布。

## Acceptance Criteria

- [ ] `npm install` 后可启动和构建。
- [ ] 首页首屏在常见桌面和手机高度内显示主行动。
- [ ] 桌面导航单行且不超过 80px。
- [ ] 三篇预览稿均能生成详情页。
- [ ] 筛选、空状态、移动导航和 404 可用。
- [ ] 无单页横向滚动。
- [ ] 页面不包含 `—` 或 `–`。
- [ ] 无远程字体、远程图片和虚构指标。
- [ ] `prefers-reduced-motion` 与 `prefers-color-scheme` 生效。
- [ ] 构建和类型检查通过。

## Verification

- 运行 `npm run build`。
- 运行 Astro 类型检查或项目定义的等价检查。
- 返回修改文件清单、命令结果和已知限制。
