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

export type DomainMeta = {
  id: DomainId;
  name: string;
  path: string;
  tagline: string;
  summary: string;
  suited: string;
  notSuited: string;
  lines: { title: string; desc: string }[];
  tasks: { label: string; href: string; desc: string }[];
};

export const domainMeta: DomainMeta[] = [
  {
    id: 'ai',
    name: 'AI',
    path: '/ai',
    tagline: '对客场景下的 AI 工作方式',
    summary: '先建立可复制的对客 AI 工作系统，再落到工作台、场景 Playbook 与核验边界。不是工具课目录站。',
    suited: '需要在客户现场交付判断、材料或方案，并希望用 AI 提效的人。',
    notSuited: '只想找模型排行榜，或需要处理未授权客户隐私与密钥的场景。',
    lines: [
      { title: '对客 AI 使用总方案', desc: '建立可复制的任务判断与执行方式' },
      { title: '人机协同工作台', desc: 'Codex / Claude Code / Obsidian / WorkBuddy 如何组合产出' },
      { title: '对客场景 Playbook', desc: '询盘、诊断、独立站、开发等真实任务怎么用 AI' },
      { title: '任务分流与 Agent 选型', desc: '何时直聊、何时 Agent、何时必须人工' },
      { title: '输出核验与风险边界', desc: '对客材料如何可核验、可追责' },
      { title: '环境与接入基线', desc: '开始前的最小合规准备（次级）' },
    ],
    tasks: [
      { label: '学结构', href: '/library?domain=ai&type=guide', desc: '先看判断框架' },
      { label: '做诊断', href: '/library?domain=ai&type=playbook', desc: '按场景执行' },
      { label: '拿清单', href: '/library?domain=ai&type=checklist', desc: '复用核验项' },
    ],
  },
  {
    id: 'fde',
    name: 'FDE',
    path: '/fde',
    tagline: '一体化服务与经营增长方法',
    summary: '用经营公式识别客户问题，用保障体系推动执行，用复盘与平台化沉淀复利。对外保留 FDE 名称。',
    suited: 'FDE、CSM、顾问和对客交付负责人。',
    notSuited: '国际站平台细则（见国际站）、人事绩效与内部编制材料。',
    lines: [
      { title: '服务体系总纲', desc: '生意链路、公式、能力与服务如何串起来' },
      { title: '经营公式', desc: '线索、转化、客单、毛利四象限判断' },
      { title: '产品与能力矩阵', desc: '客户问题匹配到哪类能力' },
      { title: '经营判断与 Skill 调度', desc: '按经营问题选方法组合' },
      { title: '保障体系', desc: '诊断后如何推动客户真正执行' },
      { title: '客户成功方法', desc: '阶段复盘、QBR 与对客沟通结构' },
      { title: '平台化能力建设', desc: '单次服务如何沉淀为可复用资产' },
    ],
    tasks: [
      { label: '判断卡点', href: '/library?domain=fde&type=playbook', desc: '执行与转化诊断' },
      { label: '推动落地', href: '/library?domain=fde&type=template', desc: '陪跑与计划模板' },
      { label: '阶段复盘', href: '/library?domain=fde&type=guide', desc: 'QBR 与结构' },
    ],
  },
  {
    id: 'trade_ops',
    name: '外贸业务',
    path: '/trade-ops',
    tagline: '开发、报价、谈判与履约链路',
    summary: '聚焦外贸成交与履约本身：开发、画像、报价谈判、跟进、风险与展会。',
    suited: '外贸业务员、销售主管和需要标准业务链路的团队。',
    notSuited: '平台后台细则、独立站 SEO 技术细节。',
    lines: [
      { title: '流程全景', desc: '端到端 SOP 地图' },
      { title: '客户开发', desc: '触达、画像与渠道' },
      { title: '报价与谈判', desc: '报价、让步与涨价沟通' },
      { title: '跟进与维护', desc: '节奏、分级与价值输出' },
      { title: '风险与客诉', desc: '付款、履约与危机处理' },
      { title: '展会与线下', desc: '展前展中展后动作' },
    ],
    tasks: [
      { label: '看流程', href: '/library?domain=trade_ops&type=guide', desc: '业务全景' },
      { label: '做开发', href: '/library?domain=trade_ops&type=playbook', desc: '开发与跟进' },
      { label: '拿清单', href: '/library?domain=trade_ops&type=checklist', desc: '报价谈判检查' },
    ],
  },
  {
    id: 'global_platform',
    name: '国际站',
    path: '/global-platform',
    tagline: 'B2B 平台获客与运营',
    summary: '在 B2B 平台上完成运营推广、商机交易、合规与日常运营闭环。与 FDE、独立站分开。',
    suited: '国际站运营、外贸增长负责人和平台成交团队。',
    notSuited: '自有站 SEO、纯线下展会 SOP、FDE 内部服务制度原文。',
    lines: [
      { title: '运营与推广', desc: '店铺、会员与推广结构' },
      { title: '商机与交易', desc: '询盘、RFQ 与买家分层' },
      { title: '合规', desc: '禁限售与目标市场规则' },
      { title: '数据与日操', desc: '指标、同步与日常规范' },
      { title: '成交闭环', desc: '曝光到询盘再到跟进' },
    ],
    tasks: [
      { label: '学运营', href: '/library?domain=global_platform&type=guide', desc: '平台结构' },
      { label: '做商机', href: '/library?domain=global_platform&type=playbook', desc: '询盘与交易' },
      { label: '查合规', href: '/library?domain=global_platform&type=checklist', desc: '禁限售检查' },
    ],
  },
  {
    id: 'indie_site',
    name: '独立站',
    path: '/indie-site',
    tagline: '自有站增长：SEO / Ads / 转化',
    summary: '让目标买家找到网站、看懂产品、完成询盘。覆盖增长总图、SEO、Ads、落地页与数据追踪。',
    suited: '独立站运营、外贸营销、交付诊断与网站负责人。',
    notSuited: '国际站会员规则、纯 CRM 配置手册。',
    lines: [
      { title: '增长总图', desc: '搜索、广告、内容、信任与询盘' },
      { title: 'SEO', desc: '收录、技术、内容与 Entity' },
      { title: '付费获客', desc: 'Ads 账户健康与 B2B 出价' },
      { title: '落地页与转化', desc: '首屏、信任、表单与移动端' },
      { title: '数据追踪', desc: 'GSC、GA4、UTM 与 MQL' },
      { title: '建站运维基线', desc: '域名、HTTPS、安全与交付基线' },
    ],
    tasks: [
      { label: '看增长', href: '/library?domain=indie_site&type=guide', desc: '总图与概念' },
      { label: '做诊断', href: '/library?domain=indie_site&type=playbook', desc: 'SEO / 落地页' },
      { label: '配追踪', href: '/library?domain=indie_site&type=template', desc: '数据闭环' },
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
