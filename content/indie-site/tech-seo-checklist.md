---
title: 技术 SEO 检查清单：抓取、安全、速度与结构化
slug: tech-seo-checklist
domain: indie_site
topics: [seo, technical-seo, checklist, performance]
content_type: checklist
audience: [export-marketer, knowledge-worker, team-lead]
task: [diagnose, execute, reuse]
maturity: reviewed
visibility: public
publication_status: approved
summary: 按 HTTPS、域名规范、robots/sitemap、速度、Schema、内链与 404 优先级检查 B2B 独立站技术基础。
source_id: indie/tech-seo-checklist
source_project: OKKI WIKI 知识库
reviewed_at: 2026-07-15
updated_at: 2026-07-15
---

# 技术 SEO 检查清单：抓取、安全、速度与结构化

内容和外链建立在「能被稳定抓取与理解」之上。

## 优先级

```text
HTTPS → 域名规范化 → robots/sitemap
  → 速度与核心体验 → Schema → 内链 → 404/软 404
```

## 安全与域名

- [ ] 全站 HTTPS，无混合内容告警  
- [ ] `www` / 非 `www` 只保留一套，其余 301  
- [ ] 首页与关键页无错误证书/跳转环  

## 抓取与索引

- [ ] `robots.txt` 放行有价值路径，屏蔽后台/结账/纯参数垃圾页  
- [ ] Sitemap 提交且只含规范 URL  
- [ ] 重要产品页可被内链到达，非孤立  
- [ ] 无错误 `noindex` 挡主页  

示例结构（按站点改写）：

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /checkout/
Sitemap: https://www.example.com/sitemap.xml
```

## 速度与体验

- [ ] 主模板体积可控；大图压缩与尺寸属性  
- [ ] 关键页可交互时间可接受（用你常用的测速工具）  
- [ ] 移动端主 CTA 可点、无遮挡  
- [ ] 非关键 iframe/第三方脚本懒加载或延后  

## 结构化数据

- [ ] Organization（公司/联系）  
- [ ] Product（核心产品参数）  
- [ ] FAQPage（高意图问答，内容真实）  
- [ ] 结构化数据与可见正文一致，不堆假富媒体  

## 内链与错误页

- [ ] 分类 → 产品 → 相关内容有清晰路径  
- [ ] 自定义 404，引导回首页/搜索/主推品  
- [ ] 批量死链定期清  

## 完成标准

- 技术项有检查日期与负责人  
- 主推产品页在无站外外链情况下仍可从首页点到  
- 抓取/索引异常有工单而非口头「好像有问题」  

## 风险边界

- 具体服务器配置因栈而异；清单是验收项不是唯一实现  
- 过度屏蔽会导致收录失败，改 robots 需复查  
