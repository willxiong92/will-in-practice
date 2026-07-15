# Will 的最佳实践网站

## 当前结论

本项目建设一个面向公开访客的专业知识工具站。顶层主类目为：

**AI · FDE · 外贸业务 · 国际站 · 独立站**

- **AI**：对客实践主线（方案 / 工作台 / 场景 Playbook / 核验），不是工具课目录站。
- **FDE**：保留 FDE 名称；客户成功方法是其下主线，不顶替顶栏。
- **外贸业务 / 国际站 / 独立站**：三分，避免一个「外贸」桶吞掉三条工作流。

本地知识库与飞书知识库继续作为 canonical 母版；本项目只保存经过筛选、脱敏、重写和复核的公开发布稿。类目细则见 `docs/TAXONOMY.md`。

## 当前阶段

阶段 0：内容盘点与发布门禁；类目框架已重梳。

已建立项目控制面，并登记 9 篇首发候选。所有候选均处于 `review_required`，尚无内容获准公开；Astro 原型仍为旧三分域（`ai/fde/trade`），需按新类目迁移。原型只允许通过预览命令查看草稿。

## 目录

```text
个人网站搭建/
├── AGENTS.md
├── README.md
├── 网站搭建规划.md
├── content-registry.yaml
├── content/               # 仅放审核后的公开发布稿
├── docs/
│   ├── CONTENT_POLICY.md
│   ├── DECISIONS.md
│   ├── DESIGN_SYSTEM.md
│   ├── ROADMAP.md
│   └── TAXONOMY.md        # 类目、L2 主线与展示模块
├── scripts/               # 内容校验脚本（规划中）
└── site/                  # Astro 静态站原型
```

## 关键边界

- `share: team` 不等于 `visibility: public`。
- 网站不直接遍历或同步整个本地知识库 / 飞书库。
- 公开稿必须有唯一 `source_id`，但公开页面不展示本机路径。
- 未获批准的候选可以盘点和改写，不得进入正式构建或部署。

## 当前交付物

| 文件 | 用途 | 状态 |
|---|---|---|
| `网站搭建规划.md` | 定位、架构、内容模型和技术方案 | active |
| `content-registry.yaml` | 候选来源、风险、状态和发布映射 | active |
| `docs/CONTENT_POLICY.md` | 公开分级、脱敏和审核门禁 | active |
| `docs/DECISIONS.md` | 已批准的稳定决策 | active |
| `docs/TAXONOMY.md` | 顶层类目、L2 主线、展示与补货 | active |
| `docs/ROADMAP.md` | 阶段任务、验收和下一步 | active |

## 下一步

1. 按 `docs/TAXONOMY.md` 迁移 schema / 导航 / 内容目录到五主类目。
2. 逐篇完成候选公开性审查；AI 优先对客实践稿，FDE 优先保障与复盘。
3. 至少 3 篇真实公开稿通过门禁后，再切换正式构建内容。

## 构建命令

- `npm run dev`：本地开发（预览模式，含草稿）。
- `npm run build`：正式安全构建，只收录 `approved + public` 内容。
- `npm run preview:build`：本地预览构建，允许草稿，不用于正式发布。
- `npm run preview:pages`：GitHub Pages 内部预览构建（带 `base` 路径）。

## 内部预览地址

- 本地：`npm run dev` → http://localhost:4321
- 免费域名（GitHub Pages）：推送 `main` 后自动部署  
  `https://willxiong92.github.io/will-in-practice/`
- 后续自购域名 / 服务器时，去掉 `GITHUB_PAGES` 环境变量，把 `astro.config.mjs` 的 `site` 换成正式域名即可。
