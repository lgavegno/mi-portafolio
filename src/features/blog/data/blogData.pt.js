// TODO(leo): revisar traducción PT — generado por IA, no validado
// src/features/blog/data/blogData.pt.js
// Dados de posts do blog (Português)

export const blogPosts = [
  {
    id: 'google-sheets-backend-serverless',
    title: 'Como configurei o Google Sheets como backend serverless',
    excerpt: 'Sem servidor, sem banco de dados, sem custo mensal. Como construí um sistema de orçamentos com Google Apps Script, Sheets e Gmail que processa formulários em tempo real.',
    category: 'Development',
    readTime: 8,
    date: '2026-04-16',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    tags: ['Google Sheets', 'Apps Script', 'Serverless', 'Vanilla JS'],
    featured: true,
    slug: 'google-sheets-backend-serverless',
    content: `
<h2>O problema que eu queria resolver</h2>
<p>Eu precisava que clientes pudessem gerar orçamentos de projetos web em tempo real e que eu recebesse essa informação automaticamente — sem montar um servidor, sem pagar hospedagem de backend e sem manter um banco de dados.</p>
<p>A solução foi usar uma infraestrutura que já existe e é gratuita: <strong>Google Sheets como banco de dados, Google Apps Script como servidor e Gmail como sistema de notificações.</strong></p>

<h2>A arquitetura completa</h2>
<p>O fluxo tem quatro camadas que se comunicam entre si:</p>
<pre><code>Frontend (Vanilla JS)
    ↓ POST JSON
Google Apps Script (Webhook)
    ↓              ↓
Google Sheets    Gmail
(armazenamento) (notificação)</code></pre>
<p>O cliente preenche o formulário, o JavaScript do frontend calcula o preço em tempo real e, ao enviar, faz um <code>fetch()</code> POST para o webhook do Apps Script. O script valida os dados, salva no Sheets e me envia um email com os detalhes completos.</p>

<h2>Passo 1 — O frontend calcula, não o servidor</h2>
<p>A primeira decisão foi mover toda a lógica de preços para o cliente. Cada vez que o usuário seleciona um tipo de site ou funcionalidade, o JavaScript recalcula o total instantaneamente sem fazer chamadas ao servidor.</p>
<p>Isso tem duas vantagens: a experiência é imediata, sem latência, e o servidor recebe apenas o resultado final.</p>
<pre><code>function calculateQuote() {
  const base = PRICES[siteType] || 0;
  const extras = selectedSections * 50000;
  const features = selectedFeatures * 60000;
  return base + extras + features;
}</code></pre>

<h2>Passo 2 — Google Apps Script como webhook</h2>
<p>Apps Script permite publicar uma função como endpoint HTTP acessível publicamente. A função <code>doPost()</code> é o equivalente a uma rota <code>POST /api/cotizacion</code> em Express, mas sem servidor.</p>
<pre><code>function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  // Salvar no Sheets
  const sheet = SpreadsheetApp.openById(SHEET_ID)
    .getSheetByName('SUBMISSIONS');
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.site_type,
    data.quote.total
  ]);

  // Notificar por email
  MailApp.sendEmail({
    to: 'tu@email.com',
    subject: 'Nueva cotización — ' + data.name,
    body: formatEmail(data)
  });

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}</code></pre>

<h2>Passo 3 — O problema de CORS e como resolvê-lo</h2>
<p>Há uma armadilha que me custou tempo: Apps Script não lida corretamente com CORS quando usamos <code>fetch()</code> com <code>mode: 'cors'</code>. A solução foi usar <code>mode: 'no-cors'</code> no frontend.</p>
<p>O trade-off é que você não consegue ler a resposta do servidor, mas neste caso isso não importa: se o script falhar, o usuário vê um erro de rede genérico.</p>
<pre><code>await fetch(GOOGLE_SCRIPT_URL, {
  method: 'POST',
  mode: 'no-cors', // necessário para Apps Script
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});</code></pre>

<h2>Passo 4 — Google Sheets como banco de dados</h2>
<p>O Sheets tem quatro abas com funções específicas: <strong>SUBMISSIONS</strong> salva cada orçamento com timestamp e todos os campos, <strong>STATISTICS</strong> calcula métricas automaticamente, <strong>LOGS</strong> registra eventos para debugging e <strong>TEMPLATE</strong> define o formato do email.</p>
<p>A vantagem do Sheets sobre um banco real é poder ver, filtrar e exportar dados sem escrever uma query.</p>

<h2>O caso especial: projetos personalizados</h2>
<p>O formulário tem dois modos: o padrão com preços fixos e o modo "projeto personalizado", para sistemas complexos cujo preço exige uma entrevista técnica.</p>
<p>Quando o usuário ativa esse modo, seções e funcionalidades são desabilitadas, o total mostra "A cotizar" e o email chega com um assunto destacado para diferenciá-lo na caixa de entrada.</p>

<h2>Resultado e métricas</h2>
<p>O sistema está em produção há várias semanas sem incidentes. O custo de infraestrutura é <strong>$0/mês</strong>, rodando no tier gratuito do Google. O tempo de resposta do webhook fica entre 800ms e 2 segundos.</p>
<p>O aprendizado mais valioso foi entender que nem sempre é preciso uma arquitetura complexa. Às vezes, a solução mais simples e barata é a correta.</p>

<h2>Quando usar este enfoque e quando não usar</h2>
<p>Esse padrão funciona bem para formulários de contato, geradores de orçamento, registro de leads ou qualquer caso de baixo volume que não precise de autenticação nem relações complexas entre dados.</p>
<p>Não use se você precisa de queries complexas, transações, autenticação de usuários ou mais de 1000 operações diárias. Nesses casos, um backend real com PostgreSQL é a decisão certa.</p>
`
  },
  {
    id: 'fitness-data-integrity-refactor',
    title: 'Integridade de Dados & ML: limpeza de 11.600 registros com Python',
    excerpt: 'Como transformar um dataset com 89% de ruído em um verdadeiro motor de previsão de churn usando técnicas de auditoria e clustering.',
    category: 'Data Science',
    readTime: 10,
    date: '2026-02-06',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    tags: ['Python', 'Clustering', 'ETL', 'Audit'],
    featured: true,
    slug: 'fitness-data-integrity-refactor',
    content: `
      <h2>O desafio da integridade</h2>
      <p>Na minha refatoração recente do projeto <strong>FitNess App</strong>, encontrei um cenário comum na indústria: um dataset massivo, mas profundamente corrompido. De 11.600 registros, apenas 1.168 cumpriam padrões de integridade referencial.</p>

      <h3>Metodologia senior</h3>
      <p>Implementei um pipeline ETL que priorizou a <strong>veracidade do dado</strong> em vez da quantidade. O resultado foi reduzir o ruído estatístico em 89%, permitindo que o modelo de <strong>K-Means Clustering</strong> identificasse perfis reais de risco de churn em vez de artefatos de dados.</p>

      <h2>Insights de negócio</h2>
      <p>A análise revelou que 45% dos usuários abandonavam antes do dia 7 por uma falha no fluxo de onboarding, não por falta de interesse em conteúdo de HIIT ou Força.</p>
    `
  },
  {
    id: 'python-data-analytics-guide',
    title: 'Python para Análise de Dados: guia de sobrevivência',
    excerpt: 'Domine as ferramentas essenciais de pandas e numpy para transformar dados brutos em insights acionáveis.',
    category: 'Data Engineering',
    readTime: 12,
    date: '2025-01-05',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    tags: ['Python', 'Pandas', 'KPIs', 'Analytics'],
    featured: true,
    slug: 'python-for-data-analytics-guide',
    content: `
      <h2>Introdução à análise de dados moderna</h2>
      <p>Na era do Big Data, <strong>Python</strong> se consolidou como a lingua franca da ciência de dados. Sua simplicidade sintática combinada com a potência de bibliotecas otimizadas em C e Fortran o torna uma ferramenta difícil de superar.</p>

      <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2676&auto=format&fit=crop" alt="Dashboard de análise de dados" class="w-full h-64 object-cover rounded-xl my-8 shadow-lg" loading="lazy" decoding="async" />

      <p>Neste artigo, o foco está no ecossistema de <strong>Pandas</strong> e <strong>Numpy</strong>, pilares de qualquer pipeline de dados, e em como usá-los para extrair valor real do caos informacional.</p>

      <h2>Funções essenciais de Pandas e Numpy</h2>
      <p>Depois de analisar centenas de scripts em produção, concluí que dominar estas três funções resolve boa parte dos problemas diários de manipulação de dados:</p>
      <ul>
        <li><strong>describe()</strong>: seu primeiro contato com o dataset, com resumo estatístico imediato.</li>
        <li><strong>groupby()</strong>: ferramenta central de segmentação, fundamental para análises de coorte e agregações.</li>
        <li><strong>std()</strong> (Numpy): calcula desvio padrão para entender volatilidade e detectar anomalias.</li>
      </ul>

      <h3>Implementação prática</h3>
      <p>Para analisar vendas e detectar produtos com baixo desempenho mas alta volatilidade, combinamos leitura de CSV, agrupamentos, agregações e desvio padrão.</p>

      <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 my-6">
        <h4 class="font-bold text-slate-900 dark:text-white mb-4">🔧 Funções essenciais</h4>
        <ul class="space-y-3 text-slate-700 dark:text-slate-300">
          <li><strong class="text-primary">pd.read_csv()</strong> — Carregar dados de arquivos CSV</li>
          <li><strong class="text-primary">df.groupby()</strong> — Agrupar por categoria para análise de coortes</li>
          <li><strong class="text-primary">.agg()</strong> — Aplicar múltiplas funções de agregação</li>
          <li><strong class="text-primary">np.std</strong> — Calcular desvio padrão</li>
          <li><strong class="text-primary">.reset_index()</strong> — Converter índice agrupado em colunas normais</li>
        </ul>
        <p class="mt-4 text-sm text-slate-600 dark:text-slate-400 italic">💡 Dica: filtre produtos com margem &lt; 15% para identificar oportunidades de otimização</p>
      </div>

      <h2>O ciclo de vida da análise</h2>
      <ol>
        <li><strong>Limpeza</strong>: tratamento de nulos, tipos incorretos e registros corrompidos.</li>
        <li><strong>EDA</strong>: visualização inicial e detecção de padrões.</li>
        <li><strong>Feature Engineering</strong>: transformação de dados crus em variáveis úteis para o negócio.</li>
        <li><strong>Modelagem</strong>: aplicação de algoritmos estatísticos ou de Machine Learning.</li>
      </ol>

      <h2>KPIs críticos para o negócio</h2>
      <p>Líderes de negócio não consomem código, consomem métricas. Foque em ROI, taxa de conversão e churn rate para traduzir dados em dinheiro, eficiência ou risco.</p>

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h2>Conclusões principais</h2>
      <ul>
        <li>Python é a ferramenta, mas o <strong>pensamento estatístico</strong> é a habilidade central.</li>
        <li>Um simples <code>groupby()</code> pode revelar padrões ocultos.</li>
        <li>Limpe os dados obsessivamente; <em>Garbage In, Garbage Out</em>.</li>
        <li>Comunique descobertas na linguagem do negócio, não na linguagem do código.</li>
      </ul>
    `
  },
  {
    id: 'estadistica-pareto-viz',
    title: 'Interpretando gráficos estatísticos e o princípio de Pareto',
    excerpt: 'Como usar visualização de dados para identificar os 20% de causas que geram 80% dos problemas.',
    category: 'Performance',
    readTime: 8,
    date: '2025-01-02',
    image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2670&auto=format&fit=crop',
    tags: ['Visualization', 'Statistics', 'Pareto', 'DataViz'],
    featured: true,
    slug: 'interpreting-graphs-pareto-principle',
    content: `
      <h2>Visualização de dados efetiva</h2>
      <p>O cérebro humano processa imagens muito mais rápido que texto. Uma visualização vale mais que mil tabelas, mas escolher o gráfico certo é a diferença entre confundir a audiência com ruído visual ou persuadi-la com dados claros.</p>

      <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" alt="Dashboard de análise de dados" class="w-full h-64 object-cover rounded-xl my-8 shadow-lg" loading="lazy" decoding="async" />

      <h2>Ferramentas de diagnóstico visual</h2>
      <ul>
        <li><strong>Histogramas</strong>: ideais para ver a distribuição de uma variável numérica contínua.</li>
        <li><strong>Boxplots</strong>: perfeitos para comparar distribuições entre grupos e detectar outliers rapidamente.</li>
        <li><strong>Diagramas de dispersão</strong>: a melhor opção para visualizar correlação entre duas variáveis contínuas.</li>
      </ul>

      <h2>O diagrama de Pareto: a regra 80/20</h2>
      <p>O princípio de Pareto afirma que frequentemente 80% dos efeitos vêm de 20% das causas. Em engenharia de software, isso aparece em bugs, tráfego, gargalos e manutenção.</p>
      <blockquote>
        80% dos erros de software são causados por 20% dos bugs. 80% do tráfego é atendido por 20% do código.
      </blockquote>
      <p>Um diagrama de Pareto combina barras ordenadas por frequência com uma linha acumulada. Use-o para priorizar bugs ou endpoints com máximo impacto e mínimo esforço.</p>

      <h2>Barras ou linhas?</h2>
      <ul>
        <li>Use <strong>gráficos de barras</strong> para comparar categorias discretas.</li>
        <li>Use <strong>gráficos de linhas</strong> para séries temporais ou tendências contínuas.</li>
      </ul>

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h2>Conclusões principais</h2>
      <ul>
        <li>Priorize com base em dados e aplique Pareto para decidir onde investir esforço.</li>
        <li>Contexto importa: um número sem benchmark ou histórico diz pouco.</li>
        <li>Simplifique: remova todo elemento gráfico que não transmite informação.</li>
      </ul>

      <h3>O arsenal visual: 12 gráficos para contar histórias</h3>
      <p>Visualização é a linguagem que traduz matemática complexa em decisões de negócio claras.</p>
      <ul class="list-disc pl-5 space-y-2 mb-8 text-slate-700 dark:text-slate-300">
        <li><strong>Barras</strong>: comparar quantidades entre categorias.</li>
        <li><strong>Histograma</strong>: entender a forma dos dados.</li>
        <li><strong>Boxplot</strong>: ver mediana, quartis e outliers.</li>
        <li><strong>Linhas</strong>: acompanhar séries temporais.</li>
        <li><strong>Scatter Plot</strong>: avaliar relação entre variáveis.</li>
        <li><strong>Heatmap</strong>: visualizar correlações.</li>
        <li><strong>Barras empilhadas</strong>: comparar partes e total.</li>
        <li><strong>Pizza</strong>: usar com muita cautela.</li>
        <li><strong>Violin Plot</strong>: mostrar densidade com mais detalhe.</li>
        <li><strong>Pair Plot</strong>: ver relações entre múltiplas variáveis.</li>
        <li><strong>Área</strong>: enfatizar volume acumulado no tempo.</li>
        <li><strong>Tree Map</strong>: visualizar hierarquias e tamanhos relativos.</li>
      </ul>

      <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 my-6">
        <h4 class="font-bold text-slate-900 dark:text-white mb-4">Pro Tip</h4>
        <p class="text-slate-700 dark:text-slate-300">Antes de abrir Matplotlib, Seaborn ou Tableau, pergunte: <strong>"O que eu quero que a outra pessoa veja?"</strong>.</p>
      </div>
    `
  },
  {
    id: 'react-vs-native-comparison',
    title: 'React vs React Native: a comparação definitiva',
    excerpt: 'Analisamos diferenças arquitetônicas e de performance para ajudar você a escolher o stack certo para seu próximo projeto.',
    category: 'Frontend',
    readTime: 12,
    date: '2024-12-28',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop',
    tags: ['React', 'React Native', 'Mobile', 'Web'],
    featured: false,
    slug: 'react-vs-react-native-comparison',
    content: `
      <h2>Arquitetura e fundamentos</h2>
      <p>Embora compartilhem o mesmo DNA, React e React Native são diferentes por dentro. Escolher entre uma PWA com React ou um app nativo com React Native é uma decisão crítica no início de um produto.</p>

      <p><strong>React</strong> para web manipula o <em>Virtual DOM</em>, uma representação em memória da UI sincronizada com o DOM real do navegador.</p>
      <p><strong>React Native</strong> não usa HTML nem CSS. Ele usa JavaScript para invocar componentes nativos reais de iOS e Android, entregando uma experiência que se sente nativa.</p>

      <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop" alt="Codificando um componente React" class="w-full h-64 object-cover rounded-xl my-8 shadow-lg" loading="lazy" decoding="async" />

      <h2>Tabela de comparação técnica</h2>
      <div class="table-wrapper">
      <table class="w-full border-collapse border border-slate-700 my-6 text-sm text-left">
        <thead>
          <tr class="bg-slate-800 text-white">
            <th class="border border-slate-700 p-3">Característica</th>
            <th class="border border-slate-700 p-3">React (Web)</th>
            <th class="border border-slate-700 p-3">React Native</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border border-slate-700">
            <td class="p-3 font-semibold text-cobalt-300">Renderização</td>
            <td class="p-3">HTML/CSS no navegador (Virtual DOM).</td>
            <td class="p-3">Componentes nativos (UIView, android.view).</td>
          </tr>
          <tr class="border border-slate-700">
            <td class="p-3 font-semibold text-cobalt-300">Estilos</td>
            <td class="p-3">CSS tradicional, CSS-in-JS, Tailwind.</td>
            <td class="p-3">StyleSheet ou NativeWind.</td>
          </tr>
          <tr class="border border-slate-700">
            <td class="p-3 font-semibold text-cobalt-300">Navegação</td>
            <td class="p-3">Baseada em URL (React Router).</td>
            <td class="p-3">Baseada em Stack/Screen (React Navigation).</td>
          </tr>
          <tr class="border border-slate-700">
            <td class="p-3 font-semibold text-cobalt-300">Acesso a hardware</td>
            <td class="p-3">Limitado pelas Web APIs do navegador.</td>
            <td class="p-3">Acesso completo a sensores, câmera, AR e GPU.</td>
          </tr>
        </tbody>
      </table>
      </div>

      <h2>Conclusão</h2>
      <p>Não existe vencedor absoluto, apenas a ferramenta correta para o trabalho.</p>
      <ul>
        <li>Se você precisa de <strong>SEO</strong>, distribuição instantânea e baixo custo de aquisição: <strong>Web (React)</strong>.</li>
        <li>Se precisa de <strong>performance nativa</strong>, push confiável, hardware e presença nas stores: <strong>Mobile (React Native)</strong>.</li>
        <li>Para combinar mundos, pesquise <strong>Expo Router</strong> e <strong>React Native Web</strong>.</li>
      </ul>

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h2>Conclusões principais</h2>
      <ul>
        <li>React Native renderiza views nativas reais, não é uma WebView.</li>
        <li>A curva de aprendizado é suave para quem já conhece React, mas exige entender ecossistemas mobile.</li>
        <li>A arquitetura Bridge está sendo substituída por JSI, tornando React Native cada vez mais rápido.</li>
      </ul>
    `
  },
  {
    id: 'guia-estadistica-data-analyst',
    title: 'Guia de Estatística para Data Analyst',
    excerpt: '45 conceitos com exemplos reais — tudo o que usei na análise do FitNess App',
    category: 'Data Science',
    readTime: 15,
    date: '2026-04-12',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['Statistics', 'Data Science', 'Analytics', 'FitNess'],
    featured: true,
    slug: 'statistics-guide-data-analyst',
    content: `
      <h2>Como usar este guia</h2>
      <p>Organizado em 7 blocos temáticos. Cada conceito traz o que é, quando usar, um exemplo real e como aparece em entrevistas. Estude 5 conceitos por sessão: leia, feche e explique em voz alta.</p>
      <p><em>Todos os conceitos marcados com ⚡ foram aplicados diretamente na análise de retenção do FitNess App.</em></p>

      <h2>Bloco 1 — Exploração de Dados (EDA)</h2>
      <h3>Média</h3>
      <p>Soma de todos os valores dividida pela quantidade de valores. Use quando quiser resumir dados numéricos em um valor representativo.</p>
      <h3>Mediana</h3>
      <p>Valor central de um conjunto ordenado. É mais robusta que a média quando existem outliers.</p>
      <h3>Moda</h3>
      <p>Valor que aparece com mais frequência. Útil para dados categóricos.</p>
      <h3>Variância e desvio padrão</h3>
      <p>Medem quão dispersos estão os dados ao redor da média. Alta dispersão indica comportamento mais imprevisível.</p>
      <h3>Outliers ⚡</h3>
      <p>Valores que diferem significativamente do restante. No FitNess App foram detectados 10.432 registros ruidosos de 11.600 totais, reduzindo o dataset a 1.168 registros válidos.</p>

      <h2>Bloco 2 — Forma da distribuição</h2>
      <p>Distribuição normal, curtose e assimetria ajudam a entender se os dados são equilibrados, têm caudas pesadas ou exigem segmentação antes de tirar conclusões.</p>

      <h2>Bloco 3 — Relações entre variáveis</h2>
      <h3>Correlação de Pearson</h3>
      <p>Mede força e direção da relação linear entre duas variáveis numéricas, indo de -1 a +1.</p>
      <h3>Regressão logística ⚡</h3>
      <p>Prediz a probabilidade de um evento binário. No FitNess App foi usada conceitualmente para identificar perfis de risco de churn.</p>
      <h3>Qui-quadrado</h3>
      <p>Teste para variáveis categóricas, avaliando associação entre categorias.</p>

      <h2>Bloco 4 — Comparação de grupos</h2>
      <p>T-test, ANOVA, hipótese nula, hipótese alternativa, p-valor e intervalos de confiança ajudam a decidir se uma diferença observada é real ou casual.</p>
      <p>Na análise de retenção, HIIT e Força foram validados como drivers de retenção com p &lt; 0,05.</p>

      <h2>Bloco 5 — Amostragem e inferência</h2>
      <p>No FitNess App, o dataset original tinha 11.600 registros, mas apenas 1.168 eram válidos. A análise foi feita sobre essa amostra após auditoria ETL.</p>
      <p>O Teorema Central do Limite, amostragem aleatória e amostragem estratificada ajudam a sustentar conclusões estatísticas.</p>

      <h2>Bloco 6 — Processo de análise</h2>
      <h3>EDA ⚡</h3>
      <p>Primeira fase de qualquer análise: exploração do dataset bruto, detecção de inconsistências e identificação de padrões.</p>
      <h3>ETL ⚡</h3>
      <p>Extração do CSV bruto, detecção de registros inconsistentes, limpeza e consolidação de registros válidos.</p>
      <h3>Normalização e padronização ⚡</h3>
      <p>Antes de K-Means, variáveis foram padronizadas com z-score para evitar que uma escala dominasse o clustering.</p>

      <h2>Bloco 7 — Machine Learning básico</h2>
      <h3>K-Means Clustering ⚡</h3>
      <p>Algoritmo que agrupa dados em k clusters minimizando distância ao centroide. No FitNess App, segmentou usuários em alta retenção, risco médio e alto risco de abandono.</p>
      <h3>Método do cotovelo ⚡</h3>
      <p>Técnica para escolher o número ótimo de clusters. No FitNess App, o cotovelo apareceu em k=3.</p>
      <h3>Tipos de análise ⚡</h3>
      <p>O projeto cobriu análise descritiva, diagnóstica, preditiva e prescritiva: do churn inicial de 65% até recomendações de onboarding para reduzir abandono.</p>

      <h2>Conceitos adicionais do FitNess App</h2>
      <p><strong>Sticky Factor (DAU/MAU)</strong> mede engajamento real. <strong>Churn Rate</strong> mede abandono. <strong>Falha de ativação no Dia 0</strong> identifica o momento crítico em que o usuário novo não experimenta valor.</p>

      <h2>Tabela de decisão rápida</h2>
      <table>
        <thead>
          <tr><th>Pergunta de negócio</th><th>Tipo de variável</th><th>Ferramenta</th></tr>
        </thead>
        <tbody>
          <tr><td>Quanto nossos usuários ganham em média?</td><td>Numérica, 1 grupo</td><td>Média / Mediana</td></tr>
          <tr><td>Qual plano escolhem mais?</td><td>Categórica, 1 variável</td><td>Moda / Frequência</td></tr>
          <tr><td>Mais marketing, mais vendas?</td><td>2 variáveis numéricas</td><td>Correlação + Regressão</td></tr>
          <tr><td>Diferença entre grupo A e B?</td><td>Numérica, 2 grupos</td><td>t-test</td></tr>
          <tr><td>Diferença entre A, B e C?</td><td>Numérica, 3+ grupos</td><td>ANOVA</td></tr>
          <tr><td>O gênero influencia o plano escolhido?</td><td>2 variáveis categóricas</td><td>Qui-quadrado</td></tr>
          <tr><td>Quem vai fazer churn?</td><td>Variável dependente binária</td><td>Regressão logística</td></tr>
          <tr><td>Como segmento meus usuários?</td><td>Sem etiquetas prévias</td><td>K-Means</td></tr>
          <tr><td>Essa diferença é real ou acaso?</td><td>Qualquer uma</td><td>P-valor + Hipótese</td></tr>
          <tr><td>Qual foi minha taxa de abandono?</td><td>Usuários ativos</td><td>Churn Rate + DAU/MAU</td></tr>
        </tbody>
      </table>
    `
  }
];

export const featuredPosts = blogPosts.filter(post => post.featured);

// Cálculo dinâmico de categorias
export const categories = [
  { id: 'all', label: 'Todos', count: blogPosts.length },
  ...Array.from(new Set(blogPosts.map(post => post.category))).map(cat => ({
    id: cat.toLowerCase().replace(/\s+/g, '-'),
    label: cat,
    count: blogPosts.filter(post => post.category === cat).length
  }))
];

export default blogPosts;
