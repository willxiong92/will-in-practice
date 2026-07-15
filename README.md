# Will 的最佳实践网站

## 当前结论

本项目建设一个面向公开访客的专业知识工具站。顶层主类目为：

**AI · FDE · 外贸业务 · 国际站 · 独立站**

- **AI**：对客实践主线（方案 / 工作台 / 场景 Playbook / 核验），不是工具课目录站。
- **FDE**：保留 FDE 名称；客户成功方法是其下主线，不顶替顶栏。
- **外贸业务 / 国际站 / 独立站**：三分，避免一个「外贸」桶吞掉三条工作流。

本地知识库与飞书知识库继续作为 canonical 母版；本项目只保存经过筛选、脱敏、重写和复核的公开发布稿。类目细则见 `docs/TAXONOMY.md`。

## 当前阶段

阶段 1：网站架构第一版已上线。

- 五主类目 + 领域主线地图排版
- 约 **29 篇**实践正文（`approved + public`）
- FDE / AI 主线已对齐飞书知识库原文口径（产品名保留：SHOP / AIReach / CRM / AWB 等）
- 内部预览：GitHub Pages

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

1. 小范围试读 16 篇首批稿，收集“看不懂 / 做不了 / 事实过时”反馈。
2. 按主线补第二批：国际站合规、独立站 Ads 诊断、外贸付款风险、FDE 经营公式深页。
3. 需要时换自有域名与托管；当前免费预览地址见下。

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
