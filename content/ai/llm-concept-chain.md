---
title: 从 LLM 到 Skill：对客交付前先搞清这条概念链
slug: llm-concept-chain
domain: ai
topics: [llm, agent, skill, concepts, training]
content_type: guide
audience: [knowledge-worker, team-lead, fde, csm]
task: [learn]
maturity: reviewed
visibility: public
publication_status: approved
summary: 用 LLM → Token → Context → Prompt → Tool → Agent → Skill 一条链，建立对客使用 AI 的共同语言，避免把「会聊天」当成「会交付」。
source_id: ai/llm-to-agent-skill
source_project: OKKI WIKI 知识库
reviewed_at: 2026-07-15
reviewed_by: legacy-pre-schema
updated_at: 2026-07-15
---

# 从 LLM 到 Skill：对客交付前先搞清这条概念链

模型名字每周都在变。团队要先共享**结构**，再争论产品名。

## 适合谁

- 新人第一次对客使用 AI
- 主管要统一培训口径
- 觉得「提示词不够用」却说不清缺的是哪一层

## 概念链

```text
LLM（生成引擎）
  → Token（处理单位）
  → Context（本轮可见信息）
  → Prompt（任务与规则）
  → Tool（外部能力）
  → Agent（连续规划与执行）
  → Skill（可复用说明书 / SOP）
```

| 概念 | 一句话 | 对客时怎么用 |
|---|---|---|
| LLM | 按概率续写的文字生成引擎 | 强在归纳与起草，不等于掌握最新事实 |
| Token | 模型切分文本的基本单位 | 资料越长越贵、越挤、越容易跑偏 |
| Context | 本轮任务白板上的全部信息 | 背景、资料、禁区、历史都在白板上 |
| Prompt | 派工单 | 对象、目标、格式、不能做什么 |
| Tool | 平台代调的外部能力 | 搜索、读文件、算数、写库 |
| Agent | 会拆步骤并连用工具的办事员 | 多步任务，不是一问一答 |
| Skill | 给 Agent / 人看的 SOP 卡片 | 高频任务沉淀步骤与范例 |

## 常见误区

| 误区 | 纠正 |
|---|---|
| 说得通顺 = 事实正确 | 对客事实必须核验 |
| 窗口越大越好把全库塞进去 | 先筛选、摘要、结构化 |
| 提示词是咒语 | 本质是把任务说清楚 |
| 用了工具 = 可以免责 | 权限与人工检查仍在 |
| 每次重复讲同样规则 | 该沉淀为 Skill / 模板 |

## 和本站其他页的关系

- 任务怎么分流 → [按任务选方式](/practice/task-based-ai-selection)
- 派工怎么写 → [派工模板](/practice/prompt-dispatch-template)
- 对客怎么验 → [核验清单](/practice/ai-verification-checklist)
- 工作台怎么搭 → [LLM Wiki 工作台](/practice/llm-wiki-workbench)

## 完成标准

- 能用自己的话向新人解释整条链（各一句）
- 能指出当前任务卡在 Context / Tool / 核验的哪一层
- 不把「换更强模型」当成唯一手段

## 风险边界

- 具体产品名、版本、价格会变；本页只固定结构
- 不构成对任一厂商能力的承诺
