export default {
  header: {
    eyebrow: 'Experiência técnica',
    title: 'Implementações Odoo e sistemas de gestão',
    intro:
      'Trabalho como desenvolvedor e implementador para diversos clientes através de uma consultoria de TI. Por confidencialidade, nenhum cliente é nomeado e nenhum dado operacional real é exposto — o que segue é o raciocínio técnico por trás de cada projeto.',
  },
  toolGroups: [
    {
      group: 'Análise e ETL',
      tools: ['Python', 'Jupyter Notebook', 'pandas', 'SQL / PostgreSQL'],
    },
    {
      group: 'ERP e backend',
      tools: ['Odoo ORM', 'Django', 'APIs REST'],
    },
    {
      group: 'Controle de versão',
      tools: ['Git', 'Git flow'],
    },
  ],
  cases: [
    {
      label: 'Integridade de dados',
      title: 'Migração em larga escala com controle de risco',
      summary:
        'Design e implementação de um pipeline de carga em massa de relações produto↔produto a partir de uma planilha Excel para um ERP, para um cliente de varejo com catálogo de várias centenas de SKUs.',
      points: [
        'Análise e validação da origem em Jupyter Notebook antes de tocar no ERP: exploração, limpeza e classificação de casos com pandas — um fluxo de análise de dados, não um script de execução única.',
        'Especificação formal antes de escrever código: regras de bloqueio explícitas, nenhum combo é carregado parcialmente se uma única linha tiver conflito.',
        'Reconciliação em modo somente leitura contra o catálogo real, com relatório de conflitos para validação humana antes de qualquer escrita.',
        'Dry-run com rollback transacional para verificar o comportamento exato do ORM antes de tocar em dados reais.',
        'Um identificador normalizado automaticamente pelo processo quase gerou um código de catálogo incorreto — interrompido, rastreada a origem, e fixada a regra: o identificador original do cliente é a fonte da verdade, nunca uma variante gerada.',
      ],
      skills: ['Python', 'Jupyter Notebook', 'pandas', 'Odoo ORM', 'ETL com controle de qualidade'],
    },
    {
      label: 'Dados legados',
      title: 'Auditoria e migração de dados mestres de sistema legado',
      summary:
        'Levantamento e migração dos dados mestres de Produtos e Clientes de um cliente para um novo ERP, partindo de exportações Excel e um banco de dados histórico sem documentação.',
      points: [
        'Todo o levantamento foi feito em notebooks: cruzamento de fontes, contagem de cobertura, detecção de duplicados e classificação de exceções, com cada etapa documentada e reproduzível.',
        'Correspondência automatizada entre o mestre histórico e o catálogo real, classificada por nível de cobertura, com detecção de duplicados.',
        'Design de um dataset canônico com dicionário de rastreabilidade: de qual arquivo e campo de origem cada dado veio, e qual transformação foi aplicada.',
        'Migração por diferenças em vez de reimportação completa, para não corromper dados já carregados.',
        'Arquivamento em vez de exclusão física ao preparar o ambiente de testes, após detectar referências cruzadas que tornavam a exclusão arriscada.',
      ],
      skills: ['Python', 'Jupyter Notebook', 'pandas', 'SQL', 'Reconciliação de dados'],
    },
    {
      label: 'Sistemas',
      title: 'Gestão de pedidos com integração a ERP externo',
      summary:
        'Desenvolvimento e manutenção de um sistema de gestão de pedidos em Django, integrado via API com um ERP externo, para um cliente com múltiplos canais de venda.',
      points: [
        'Sincronização de catálogo, preços e estoque com limitação de taxa e novas tentativas configuráveis diante dos limites da API externa.',
        'Máquina de estados para o ciclo de vida do pedido, bloqueando edições após confirmação no sistema externo.',
        'Geração dinâmica de documentos PDF (orçamentos, notas de entrega) com a identidade visual do cliente.',
        'Critério explícito para decidir quando uma mudança precisa de especificação formal (toca dados ou cálculos compartilhados) e quando não (cosmética, isolada).',
      ],
      skills: ['Django', 'Integração de APIs REST', 'Máquinas de estado', 'ReportLab'],
    },
    {
      label: 'Operação',
      title: 'Saneamento de repositório após um projeto intenso',
      summary:
        'Após estabilizar uma carga em massa em produção, alinhamento do ambiente de testes com a branch principal e limpeza de branches auxiliares acumuladas.',
      points: [
        'Verificação prévia de commits não mesclados antes de alinhar por fast-forward, evitando perda de histórico.',
        'Classificação de branches em três grupos — absorvidas, com histórico útil não mesclado, alheias — com checklist de encerramento por branch.',
        'Resgate de documentação útil fora do repositório antes de excluir qualquer branch com histórico não mesclado.',
      ],
      skills: ['Git avançado', 'Higiene de repositório'],
    },
  ],
};
