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

export const taskNames = {
  learn: '学习',
  diagnose: '诊断',
  execute: '执行',
  review: '复盘',
  reuse: '复用',
} as const;

export const tasks = ['learn', 'diagnose', 'execute', 'review', 'reuse'] as const;

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

/** 领域页货架分组：标题 + 卡片，避免文章平铺混乱 */
export type ShelfGroup = {
  id: string;
  title: string;
  desc: string;
  slugs: string[];
};

export type DomainMeta = {
  id: DomainId;
  name: string;
  path: string;
  /** 首页大卡一句话 */
  cardLabel: string;
  tagline: string;
  summary: string;
  suited: string;
  notSuited: string;
  source: string;
  /** 首页该板块热门 1 篇 */
  hotSlug: string;
  /** 领域页推荐阅读路径 */
  readingPath: string;
  shelves: ShelfGroup[];
};

export const domainMeta: DomainMeta[] = [
  {
    id: 'ai',
    name: 'AI',
    path: '/ai',
    cardLabel: '对客 AI 工作方式',
    tagline: '对客场景下的 AI 工作方式',
    summary: '任务判断、人机协同工作台、Agent 选型与输出核验。',
    suited: 'FDE / CSM / 知识工作者与需要统一团队 AI 用法的主管。',
    notSuited: '只想看模型排行榜，或把密钥与未授权材料直接喂给公开模型。',
    source: '飞书 AI 知识库 + OKKI WIKI',
    hotSlug: 'ai-basics-one-page',
    readingPath: '基础用法 → 工作台 → 任务分流 → 核验',
    shelves: [
      {
        id: 'ai-basics',
        title: '基础用法',
        desc: '先会判断再动手',
        slugs: ['ai-basics-one-page'],
      },
      {
        id: 'ai-workbench',
        title: '工作台',
        desc: '把知识编译成可复用资产',
        slugs: ['llm-wiki-workbench', 'agent-in-collab-entry'],
      },
      {
        id: 'ai-routing',
        title: '任务分流',
        desc: '不按模型排名选方式',
        slugs: ['task-based-ai-selection'],
      },
      {
        id: 'ai-verify',
        title: '输出核验',
        desc: '对客前过闸门',
        slugs: ['ai-verification-checklist'],
      },
    ],
  },
  {
    id: 'fde',
    name: 'FDE',
    path: '/fde',
    cardLabel: '经营增长与交付',
    tagline: '一体化服务与经营增长方法',
    summary: '经营公式 + SHOP / AIReach / CRM / AWB，从线索到转化再到保障与沉淀。',
    suited: 'FDE、CSM、顾问与对客交付负责人。',
    notSuited: '国际站平台细则（见国际站）；人事绩效材料。',
    source: '飞书 FDE 知识库',
    hotSlug: 'service-system-map',
    readingPath: '总图与能力 → 获客线索 / 转化经营 → 交付与沉淀',
    shelves: [
      {
        id: 'fde-map',
        title: '总图与能力',
        desc: '先看懂再匹配产品与 AI',
        slugs: ['service-system-map', 'product-capability-matrix', 'skill-routing'],
      },
      {
        id: 'fde-leads',
        title: '获客线索',
        desc: 'SHOP 承接 · AIReach 开发 · 线索入库',
        slugs: ['more-effective-leads', 'active-outreach-loop', 'lead-to-customer'],
      },
      {
        id: 'fde-conversion',
        title: '转化经营',
        desc: '资产阵地 · 新客 · 沉睡 · 复购',
        slugs: [
          'higher-conversion',
          'crm-asset-base',
          'new-customer-conversion',
          'sleeping-reactivation',
          'partner-repurchase',
        ],
      },
      {
        id: 'fde-delivery',
        title: '交付与沉淀',
        desc: '陪跑 · 执行保障 · QBR · 平台化',
        slugs: [
          'customer-rollout-plan',
          'customer-execution-diagnosis',
          'qbr-stage-review',
          'platform-capability',
        ],
      },
    ],
  },
  {
    id: 'trade_ops',
    name: '外贸业务',
    path: '/trade-ops',
    cardLabel: '开发报价履约',
    tagline: '开发、报价、谈判与履约链路',
    summary: '业务全景、开发跟进、样品、客诉、供应商与付款风险。',
    suited: '外贸业务员、销售主管。',
    notSuited: '平台后台细则、独立站 SEO 细节。',
    source: 'OKKI WIKI 外贸业务',
    hotSlug: 'export-process-map',
    readingPath: '流程 → 开发/跟进 → 样品 → 报价 → 风险/客诉 → 展会',
    shelves: [
      {
        id: 'trade-process',
        title: '流程全景',
        desc: '从开发到出货的阶段地图',
        slugs: ['export-process-map'],
      },
      {
        id: 'trade-dev',
        title: '客户开发',
        desc: '渠道、背调与触达节奏',
        slugs: ['customer-development-playbook'],
      },
      {
        id: 'trade-follow',
        title: '跟进与维护',
        desc: '价值输出、节奏与客户分级',
        slugs: ['follow-up-maintenance-playbook'],
      },
      {
        id: 'trade-sample',
        title: '样品流程',
        desc: '寄前、在途、测试与转单',
        slugs: ['sample-process-checklist'],
      },
      {
        id: 'trade-quote',
        title: '报价与谈判',
        desc: '准备、让步、涨价与代理边界',
        slugs: ['quotation-negotiation-checklist'],
      },
      {
        id: 'trade-risk',
        title: '付款与履约风险',
        desc: '收款、供应商、客诉危机',
        slugs: [
          'payment-risk-checklist',
          'supplier-cooperation-checklist',
          'complaint-crisis-playbook',
        ],
      },
      {
        id: 'trade-exhibition',
        title: '展会执行',
        desc: '展前邀约 · 现场记录 · 48 小时跟进',
        slugs: ['exhibition-playbook'],
      },
    ],
  },
  {
    id: 'global_platform',
    name: '国际站',
    path: '/global-platform',
    cardLabel: '平台运营商机',
    tagline: 'B2B 平台获客与运营',
    summary: '运营框架、发品、商机分层、RFQ 模板、推广诊断与合规。',
    suited: '国际站运营与外贸增长负责人。',
    notSuited: '自有站 SEO、FDE 内部制度原文。',
    source: 'OKKI WIKI B2B平台',
    hotSlug: 'platform-ops-framework',
    readingPath: '运营框架 → 发品 → 商机/分层 → RFQ → 推广 → 合规',
    shelves: [
      {
        id: 'gp-ops',
        title: '运营框架',
        desc: '账户 · 店铺 · 内容 · 推广',
        slugs: ['platform-ops-framework'],
      },
      {
        id: 'gp-content',
        title: '发品内容',
        desc: '标题 · 主图 · 商详 · 关键词',
        slugs: ['listing-content-checklist'],
      },
      {
        id: 'gp-inquiry',
        title: '商机交易',
        desc: '询盘分级 · 背调 · 买家分层 · RFQ 模板',
        slugs: [
          'inquiry-rfq-playbook',
          'buyer-tier-playbook',
          'rfq-response-template',
        ],
      },
      {
        id: 'gp-ads',
        title: '推广诊断',
        desc: '预算无效时的五层排查',
        slugs: ['ads-diagnosis-checklist'],
      },
      {
        id: 'gp-compliance',
        title: '合规基础',
        desc: '禁限售 · 目标市场 · 上架前检查',
        slugs: ['compliance-basics'],
      },
    ],
  },
  {
    id: 'indie_site',
    name: '独立站',
    path: '/indie-site',
    cardLabel: '增长 SEO 转化',
    tagline: '自有站增长：SEO / Ads / 转化',
    summary: '增长闭环、诊断与落地页优化。',
    suited: '独立站运营、外贸营销、FDE/CSM。',
    notSuited: '国际站会员规则、纯 CRM 手册。',
    source: 'OKKI WIKI 独立站',
    hotSlug: 'inquiry-conversion-diagnosis',
    readingPath: '增长总图 → 诊断 → 落地页',
    shelves: [
      {
        id: 'indie-growth',
        title: '增长总图',
        desc: '被看见到被复盘',
        slugs: ['growth-loop'],
      },
      {
        id: 'indie-diag',
        title: '诊断',
        desc: 'SEO 与询盘转化判断',
        slugs: ['seo-basic-diagnosis', 'inquiry-conversion-diagnosis'],
      },
      {
        id: 'indie-landing',
        title: '转化落地',
        desc: '落地页六段式结构',
        slugs: ['b2b-landing-page'],
      },
    ],
  },
];

/** @deprecated use shelves — kept alias for any leftover imports */
export type LineDef = ShelfGroup;

export function getDomainMeta(id: string): DomainMeta | undefined {
  return domainMeta.find((item) => item.id === id);
}

export function findShelfForSlug(slug: string): { domain: DomainMeta; shelf: ShelfGroup } | undefined {
  for (const domain of domainMeta) {
    for (const shelf of domain.shelves) {
      if (shelf.slugs.includes(slug)) return { domain, shelf };
    }
  }
  return undefined;
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

export function shelfEntries<T extends { data: { slug: string } }>(entries: T[], shelf: ShelfGroup) {
  return shelf.slugs
    .map((slug) => entryBySlug(entries, slug))
    .filter((item): item is T => Boolean(item));
}

/** @deprecated */
export const lineEntries = shelfEntries;
