---
title: 协作场景卡：话术、摘要、复盘与资料分析的固定打法
slug: collab-scene-cards
domain: ai
topics: [collaboration, template, playbook, csm]
content_type: playbook
audience: [fde, csm, team-lead, knowledge-worker]
task: [execute, reuse]
maturity: reviewed
visibility: public
publication_status: approved
summary: 四张协作场景卡（话术、资料摘要、复盘纪要、客户资料分析）给出输入字段、步骤与合格线，便于内部高频复用。
source_id: ai/collab-scene-cards
source_project: OKKI WIKI 知识库
reviewed_at: 2026-07-15
reviewed_by: legacy-pre-schema
updated_at: 2026-07-15
---

# 协作场景卡：话术、摘要、复盘与资料分析的固定打法

以下默认在 **日常协作层**（见 [三层分工](/practice/agent-layer-roles)），输出对客前仍须核验。

通用派工字段见 [派工模板](/practice/prompt-dispatch-template)。

## 卡 1 · 客户沟通话术

**输入：** 对象角色、沟通阶段、目标、语气、已知事实、禁区承诺  
**步骤：**

1. 复述目标与禁区  
2. 生成 2 版语气（稳妥 / 更积极）  
3. 列出「待业务确认」句  

**合格：** 无指责、无越权承诺、可直接粘贴再改 1 分钟。

## 卡 2 · 资料摘要

**输入：** 资料范围、读者、要回答的 3 个问题、摘要粒度  
**步骤：**

1. 目录 / 结构复述  
2. 按问题回答，并标注出处段落  
3. 列出「资料未覆盖」  

**合格：** 每条结论能指回原文；不假装读过未提供的章节。

## 卡 3 · 复盘纪要

**输入：** 本期事实清单（可核对）、参与人、目标  
**输出结构：**

| 字段 | 要求 |
|---|---|
| 事实 | 可核对，不写情绪 |
| 问题 | 一个问题一行 |
| 原因假设 | 标明是假设 |
| 动作 | 动词开头、可执行 |
| 责任人 | 具体到人 |
| 检查日 | 有日期 |

**合格：** 至少 1 条动作含责任人 + 检查日。

## 卡 4 · 客户资料分析（内部）

**输入：** **已脱敏** 材料；分析目的；禁止上传项清单  
**步骤：**

1. 确认脱敏完成  
2. 背景 / 诉求 / 风险信号 / 建议下一步  
3. 关键判断标「需负责人确认」  

**合格：** 无原始电话/合同额/未授权截图；下一步可执行。

## 串起来的一周节奏（示例）

| 日 | 场景卡 |
|---|---|
| 一 | 资料摘要（周报材料） |
| 三 | 客户话术（重点跟进） |
| 五 | 复盘纪要 |
| 随时 | 资料分析（新线索/新客） |

高频固定后 → 沉淀为 [Skill 卡片](/practice/skill-sop-template)。

## 完成标准

- 四卡都能指出「输入缺什么就不能开跑」
- 团队抽查 3 份输出，合格线一致
- 对客发出前有 [核验](/practice/ai-verification-checklist) 痕迹

## 风险边界

- 内部分析结论 ≠ 可直接转发客户的诊断书  
- 涉及绩效与人事评价时，遵守公司保密规定  
