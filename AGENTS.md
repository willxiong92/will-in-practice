# AGENTS 个人最佳实践网站

## 目标

本项目把本地 canonical 知识母版单向编译为公开发布稿。网站不是个人知识库副本，`content/` 也不是新的事实来源。

## 启动顺序

1. 先读 `README.md`、`docs/ROADMAP.md`、`docs/CONTENT_POLICY.md`。
2. 涉及类目、领域页或内容归属时，读 `docs/TAXONOMY.md`。
3. 涉及产品或信息架构决策时，再读 `docs/DECISIONS.md`。
4. 修改发布候选前，核对 `content-registry.yaml` 的来源、状态和公开风险。

## 类目边界（摘要）

- 顶层主类目：`ai` · `fde` · `trade_ops` · `global_platform` · `indie_site`。
- 对外保留 **FDE** 名称，不用「客户成功」替换顶栏。
- **AI 以对客实践为主线**，工具教程只进入「工作台」支撑，不主导导航。
- 国际站与独立站分开；FDE 不承接国际站平台细则。

## 内容边界

- 只允许 `publication_status: approved` 且 `visibility: public` 的发布稿进入正式构建。
- `team`、`private`、未标可见性和 `review_required` 内容一律不得公开。
- 不直接修改来源知识库；来源内容只读，改进建议回到对应 canonical 项目另行处理。
- 不把客户、员工、合同、账号、密钥、本机路径、内部产品代号、内部治理记录带入公开稿。
- `source_id` 只用于本地追溯；公开页面不得暴露本机绝对路径和内部目录结构。

## 工程边界

- 首期采用 Astro 静态站，Markdown 为主；没有明确需求时不增加后端、登录、数据库、评论或 AI 聊天。
- 新依赖必须说明用户价值、维护影响和更简单替代方案。
- 不执行部署、域名、付费服务或外部系统变更，除非 Will 明确确认。
- 不覆盖用户已有修改；不使用宽泛暂存或破坏性 Git 命令。

## 完成门禁

- 内容：来源可追溯、公开授权明确、脱敏完成、事实与链接已复核。
- 页面：桌面和移动端可用，键盘可访问，支持 reduced motion，无占位正文。
- 工程：构建、类型检查、内容校验和关键路径检查通过。
- 状态：同步更新 `README.md`、`docs/ROADMAP.md` 和 `content-registry.yaml`。
