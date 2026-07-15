---
title: 把高频 AI 用法沉淀为 Skill / SOP 卡片
slug: skill-sop-template
domain: ai
topics: [skill, sop, reuse, template, agent]
content_type: template
audience: [team-lead, knowledge-worker, fde, csm]
task: [execute, reuse]
maturity: reviewed
visibility: public
publication_status: approved
summary: 用目标、适用边界、步骤、判断规则、输入输出与示例，把重复对话规则写成 Agent 与人都能执行的 SOP 卡片。
source_id: ai/skill-sop-template
source_project: OKKI WIKI 知识库
reviewed_at: 2026-07-15
reviewed_by: legacy-pre-schema
updated_at: 2026-07-15
---

# 把高频 AI 用法沉淀为 Skill / SOP 卡片

同一套规则如果每周重打三遍，就该写成 Skill（说明书），而不是再靠记忆。

## 何时值得沉淀

- 同结构任务每周 ≥ 2 次  
- 输出格式固定（周报、诊断摘要、询盘首回）  
- 新人照做能达到 80 分  
- 出错成本高，需要统一禁区  

不值得：一次性探索、规则仍剧烈变化的试验。

## 卡片模板

```text
# 名称：
## 目标（一句话）
## 适用 / 不适用
## 输入（必须提供的字段）
## 步骤（编号，可执行）
## 判断规则（if/then）
## 输出格式
## 禁区与升级条件
## 示例（2 个：好例子 / 坏例子）
## 核验要点（发出前）
## 维护：负责人 / 复核周期
```

## 字段要点

| 块 | 写好的标准 |
|---|---|
| 目标 | 可验收，不写「变得更好」 |
| 边界 | 明确不接哪些任务 |
| 步骤 | 第三人称可执行，无「酌情」悬空 |
| 规则 | 可判断，不靠玄学 |
| 示例 | 展示边界，不只展示完美样张 |
| 核验 | 与 [核验清单](/practice/ai-verification-checklist) 对齐 |

## 与 Agent 的关系

- **Prompt**：单次派工  
- **Skill**：可被 Agent 反复加载的 SOP  
- **Wiki 知识**：事实与方法的母版；Skill 引用知识，不复制整库  

专家 Agent 应**变强于知识变厚**，而不是无限加长系统提示。

## 示例：周复盘纪要 Skill（缩略）

1. 收集：本期事实（只列可核对项）  
2. 结构：事实 → 问题 → 原因假设 → 动作 → 责任人 → 检查日  
3. 禁区：不编造未发生的承诺  
4. 输出：表格 + 3 条下周动作  
5. 核验：责任人是否本人确认  

## 完成标准

- [ ] 新人只靠卡片能完成一次任务
- [ ] 禁区与升级条件非空
- [ ] 有维护人与「过期重核」日期

## 风险边界

- 内含客户数据的示例必须脱敏
- Skill 不能授予越权操作（发信、改价、下单）
