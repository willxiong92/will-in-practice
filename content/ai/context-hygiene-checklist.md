---
title: AI 上下文卫生清单：干净白板才有稳输出
slug: context-hygiene-checklist
domain: ai
topics: [context, hygiene, checklist, quality]
content_type: checklist
audience: [knowledge-worker, fde, csm, team-lead]
task: [execute, reuse]
maturity: reviewed
visibility: public
publication_status: approved
summary: 用开新会话、资料摘要、禁区声明与长度控制，保持 Context 干净，降低跑偏、泄漏与幻觉风险。
source_id: ai/context-hygiene-checklist
source_project: OKKI WIKI 知识库
reviewed_at: 2026-07-15
reviewed_by: legacy-pre-schema
updated_at: 2026-07-15
---

# AI 上下文卫生清单：干净白板才有稳输出

Context 是本轮临时白板。白板越乱，输出越像在猜。

## 开聊前

- [ ] 一会话一主题；换题就新开（旧 token 会抢注意力）
- [ ] 已写清任务与完成标准（见 [派工模板](/practice/prompt-dispatch-template)）
- [ ] 客户资料已脱敏（姓名、电话、合同额、未公开报价等）
- [ ] 明确资料边界：哪些可引用、哪些禁止上传
- [ ] 需要最新事实时，准备官方来源或开启搜索工具（并计划核验）

## 塞资料时

- [ ] 长文先自摘要或分段，不整库倾倒
- [ ] 文件上传后先让模型「复述范围与目录」，再提问
- [ ] 截图 / OCR：先转录 → 你核对 → 再分析
- [ ] 多文档时标注优先级：主文档 / 参考 / 可忽略
- [ ] 冲突信息单独标出，要求模型列分歧而非强行统一

## 对话中

- [ ] 发现跑偏：重申目标与禁区，或新开干净会话
- [ ] 不把「上一任务的错误结论」当真理继续堆
- [ ] 工具结果（搜索、代码）逐项抽查关键数字与链接
- [ ] 对客承诺类句子单独列出，人工改写

## 结束时

- [ ] 把可复用规则写回模板 / Skill，而不是留在聊天记录
- [ ] 敏感会话按公司规定删除或归档
- [ ] 最终对外稿走 [核验清单](/practice/ai-verification-checklist)

## 快速自检

| 症状 | 优先处理 |
|---|---|
| 答非所问 | 目标字段是否清楚；是否该新开会话 |
| 编造细节 | 资料是否不足却逼它「完整」 |
| 前后矛盾 | 白板上是否混了多版事实 |
| 泄露内部路径/人名 | 脱敏失败，立即停用该输出 |

## 完成标准

- 任意对客任务能说明：本轮 Context 里有什么、没有什么
- 长资料有「先理解再提问」的痕迹
- 无未授权敏感信息进入公开模型（按公司策略）

## 风险边界

- 各产品「记忆 / 项目文件夹」功能不同，原则仍是：少而准优于多而脏
- 合规要求以公司数据政策为准
