---
title: AI 工作三层分工：知识运维 · 日常协作 · 对客展示
slug: agent-layer-roles
domain: ai
topics: [agent, architecture, workflow, team]
content_type: guide
audience: [team-lead, knowledge-worker, fde, csm]
task: [learn, diagnose]
maturity: reviewed
visibility: public
publication_status: approved
summary: 把 AI 用法分成知识运维、日常协作、对客展示三层，避免用同一会话既改库又对客演示、既塞隐私又公开输出。
source_id: ai/agent-layer-roles
source_project: OKKI WIKI 知识库
reviewed_at: 2026-07-15
reviewed_by: legacy-pre-schema
updated_at: 2026-07-15
---

# AI 工作三层分工：知识运维 · 日常协作 · 对客展示

混层是团队 AI 最常见的事故源：内部规则泄漏到客户会话，或对客话术污染知识母版。

## 三层一览

| 层 | 定位 | 主要输入 | 主要输出 | 不做什么 |
|---|---|---|---|---|
| 知识运维 | 结构化与门禁 | 原始资料、规则、脚本 | Wiki/清单、索引、巡检结果 | 不当日常闲聊前台；不做客户演示 |
| 日常协作 | 内部加速 | 已整理知识、SOP、内部材料 | 问答、复盘、辅导稿、培训页 | 不直接治理库结构；不发未核验对客承诺 |
| 对客展示 | 可演示交付 | 已批准的 playbook/导出稿 | 方案、诊断框架、场景演示 | 不混入本机路径、密钥、未脱敏客户数据 |

可选第四层：**安全共享副本**（私有仓库 / 受控同步）——只放可共享知识，不放 raw 隐私与密钥。它不改变上表职责，只解决「跨设备/协作可读」。

## 什么时候用哪一层

**知识运维**

- 新资料入库、拆页、补元数据  
- 断链巡检、过期复核  
- 规则与自动化维护  

**日常协作**

- 内部问答与策略草稿  
- 1:1、复盘、培训材料  
- 基于已有知识的分析  

**对客展示**

- 客户可见方案与演示  
- 行业 Agent 场景（外贸/独立站等）  
- 必须可解释、可核验的输出  

## 混层症状与纠正

| 症状 | 纠正 |
|---|---|
| 对客会话里出现内部仓库路径 | 换对客层；重写上下文 |
| 演示 Agent 能改生产知识库 | 拆权限；展示层只读批准稿 |
| 同一提示词既写母版又写客户邮件 | 拆成两个 Skill / 两次派工 |
| 协作层随手上传合同扫描件 | 先脱敏；敏感材料不进公开模型 |

## 与本站其他页

- 概念链 → [LLM→Skill](/practice/llm-concept-chain)  
- 工作台 → [LLM Wiki](/practice/llm-wiki-workbench)  
- 沉淀 → [Skill 模板](/practice/skill-sop-template)  
- 对客闸门 → [核验清单](/practice/ai-verification-checklist)  

## 完成标准

- 团队能指出当前任务属于哪一层
- 对客材料来源可追溯到「已批准公开/可演示」集合
- 知识母版变更有运维层记录，而不是聊天里口头改

## 风险边界

- 具体平台产品名会变；原则是职责分离，不是品牌绑定
- 法务与数据驻留以公司政策为准
