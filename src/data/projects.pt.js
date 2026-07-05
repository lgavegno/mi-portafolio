// TODO(leo): revisar traducción PT — generado por IA, no validado
// src/data/projects.pt.js
// Dados de projetos em destaque para o portfólio (Português)
import fitnessImg from '../assets/fig_clusters_ai.webp';
import omnistock1Img from '../assets/omnistock1.webp';
import faroart1Img from '../assets/faroart1.webp';
import generador1Img from '../assets/generador1.webp';

export const featuredProjects = [
  {
    id: 'fitness-retention-analysis',
    title: 'Análise de Retenção & ML - FitNess App',
    description: 'Refatoração técnica e modelagem de dados para reduzir o Churn de 65% para 45%. Auditoria de integridade sobre 1.168 registros e segmentação de perfis de risco com Clustering K-Means.',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'Power BI'],
    progress: 100,
    progressLabel: 'Finalizado: relatório de insights entregue',
    status: 'completed',
    image: fitnessImg,
    link: 'https://github.com/lgavegno/proyecto-fitNess-retencion',
    featured: true,
    category: 'ai-ml',
    highlights: ['Integridade de Dados', 'Clustering K-Means', 'Métricas DAU/MAU'],
    longDescription: 'O projeto consistiu em uma análise profunda de uma base de dados com 11.600 registros e uma taxa inicial de churn de 65%. Após detectar inconsistências massivas (89% de ruído), foi realizado um processo ETL para consolidar um dataset confiável de 1.168 usuários. Foi aplicado aprendizado não supervisionado para segmentar usuários e prever abandono precoce.',
    methodology: ['Auditoria de Integridade Referencial', 'ETL & Saneamento de Dados', 'Modelagem K-Means Clustering', 'Análise de Sticky Factor (DAU/MAU)'],
    results: ['Redução projetada de Churn para 45%', 'Identificação de HIIT/Força como drivers de retenção', 'Detecção de falha de ativação no Dia 0'],
    notionLink: 'https://wind-texture-7af.notion.site/FitNess-App-Estrategia-de-Retenci-n-basada-en-Datos-Machine-Learning-2fea3541aceb80598ae3d60e469ca31b'
  },
  {
    id: 'omnistock',
    title: 'OmniStock — Sistema de Estoque Desktop',
    description: 'Aplicação desktop para controle de estoque, orçamentos, fornecedores, receitas e auditoria interna. Arquitetura offline-first com banco de dados local SQLite.',
    stack: ['Tauri', 'React', 'Rust', 'SQLite', 'TypeScript'],
    progress: 70,
    progressLabel: 'Em desenvolvimento ativo — v2.0 alpha',
    status: 'in-progress',
    image: omnistock1Img,
    link: null,
    featured: true,
    category: 'fullstack',
    highlights: ['App nativa cross-platform', 'Offline-first com SQLite', 'Software comercial com licenciamento HWID'],
    longDescription: 'Sistema de estoque e gestão comercial para PMEs desenvolvido com Tauri. Permite controle de estoque, ponto de venda, orçamentos, gestão de fornecedores, receitas BOM e auditoria interna. Funciona 100% offline com banco de dados SQLite local. Produto comercial em desenvolvimento ativo sob metodologia SDD.',
    methodology: ['Spec-Driven Development (SDD)', 'Arquitetura modular por blocos lógicos', 'Testes unitários em Rust', 'Licenciamento por HWID'],
    results: ['App nativa para Windows, macOS e Linux', 'Módulos: POS, Estoque, Orçamentos, Fornecedores, Receitas & BOM', 'Produto pronto para comercialização no MercadoLibre'],
    notionLink: null
  },
  {
    id: 'faro-art-shop',
    title: 'Faro Art Shop — Loja Online',
    description: 'Loja e-commerce de kits de String Art. Setup completo na Tienda Nube com domínio próprio, CSS personalizado e otimização de conversão.',
    stack: ['Tienda Nube', 'CSS3', 'Hostinger DNS', 'MercadoPago'],
    progress: 100,
    progressLabel: 'Finalizado: loja em produção com vendas ativas',
    status: 'completed',
    image: faroart1Img,
    link: 'https://faroartshop.com',
    linkLabel: 'Ver loja online',
    featured: true,
    category: 'frontend',
    highlights: ['Loja em produção com vendas ativas', 'Domínio próprio configurado', 'CSS personalizado sobre Tienda Nube'],
    longDescription: 'Design, configuração e lançamento de loja online na Tienda Nube para venda de kits artesanais de String Art. Inclui customização completa do tema via editor CSS avançado, configuração DNS com Hostinger para domínio próprio, otimização de páginas de produto e configuração do MercadoPago como gateway de pagamento.',
    methodology: ['Setup completo na Tienda Nube', 'Customização CSS avançada', 'Configuração DNS e domínio próprio', 'Otimização de conversão'],
    results: ['Loja operando em faroartshop.com', 'Integração MercadoPago funcionando', 'Domínio próprio com SSL ativo'],
    notionLink: null
  },
  {
    id: 'generador-presupuestos',
    title: 'Gerador de Orçamentos Web',
    description: 'Ferramenta para cotações de projetos web em tempo real. Backend serverless com Google Apps Script, armazenamento no Google Sheets e notificações por email.',
    stack: ['Vanilla JS', 'Google Apps Script', 'Google Sheets API', 'HTML5', 'CSS3'],
    progress: 100,
    progressLabel: 'Finalizado: em produção — v2.2.0',
    status: 'completed',
    image: generador1Img,
    link: 'https://lgavegno.github.io/generador-presupuestos/presupuestador/',
    featured: true,
    category: 'fullstack',
    highlights: ['Infraestrutura $0/mês — serverless', 'Fluxo automático para Google Sheets', 'Modo projeto sob medida com encaminhamento'],
    longDescription: 'Calculadora de orçamentos para serviços de desenvolvimento web. O cliente configura tipo de site, seções e funcionalidades premium — o sistema calcula o preço em tempo real, envia os dados ao Google Apps Script e notifica o proprietário por email. Inclui modo especial para projetos sob medida que encaminha automaticamente para entrevista técnica.',
    methodology: ['Spec-Driven Development (SDD)', 'Arquitetura serverless sem backend próprio', 'Google Apps Script como webhook', 'Google Sheets como banco de dados'],
    results: ['Infraestrutura a $0/mês usando serviços gratuitos do Google', 'Notificações automáticas por email ao proprietário', 'Documentação técnica completa em /docs do repositório'],
    notionLink: null
  },
  {
    id: 'form-invent',
    title: 'form-invent — Sistema de Estoque Excel',
    description: 'Sistema de estoque comercial em Excel com VBA. Controle de entradas, saídas, estoque em tempo real e dashboard com filtros por mês. Produto à venda no MercadoLibre.',
    stack: ['Excel', 'VBA', 'Macros', 'Dashboard'],
    progress: 100,
    progressLabel: 'Finalizado: disponível no MercadoLibre',
    status: 'completed',
    image: null,
    link: null,
    featured: true,
    category: 'tools',
    highlights: ['Sistema completo com macros VBA', 'Dashboard com filtros dinâmicos por mês', 'Produto comercial no MercadoLibre'],
    longDescription: 'Sistema de estoque desenvolvido em Excel com macros VBA para PMEs que não precisam de software especializado. Inclui módulos de entradas e saídas de estoque, validações automáticas, dashboard com filtros dinâmicos por mês e bloqueio de produtos inativos. Comercializado como produto digital no MercadoLibre.',
    methodology: ['Desenvolvimento em Excel + VBA puro', 'Arquitetura com tabelas estruturadas (tbl_Stock)', 'Fórmulas SOMASES para relatórios', 'Teste manual exaustivo'],
    results: ['Controle completo de estoque sem software adicional', 'Dashboard mensal com filtros dinâmicos', 'Produto pronto para venda no MercadoLibre'],
    notionLink: null
  }
];

export const allProjects = [
  ...featuredProjects
];

// Categorias de projetos
export const projectCategories = [
  { id: 'all', label: 'Todos', icon: '🎯' },
  { id: 'fullstack', label: 'Full Stack', icon: '🌐' },
  { id: 'frontend', label: 'Frontend', icon: '🎨' },
  { id: 'ai-ml', label: 'Data Science / ML', icon: '🤖' },
  { id: 'tools', label: 'Ferramentas', icon: '🔧' }
];

export default featuredProjects;
