export const domains = [
  'ai',
  'fde',
  'trade_ops',
  'global_platform',
  'indie_site',
] as const;

export type DomainId = (typeof domains)[number];

export const domainNames: Record<DomainId, string> = {
  ai: 'AI',
  fde: 'FDE',
  trade_ops: '外贸业务',
  global_platform: '国际站',
  indie_site: '独立站',
};

export const domainPaths: Record<DomainId, string> = {
  ai: '/ai',
  fde: '/fde',
  trade_ops: '/trade-ops',
  global_platform: '/global-platform',
  indie_site: '/indie-site',
};

export const typeNames = {
  article: '文章',
  guide: '指南',
  playbook: 'Playbook',
  case: '案例',
  template: '模板',
  checklist: '检查清单',
} as const;

export const audienceNames: Record<string, string> = {
  'knowledge-worker': '知识工作者',
  'team-lead': '团队主管',
  csm: '客户成功',
  consultant: '顾问',
  fde: 'FDE',
  'export-marketer': '外贸营销',
  'website-operator': '网站运营',
  'export-sales': '外贸业务员',
  'platform-operator': '平台运营',
};

export type LineDef = {
  id: string;
  title: string;
  desc: string;
  /** content frontmatter.line or slug fallbacks */
  slugs: string[];
};

export type DomainMeta = {
  id: DomainId;
  name: string;
  path: string;
  tagline: string;
  summary: string;
  suited: string;
  notSuited: string;
  source: string;
  lines: LineDef[];
  tasks: { label: string; href: string; desc: string }[];
};

export const domainMeta: DomainMeta[] = [
  {
    id: 'ai',
    name: 'AI',
    path: '/ai',
    tagline: '对客场景下的 AI 工作方式',
    summary: '从任务判断、人机协同工作台、Agent 接入到输出核验，把 AI 用成可交付能力，而不是工具课目录。',
    suited: 'FDE / CSM / 知识工作者与需要统一团队 AI 用法的主管。',
    notSuited: '只想看模型排行榜、或把密钥与未授权材料直接喂给公开模型的场景。',
    source: '飞书 AI 知识库 + OKKI WIKI AI智能体',
    lines: [
      {
        id: 'ai-basics',
        title: '对客 AI 使用总方案',
        desc: '任务判断、执行流程与对客闸门',
        slugs: ['ai-basics-one-page'],
      },
      {
        id: 'ai-workbench',
        title: '人机协同工作台',
        desc: 'LLM Wiki、WorkBuddy、Obsidian、协作入口',
        slugs: ['llm-wiki-workbench', 'agent-in-collab-entry'],
      },
      {
        id: 'ai-routing',
        title: '任务分流与 Agent 选型',
        desc: '按任务选择工作方式，不按模型排名',
        slugs: ['task-based-ai-selection'],
      },
      {
        id: 'ai-verify',
        title: '输出核验与风险边界',
        desc: '任务前/中/后三段核验清单',
        slugs: ['ai-verification-checklist'],
      },
    ],
    tasks: [
      { label: '学结构', href: '/library?domain=ai&type=guide', desc: '先看判断框架' },
      { label: '搭工作台', href: '/practice/llm-wiki-workbench', desc: 'LLM Wiki 编译模式' },
      { label: '核验输出', href: '/practice/ai-verification-checklist', desc: '对客前过清单' },
    ],
  },
  {
    id: 'fde',
    name: 'FDE',
    path: '/fde',
    tagline: '一体化服务与经营增长方法',
    summary: '用生意链路与经营公式识别客户问题，用 SHOP / AIReach / CRM / AWB 承接执行，用保障与平台化形成复利。',
    suited: 'FDE、CSM、顾问与对客交付负责人。',
    notSuited: '国际站平台细则（见国际站域）；人事绩效与未授权客户材料。',
    source: '飞书 FDE 知识库 + 团队 FDE-KB',
    lines: [
      {
        id: 'fde-system',
        title: '服务体系总纲',
        desc: '生意链路 → 经营公式 → 产品 → AWB → 保障 → 平台化',
        slugs: ['service-system-map'],
      },
      {
        id: 'fde-product',
        title: '产品矩阵',
        desc: 'SHOP · AIReach · CRM Lite/Smart/Pro · OMS · ERP API',
        slugs: ['product-capability-matrix'],
      },
      {
        id: 'fde-awb',
        title: 'AWB 经营大脑',
        desc: '7 大 Skill 群与 Agent 编排',
        slugs: ['skill-routing'],
      },
      {
        id: 'fde-leads',
        title: '更多有效线索',
        desc: 'SHOP 承接 + AIReach 主动开发 + 线索入库',
        slugs: ['more-effective-leads', 'active-outreach-loop', 'lead-to-customer'],
      },
      {
        id: 'fde-conversion',
        title: '更高转化率',
        desc: '资产阵地 · 新客转化 · 沉睡盘活 · 合作复购',
        slugs: ['higher-conversion', 'crm-asset-base', 'new-customer-conversion', 'sleeping-reactivation', 'partner-repurchase'],
      },
      {
        id: 'fde-guard',
        title: '保障体系',
        desc: '陪跑计划与执行卡点诊断',
        slugs: ['customer-rollout-plan', 'customer-execution-diagnosis'],
      },
      {
        id: 'fde-qbr',
        title: '客户成功方法',
        desc: 'QBR / 阶段复盘结构',
        slugs: ['qbr-stage-review'],
      },
      {
        id: 'fde-platform',
        title: '平台化能力建设',
        desc: '流程 / Skill / 资产 / 复利反哺',
        slugs: ['platform-capability'],
      },
    ],
    tasks: [
      { label: '看总图', href: '/practice/service-system-map', desc: '服务体系怎么串' },
      { label: '判卡点', href: '/practice/customer-execution-diagnosis', desc: '执行不动四类原因' },
      { label: '做陪跑', href: '/practice/customer-rollout-plan', desc: '诊断变计划' },
    ],
  },
  {
    id: 'trade_ops',
    name: '外贸业务',
    path: '/trade-ops',
    tagline: '开发、报价、谈判与履约链路',
    summary: '聚焦外贸成交与履约本身：开发、画像、报价谈判、跟进与出货交接。',
    suited: '外贸业务员、销售主管与需要标准业务链路的团队。',
    notSuited: '平台后台细则、独立站 SEO 技术细节。',
    source: 'OKKI WIKI 外贸业务',
    lines: [
      {
        id: 'trade-process',
        title: '流程全景',
        desc: '从开发到出货的阶段地图与检查表',
        slugs: ['export-process-map'],
      },
      {
        id: 'trade-dev',
        title: '客户开发',
        desc: '渠道、背调与触达节奏',
        slugs: ['customer-development-playbook'],
      },
      {
        id: 'trade-quote',
        title: '报价与谈判',
        desc: '准备、报价、让步、涨价与代理边界',
        slugs: ['quotation-negotiation-checklist'],
      },
    ],
    tasks: [
      { label: '看流程', href: '/practice/export-process-map', desc: '业务全景' },
      { label: '做开发', href: '/practice/customer-development-playbook', desc: '开发与跟进' },
      { label: '拿清单', href: '/practice/quotation-negotiation-checklist', desc: '报价谈判检查' },
    ],
  },
  {
    id: 'global_platform',
    name: '国际站',
    path: '/global-platform',
    tagline: 'B2B 平台获客与运营',
    summary: '会员、星等级、内容发品、商机响应与付费推广五层运营结构。',
    suited: '国际站运营、外贸增长负责人与平台成交团队。',
    notSuited: '自有站 SEO、FDE 内部服务制度原文。',
    source: 'OKKI WIKI B2B平台',
    lines: [
      {
        id: 'gp-ops',
        title: '运营与推广',
        desc: '账户基础、店铺质量、内容与广告组合',
        slugs: ['platform-ops-framework'],
      },
      {
        id: 'gp-inquiry',
        title: '商机与交易',
        desc: '询盘分级、背调、分层与 RFQ 响应',
        slugs: ['inquiry-rfq-playbook'],
      },
    ],
    tasks: [
      { label: '学运营', href: '/practice/platform-ops-framework', desc: '五层结构' },
      { label: '做商机', href: '/practice/inquiry-rfq-playbook', desc: '询盘与 RFQ' },
      { label: '看实践库', href: '/library?domain=global_platform', desc: '本域全部' },
    ],
  },
  {
    id: 'indie_site',
    name: '独立站',
    path: '/indie-site',
    tagline: '自有站增长：SEO / Ads / 转化',
    summary: '增长闭环、SEO 诊断、落地页优化与询盘转化判断，服务 SHOP / 独立站交付。',
    suited: '独立站运营、外贸营销、FDE/CSM 诊断与网站负责人。',
    notSuited: '国际站会员规则、纯 CRM 配置手册。',
    source: 'OKKI WIKI 独立站 + FDE 线索侧',
    lines: [
      {
        id: 'indie-growth',
        title: '增长总图',
        desc: '被看见 → 被理解 → 被信任 → 被询盘 → 被复盘',
        slugs: ['growth-loop'],
      },
      {
        id: 'indie-seo',
        title: 'SEO 诊断',
        desc: '30 分钟红线优先诊断',
        slugs: ['seo-basic-diagnosis'],
      },
      {
        id: 'indie-landing',
        title: '落地页与转化',
        desc: '六段式落地页结构',
        slugs: ['b2b-landing-page'],
      },
      {
        id: 'indie-inquiry',
        title: '询盘转化诊断',
        desc: '有效流量 × 页面五要素',
        slugs: ['inquiry-conversion-diagnosis'],
      },
    ],
    tasks: [
      { label: '看增长', href: '/practice/growth-loop', desc: '闭环总图' },
      { label: '做诊断', href: '/practice/inquiry-conversion-diagnosis', desc: '没询盘先拆什么' },
      { label: '改落地页', href: '/practice/b2b-landing-page', desc: '六段式结构' },
    ],
  },
];

export function getDomainMeta(id: string): DomainMeta | undefined {
  return domainMeta.find((item) => item.id === id);
}

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);

export const isContentPreview = import.meta.env.PUBLIC_CONTENT_PREVIEW === 'true';

export function visibleEntries<T extends { data: { publication_status?: string; visibility: string } }>(entries: T[]) {
  if (isContentPreview) return entries;
  return entries.filter((entry) => entry.data.publication_status === 'approved' && entry.data.visibility === 'public');
}

export function entriesByDomain<T extends { data: { domain: string } }>(entries: T[], domain: DomainId) {
  return entries.filter((entry) => entry.data.domain === domain);
}

export function entryBySlug<T extends { data: { slug: string } }>(entries: T[], slug: string) {
  return entries.find((entry) => entry.data.slug === slug);
}

export function lineEntries<T extends { data: { slug: string } }>(entries: T[], line: LineDef) {
  return line.slugs
    .map((slug) => entryBySlug(entries, slug))
    .filter((item): item is T => Boolean(item));
}
