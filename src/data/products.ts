export interface Product {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  categorySlug: string;
  image: string;
  featured: boolean;
  benefits: string[];
  includes: string[];
  targetAudience: string[];
  faq: { question: string; answer: string }[];
}

export const products: Product[] = [
  {
    id: "site-institucional-moderno",
    title: "Site Institucional Moderno",
    description: "Template profissional completo para empresas e negócios, pronto para personalizar.",
    longDescription: "Site institucional completo e responsivo, desenvolvido com as melhores práticas de UX/UI. Perfeito para empresas que buscam presença digital profissional e impactante.",
    price: 497,
    originalPrice: 697,
    category: "Sites",
    categorySlug: "sites",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop",
    featured: true,
    benefits: [
      "Design moderno e responsivo",
      "Otimizado para SEO",
      "Carregamento ultra-rápido",
      "Fácil personalização",
      "Suporte a múltiplas páginas"
    ],
    includes: [
      "5 páginas completas",
      "Formulário de contato",
      "Integração com redes sociais",
      "Documentação completa",
      "30 dias de suporte"
    ],
    targetAudience: [
      "Empresas de todos os portes",
      "Profissionais liberais",
      "Startups e negócios digitais",
      "Agências e consultorias"
    ],
    faq: [
      { question: "Posso personalizar as cores?", answer: "Sim! O template vem com sistema de design flexível para personalização completa." },
      { question: "Preciso saber programar?", answer: "Conhecimento básico em HTML/CSS ajuda, mas a documentação é completa." }
    ]
  },
  {
    id: "automacao-whatsapp-vendas",
    title: "Automação WhatsApp para Vendas",
    description: "Sistema completo de automação para atendimento e vendas via WhatsApp Business.",
    longDescription: "Automatize seu atendimento e aumente suas vendas com fluxos inteligentes de mensagens. Ideal para negócios que precisam escalar o atendimento ao cliente.",
    price: 897,
    originalPrice: 1297,
    category: "Automações",
    categorySlug: "automacoes",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&auto=format&fit=crop",
    featured: true,
    benefits: [
      "Atendimento 24/7 automatizado",
      "Aumento nas taxas de conversão",
      "Redução de tempo de resposta",
      "Qualificação automática de leads",
      "Relatórios de desempenho"
    ],
    includes: [
      "Fluxos de conversa prontos",
      "Integração com CRM",
      "Dashboard de métricas",
      "Tutorial em vídeo",
      "60 dias de suporte"
    ],
    targetAudience: [
      "E-commerces",
      "Prestadores de serviço",
      "Infoprodutores",
      "Clínicas e consultórios"
    ],
    faq: [
      { question: "Funciona com WhatsApp Business?", answer: "Sim, desenvolvido especialmente para a API do WhatsApp Business." },
      { question: "Preciso de servidor?", answer: "Fornecemos instruções para hospedagem em nuvem de baixo custo." }
    ]
  },
  {
    id: "tema-wordpress-corporate",
    title: "Tema WordPress Corporate",
    description: "Tema premium WordPress para sites corporativos com construtor visual.",
    longDescription: "Tema WordPress profissional e completo, compatível com Elementor e outros construtores visuais. Design corporate moderno e funcionalidades avançadas.",
    price: 297,
    originalPrice: 397,
    category: "WordPress",
    categorySlug: "wordpress",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop",
    featured: false,
    benefits: [
      "Compatível com Elementor",
      "WooCommerce ready",
      "SEO otimizado",
      "Atualizações gratuitas",
      "+50 seções pré-prontas"
    ],
    includes: [
      "Tema completo + child theme",
      "Demos importáveis",
      "Plugins premium inclusos",
      "Documentação detalhada",
      "Suporte por 90 dias"
    ],
    targetAudience: [
      "Agências digitais",
      "Freelancers",
      "Empresas B2B",
      "Desenvolvedores WordPress"
    ],
    faq: [
      { question: "É compatível com Gutenberg?", answer: "Sim, 100% compatível com Gutenberg e Elementor." },
      { question: "Posso usar em vários sites?", answer: "A licença é para um único site, mas oferecemos pacotes multi-site." }
    ]
  },
  {
    id: "planilha-gestao-financeira",
    title: "Planilha Gestão Financeira Empresarial",
    description: "Controle completo de finanças empresariais com dashboards automáticos.",
    longDescription: "Planilha profissional em Excel com controle completo de receitas, despesas, fluxo de caixa e projeções. Dashboards automáticos e relatórios gerenciais.",
    price: 197,
    originalPrice: 297,
    category: "Excel",
    categorySlug: "excel",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
    featured: true,
    benefits: [
      "Controle de receitas e despesas",
      "Fluxo de caixa automático",
      "Gráficos e dashboards",
      "Projeções financeiras",
      "Relatórios gerenciais"
    ],
    includes: [
      "Planilha completa em Excel",
      "12 meses de categorias",
      "Tutorial em vídeo",
      "Versão Google Sheets",
      "Atualizações gratuitas"
    ],
    targetAudience: [
      "Pequenas empresas",
      "MEIs e autônomos",
      "Gestores financeiros",
      "Empreendedores"
    ],
    faq: [
      { question: "Funciona no Google Sheets?", answer: "Sim, incluímos versão compatível com Google Sheets." },
      { question: "Precisa de macros?", answer: "Não, funciona sem macros para máxima compatibilidade." }
    ]
  },
  {
    id: "dashboard-vendas-powerbi",
    title: "Dashboard de Vendas Power BI",
    description: "Dashboard profissional para análise completa de vendas e performance.",
    longDescription: "Dashboard Power BI completo para análise de vendas, com KPIs, tendências, comparativos e insights automáticos. Pronto para conectar aos seus dados.",
    price: 397,
    originalPrice: 597,
    category: "Power BI",
    categorySlug: "powerbi",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    featured: false,
    benefits: [
      "Visão 360° das vendas",
      "KPIs em tempo real",
      "Análise de tendências",
      "Comparativos de período",
      "Filtros dinâmicos"
    ],
    includes: [
      "Arquivo .pbix completo",
      "Modelo de dados",
      "Documentação técnica",
      "Dados de exemplo",
      "Suporte para conexão"
    ],
    targetAudience: [
      "Gerentes comerciais",
      "Analistas de dados",
      "Diretores de vendas",
      "Equipes de BI"
    ],
    faq: [
      { question: "Precisa do Power BI Pro?", answer: "Funciona com Power BI Desktop gratuito. Pro é necessário só para compartilhar online." },
      { question: "Posso conectar ao meu ERP?", answer: "Sim, o modelo é flexível para conexão com diversas fontes de dados." }
    ]
  },
  {
    id: "sistema-crm-notion",
    title: "Sistema CRM Completo no Notion",
    description: "CRM profissional construído no Notion para gestão de clientes e vendas.",
    longDescription: "Sistema de CRM completo e intuitivo construído no Notion. Gerencie leads, clientes, pipeline de vendas e tarefas em um só lugar.",
    price: 147,
    category: "Outros",
    categorySlug: "outros",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop",
    featured: false,
    benefits: [
      "Pipeline visual de vendas",
      "Gestão de contatos",
      "Automações nativas",
      "Colaboração em equipe",
      "Acesso mobile"
    ],
    includes: [
      "Template Notion completo",
      "Tutorial de configuração",
      "Exemplos de uso",
      "Atualizações vitalícias",
      "Comunidade de usuários"
    ],
    targetAudience: [
      "Freelancers",
      "Pequenas equipes",
      "Consultores",
      "Coaches e mentores"
    ],
    faq: [
      { question: "Preciso de Notion pago?", answer: "Funciona na versão gratuita. Pago só se precisar de mais recursos." },
      { question: "Consigo importar meus contatos?", answer: "Sim, suporta importação via CSV." }
    ]
  }
];

export const categories = [
  { slug: "todos", label: "Todos" },
  { slug: "sites", label: "Sites" },
  { slug: "automacoes", label: "Automações" },
  { slug: "wordpress", label: "WordPress" },
  { slug: "excel", label: "Excel" },
  { slug: "powerbi", label: "Power BI" },
  { slug: "outros", label: "Outros" },
];
