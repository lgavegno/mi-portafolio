// src/features/blog/data/blogData.es.js
// Blog posts data (Spanish)

export const blogPosts = [
  {
    id: 'como-conectamos-excel-con-un-erp',
    title: 'Cómo transformamos una planilla de Excel en una herramienta conectada a un ERP',
    excerpt: 'Cómo conectamos una planilla de Excel al sistema de gestión de una empresa sin cambiar el flujo de trabajo del equipo de ventas — y los problemas técnicos que resolvimos en el camino.',
    category: 'Automatización',
    readTime: 7,
    date: '2026-07-07',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    tags: ['Excel', 'ERP', 'VBA', 'Automatización', 'API', 'Integraciones'],
    featured: false,
    slug: 'como-conectamos-excel-con-un-erp',
    content: `
<h2>El problema: dos sistemas que no se hablaban</h2>
<p>Un equipo de ventas trabajaba todos los días con una planilla de Excel para armar pedidos. Era la herramienta que conocían, la que usaban desde siempre y la que no querían abandonar. El problema era que el stock real y la información oficial de cada producto vivían en otro lugar: un sistema ERP separado, sin ninguna conexión con esa planilla.</p>
<p>Cada vendedor tenía que cargar el pedido en Excel y, en paralelo, consultar manualmente el ERP para saber si el producto todavía tenía stock disponible. Ese doble trabajo generaba pérdida de tiempo, errores de carga y — el peor de los casos — pedidos confirmados con cantidades que ya no existían.</p>

<h2>La restricción que definió todo: no tocar el flujo de trabajo</h2>
<p>La solución más obvia hubiera sido reemplazar la planilla por una aplicación nueva. Pero eso significaba capacitar a un equipo entero en una herramienta desconocida, con la resistencia y el tiempo de adopción que eso implica. La decisión fue la opuesta: mantener la planilla de Excel exactamente como la conocían, pero conectarla al sistema de gestión por detrás, de forma transparente.</p>

<h2>La arquitectura de la solución</h2>
<p>Se desarrolló una integración mediante macros de VBA que consulta periódicamente la información de cada producto en el sistema externo y actualiza automáticamente el stock disponible dentro de la propia planilla. El vendedor sigue viendo una fila de Excel — solo que ahora esa fila tiene datos en tiempo real.</p>
<p>El sistema externo imponía un límite de consultas por unidad de tiempo, así que la sincronización no podía simplemente pedir todo el catálogo de una vez. Se diseñó una estrategia de ejecución controlada — lotes espaciados en el tiempo — para actualizar el catálogo completo sin generar bloqueos ni superar ese límite.</p>

<h2>El desafío más interesante: cantidades que cambian a mitad de la carga</h2>
<p>Durante la carga de un pedido, el vendedor prueba distintas cantidades antes de confirmar. Si cada cambio de cantidad recalculara el stock disponible descontando sobre el último valor calculado, un par de correcciones sucesivas terminaban arrastrando errores acumulados — el stock mostrado ya no reflejaba la realidad.</p>
<p>La solución fue conceptualmente simple pero clave: guardar internamente una copia del stock original obtenido en el momento de la sincronización, y usar siempre ese valor base — nunca el resultado de un cálculo anterior — para recalcular el disponible en cada cambio de cantidad. Cero errores acumulativos, sin importar cuántas veces el vendedor ajustara el pedido.</p>
<p>A eso se sumó una actualización automática y periódica de la sincronización, para minimizar el riesgo de trabajar con información desactualizada sin que el usuario tuviera que hacer nada manualmente.</p>

<h2>Resultados</h2>
<ul>
  <li>Eliminación de las consultas manuales al sistema de gestión durante la venta.</li>
  <li>Reducción significativa de errores provocados por diferencias de stock.</li>
  <li>Mayor velocidad en la confección de pedidos.</li>
  <li>Cero curva de aprendizaje: el equipo siguió usando la misma planilla, ahora con indicadores visuales de stock y cálculos automáticos.</li>
  <li>Integración transparente entre Excel y el sistema de gestión, sin reemplazar procesos existentes.</li>
</ul>

<h2>Lo que me llevo de este proyecto</h2>
<p>Las automatizaciones más efectivas son las que respetan el flujo de trabajo del usuario en lugar de obligarlo a aprender una herramienta nueva. Las limitaciones de rendimiento o de consumo de servicios externos hay que contemplarlas desde el diseño de la integración, no como un parche posterior. Y cuando hay cálculos derivados de datos sincronizados, conviene conservar siempre un valor base inmutable — evita errores acumulativos que son muy difíciles de detectar después.</p>
<p>Una buena integración no solo conecta sistemas: también mejora la confiabilidad de la información y reduce el trabajo operativo diario del equipo que la usa.</p>
<p>¿Tenés un proceso manual parecido — una planilla, un sistema legado, un flujo que "funciona pero no está conectado"? Hablemos sobre cómo automatizarlo sin que tu equipo tenga que cambiar la forma en que trabaja.</p>
`
  },
  {
    id: 'google-sheets-backend-serverless',
    title: 'Cómo configuré Google Sheets como un backend serverless',
    excerpt: 'Sin servidor, sin base de datos, sin costo mensual. Cómo construí un sistema de cotizaciones con Google Apps Script, Sheets y Gmail que procesa formularios en tiempo real.',
    category: 'Development',
    readTime: 8,
    date: '2026-04-16',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    tags: ['Google Sheets', 'Apps Script', 'Serverless', 'Vanilla JS'],
    featured: true,
    slug: 'google-sheets-backend-serverless',
    content: `
<h2>El problema que quería resolver</h2>
<p>Necesitaba que los clientes pudieran generar cotizaciones de proyectos web en tiempo real y que yo recibiera esa información automáticamente — sin montar un servidor, sin pagar hosting de backend, sin mantener una base de datos.</p>
<p>La solución fue usar infraestructura que ya existe y es gratuita: <strong>Google Sheets como base de datos, Google Apps Script como servidor, y Gmail como sistema de notificaciones.</strong></p>

<h2>La arquitectura completa</h2>
<p>El flujo tiene cuatro capas que se comunican entre sí:</p>
<pre><code>Frontend (Vanilla JS)
    ↓ POST JSON
Google Apps Script (Webhook)
    ↓              ↓
Google Sheets    Gmail
(almacenamiento) (notificación)</code></pre>
<p>El cliente completa el formulario, el JavaScript del frontend calcula el precio en tiempo real, y al enviar hace un <code>fetch()</code> POST al webhook de Apps Script. El script valida los datos, los guarda en Sheets y me envía un email con los detalles completos.</p>

<h2>Paso 1 — El frontend calcula, no el servidor</h2>
<p>La primera decisión fue mover toda la lógica de precios al cliente. Cada vez que el usuario selecciona un tipo de sitio o funcionalidad, JavaScript recalcula el total al instante sin hacer ninguna llamada al servidor.</p>
<p>Esto tiene dos ventajas: la experiencia es inmediata (sin latencia) y el servidor solo recibe el resultado final, no tiene que procesar nada complejo.</p>
<pre><code>function calculateQuote() {
  const base = PRICES[siteType] || 0;
  const extras = selectedSections * 50000;
  const features = selectedFeatures * 60000;
  return base + extras + features;
}</code></pre>

<h2>Paso 2 — Google Apps Script como webhook</h2>
<p>Apps Script permite publicar una función como un endpoint HTTP públicamente accesible. La función <code>doPost()</code> es el equivalente de una ruta <code>POST /api/cotizacion</code> en Express, pero sin servidor.</p>
<pre><code>function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  // Guardar en Sheets
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

<h2>Paso 3 — El problema de CORS y cómo resolverlo</h2>
<p>Acá hay una trampa que me costó tiempo: Apps Script no soporta CORS correctamente cuando se usa <code>fetch()</code> con <code>mode: 'cors'</code>. La solución es usar <code>mode: 'no-cors'</code> en el frontend.</p>
<p>El trade-off es que no podés leer la respuesta del servidor, pero para este caso no importa — si el script falla, el usuario ve un error de red genérico, no un mensaje personalizado.</p>
<pre><code>await fetch(GOOGLE_SCRIPT_URL, {
  method: 'POST',
  mode: 'no-cors', // necesario para Apps Script
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});</code></pre>

<h2>Paso 4 — Google Sheets como base de datos</h2>
<p>Sheets tiene cuatro hojas con funciones específicas: <strong>SUBMISSIONS</strong> guarda cada cotización con timestamp y todos los campos, <strong>STATISTICS</strong> tiene fórmulas que calculan automáticamente métricas como total de cotizaciones y presupuesto promedio, <strong>LOGS</strong> registra cada evento del script para debugging, y <strong>TEMPLATE</strong> define el formato del email.</p>
<p>La ventaja de Sheets sobre una base de datos real es que podés ver, filtrar y exportar datos sin escribir una sola query.</p>

<h2>El caso especial: proyectos personalizados</h2>
<p>El formulario tiene dos modos: el estándar con precios fijos, y un modo "proyecto personalizado" para sistemas complejos donde el precio no puede calcularse sin una entrevista técnica.</p>
<p>Cuando el usuario activa ese modo, las secciones y funcionalidades se deshabilitan, el total muestra "A cotizar" y el email que recibo tiene asunto <code>SOLICITUD DE PROYECTO PERSONALIZADO</code> para diferenciarlo visualmente en mi bandeja.</p>

<h2>Resultado y métricas</h2>
<p>El sistema lleva varias semanas en producción sin incidentes. El costo de infraestructura es <strong>$0/mes</strong> — todo corre en el tier gratuito de Google. El tiempo de respuesta del webhook es de 800ms a 2 segundos, aceptable para un formulario de contacto.</p>
<p>Lo más valioso fue el aprendizaje: entender que no siempre se necesita arquitectura compleja. A veces la solución más simple y barata es la correcta.</p>

<h2>Cuándo usar este enfoque y cuándo no</h2>
<p>Este patrón funciona bien para formularios de contacto, generadores de cotizaciones, registro de leads, o cualquier caso donde el volumen sea bajo (menos de 100 envíos por día) y no se necesite autenticación ni relaciones entre datos.</p>
<p>No lo uses si necesitás queries complejas, transacciones, autenticación de usuarios, o más de 1000 operaciones diarias. Para esos casos, un backend real en Railway o Render con PostgreSQL es la decisión correcta.</p>
`
  },
  {
    id: 'fitness-data-integrity-refactor',
    title: 'Integridad de Datos & ML: Limpieza de 11.600 Registros con Python',
    excerpt: 'Cómo transformar un dataset con 89% de ruido en un verdadero motor de predicción de churn mediante técnicas de auditoría y clustering.',
    category: 'Data Science',
    readTime: 10,
    date: '2026-02-06',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    tags: ['Python', 'Clustering', 'ETL', 'Audit'],
    featured: true,
    slug: 'fitness-data-integrity-refactor',
    content: `
      <h2>El Desafío de la Integridad</h2>
      <p>En mi reciente refactorización del proyecto <strong>FitNess App</strong>, me encontré con un escenario común en la industria: un dataset masivo pero profundamente corrupto. De 11.600 registros, solo 1.168 cumplían los estándares de integridad referencial.</p>

      <h3>Metodología Senior</h3>
      <p>Implementé un pipeline ETL que priorizó la <strong>veracidad del dato</strong> sobre la cantidad. El resultado fue reducir el ruido estadístico un 89%, permitiendo que el modelo de <strong>K-Means Clustering</strong> identificara perfiles de riesgo de churn reales en vez de artefactos de datos.</p>

      <h2>Insights de Negocio</h2>
      <p>El análisis reveló que el 45% de los usuarios abandonaba antes del día 7 por una falla en el flujo de onboarding, no por falta de interés en el contenido de HIIT o Fuerza.</p>
    `
  },
  {
    id: 'python-data-analytics-guide',
    title: 'Python para Análisis de Datos: Guía de Supervivencia',
    excerpt: 'Dominá las herramientas esenciales de pandas y numpy para transformar datos brutos en insights accionables.',
    category: 'Data Engineering',
    readTime: 12,
    date: '2025-01-05',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    tags: ['Python', 'Pandas', 'KPIs', 'Analytics'],
    featured: true,
    slug: 'python-for-data-analytics-guide',
    content: `
      <h2>Introducción al Análisis de Datos Moderno</h2>
      <p>En la era del Big Data, <strong>Python</strong> se ha consolidado como la lingua franca de la ciencia de datos. Su simplicidad sintáctica combinada con la potencia bruta de librerías optimizadas en C y Fortran lo hacen imbatible. Para un analista de datos moderno, no es solo un lenguaje, es una navaja suiza capaz de todo: desde limpiar terabytes de logs hasta automatizar reportes ejecutivos.</p>

      <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2676&auto=format&fit=crop" alt="Dashboard de Análisis de Datos" class="w-full h-64 object-cover rounded-xl my-8 shadow-lg" loading="lazy" decoding="async" />

      <p>En este artículo nos enfocamos en el ecosistema de <strong>Pandas</strong> y <strong>Numpy</strong>, las piedras angulares de cualquier pipeline de datos, y cómo usarlos para extraer valor real del caos informativo.</p>

      <h2>Funciones Esenciales de Pandas y Numpy</h2>
      <p>Tras analizar cientos de scripts en producción, concluí que dominar estas tres funciones te permitirá resolver el 80% de tus problemas diarios de manipulación de datos:</p>
      <ul>
        <li><strong>describe()</strong>: Tu primer contacto con el dataset. Ofrece un resumen estadístico inmediato (media, desviación estándar, cuartiles).</li>
        <li><strong>groupby()</strong>: La herramienta de segmentación definitiva. Fundamental para análisis de cohortes y agregaciones complejas.</li>
        <li><strong>std()</strong> (Numpy): Calcular la desviación estándar es crucial para entender la volatilidad y detectar anomalías estadísticas que podrían sesgar tu modelo.</li>
      </ul>

      <h3>Implementación Práctica</h3>
      <p>Para analizar un dataset de ventas y detectar productos con bajo rendimiento pero alta volatilidad, usamos las siguientes funciones clave:</p>

      <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 my-6">
        <h4 class="font-bold text-slate-900 dark:text-white mb-4">🔧 Funciones Esenciales</h4>
        <ul class="space-y-3 text-slate-700 dark:text-slate-300">
          <li><strong class="text-primary">pd.read_csv()</strong> — Cargar datos desde archivos CSV</li>
          <li><strong class="text-primary">df.groupby()</strong> — Agrupar datos por categoría para análisis de cohortes</li>
          <li><strong class="text-primary">.agg()</strong> — Aplicar múltiples funciones de agregación (suma, media, std)</li>
          <li><strong class="text-primary">np.std</strong> — Calcular desviación estándar para detectar volatilidad</li>
          <li><strong class="text-primary">.reset_index()</strong> — Convertir el índice agrupado en columnas normales</li>
        </ul>
        <p class="mt-4 text-sm text-slate-600 dark:text-slate-400 italic">💡 Tip: Filtrá productos con margen &lt; 15% para identificar oportunidades de optimización</p>
      </div>

      <h2>El Ciclo de Vida del Análisis</h2>
      <p>Un flujo de trabajo profesional no es lineal, sino que sigue pasos rigurosos para garantizar la integridad del insight:</p>
      <ol>
        <li><strong>Limpieza (Cleaning)</strong>: 60% del tiempo. Manejo de valores nulos (<code>fillna</code>, <code>dropna</code>) y corrección de tipos de datos que frecuentemente llegan corruptos desde la fuente.</li>
        <li><strong>EDA (Análisis Exploratorio de Datos)</strong>: Visualización preliminar y detección de patrones mediante histogramas y diagramas de dispersión.</li>
        <li><strong>Feature Engineering</strong>: Transformar datos crudos en variables con significado para el negocio.</li>
        <li><strong>Modelado</strong>: Aplicación de algoritmos estadísticos o de Machine Learning.</li>
      </ol>

      <h2>KPIs Críticos para el Negocio</h2>
      <p>Al final del día, los líderes de negocio no consumen código, consumen métricas. Tu trabajo es traducir bits en dinero o eficiencia. Enfocate en calcular:</p>
      <ul>
        <li><strong>ROI (Retorno sobre la Inversión)</strong>: (Beneficio Neto / Costo) * 100. La métrica reina.</li>
        <li><strong>Tasa de Conversión</strong>: Porcentaje de usuarios que realizan una acción deseada. Vital para producto.</li>
        <li><strong>Churn Rate</strong>: Tasa de cancelación de clientes. En modelos SaaS, reducir el Churn es más rentable que adquirir nuevos usuarios.</li>
      </ul>

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h2>Conclusiones Clave</h2>
      <ul>
        <li>Python es la herramienta, pero el <strong>pensamiento estadístico</strong> es la habilidad clave.</li>
        <li>No subestimes el poder de un simple <code>groupby()</code> para encontrar patrones ocultos.</li>
        <li>Limpiá tus datos obsesivamente; <em>Garbage In, Garbage Out</em>.</li>
        <li>Comunicá tus hallazgos en el lenguaje del negocio (KPIs), no en el lenguaje del programador (Funciones).</li>
      </ul>
    `
  },
  {
    id: 'estadistica-pareto-viz',
    title: 'Interpretando Gráficos Estadísticos y el Principio de Pareto',
    excerpt: 'Cómo usar la visualización de datos para identificar el 20% de causas que generan el 80% de los problemas.',
    category: 'Performance',
    readTime: 8,
    date: '2025-01-02',
    image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2670&auto=format&fit=crop',
    tags: ['Visualization', 'Statistics', 'Pareto', 'DataViz'],
    featured: true,
    slug: 'interpreting-graphs-pareto-principle',
    content: `
      <h2>Visualización de Datos Efectiva</h2>
      <p>El cerebro humano procesa imágenes 60.000 veces más rápido que el texto. Una visualización vale más que mil tablas, pero elegir el gráfico correcto es la diferencia entre confundir a tu audiencia con "ruido visual" o persuadirla con datos claros. En el análisis de rendimiento web y sistemas, la visualización es nuestra principal herramienta de diagnóstico.</p>

      <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" alt="Dashboard de análisis de datos" class="w-full h-64 object-cover rounded-xl my-8 shadow-lg" loading="lazy" decoding="async" />

      <h2>Herramientas de Diagnóstico Visual</h2>
      <p>Existen cientos de tipos de gráficos, pero estos tres son los caballos de batalla del análisis estadístico:</p>
      <ul>
        <li><strong>Histogramas</strong>: Ideales para ver la distribución de una variable numérica continua. ¿Los tiempos de respuesta de tu servidor siguen una curva normal o tienen una cola larga?</li>
        <li><strong>Boxplots (Diagramas de Caja)</strong>: Perfectos para comparar distribuciones entre grupos y detectar <em>outliers</em> (valores atípicos) de un vistazo. Indispensables para comparar rendimiento entre versiones de la app.</li>
        <li><strong>Diagramas de Dispersión (Scatter Plots)</strong>: La mejor opción para visualizar la correlación entre dos variables continuas. ¿El uso de CPU aumenta linealmente con las solicitudes por segundo?</li>
      </ul>

      <h2>El Diagrama de Pareto: La Regla 80/20</h2>
      <p>El principio de Pareto, formulado por Vilfredo Pareto, establece que frecuentemente el 80% de los efectos provienen del 20% de las causas. En ingeniería de software, esto es una ley universal:</p>
      <blockquote>
        El 80% de los errores de software son causados por el 20% de los bugs. El 80% del tráfico es manejado por el 20% del código.
      </blockquote>
      <p>Un Diagrama de Pareto combina un gráfico de barras (causas individuales ordenadas por frecuencia) con una línea acumulada (porcentaje total). Usalo para priorizar qué <em>bugs</em> corregir primero o qué endpoints optimizar para máximo impacto con mínimo esfuerzo.</p>



      <h2>¿Barras o Líneas?</h2>
      <p>Una confusión frecuente. La regla es simple:</p>
      <ul>
        <li>Usá <strong>Gráficos de Barras</strong> para comparar categorías discretas (ej. Ventas por País, Errores por Tipo).</li>
        <li>Usá <strong>Gráficos de Líneas</strong> exclusivamente para series temporales o tendencias continuas (ej. Evolución de usuarios por mes, Latencia en el tiempo).</li>
      </ul>

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h2>Conclusiones Clave</h2>
      <ul>
        <li>Siempre priorizá basándote en datos: aplicá Pareto para identificar dónde invertir tus recursos de ingeniería.</li>
        <li>El contexto importa: un número sin comparación (benchmark o histórico) no dice nada.</li>
        <li>Simplificá: eliminá cada elemento gráfico que no transmita información (Chartjunk).</li>
      </ul>

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h3>El Arsenal Visual: 12 Gráficos para Contar Historias</h3>
      <p>Tener el mejor modelo predictivo no sirve de mucho si nadie entiende lo que dice. La visualización es el lenguaje que usamos para traducir matemática compleja en decisiones de negocio claras.</p>

      <p class="mb-4">Acá está la caja de herramientas fundamental para que tus análisis no terminen olvidados en un cajón:</p>

      <ul class="list-disc pl-5 space-y-2 mb-8 text-slate-700 dark:text-slate-300">
        <li><strong>Barras</strong>: El clásico confiable. Usalo para comparar cantidades entre categorías sin complicaciones (A vs B).</li>
        <li><strong>Histograma</strong>: Para ver la "forma" de tus datos. ¿Es una campana normal o hay algo raro?</li>
        <li><strong>Boxplot (Caja y Bigotes)</strong>: El detector de mentiras. Te muestra dónde realmente está tu dato y expone outliers sin piedad.</li>
        <li><strong>Líneas</strong>: Esencial para ver el pasado y proyectar el futuro (series temporales).</li>
        <li><strong>Scatter Plot (Dispersión)</strong>: ¿Estas dos variables tienen relación o es pura coincidencia? Acá se ve claro.</li>
        <li><strong>Heatmap (Mapa de Calor)</strong>: Ideal para matrices de correlación. Donde está rojo intenso, hay una relación fuerte.</li>
        <li><strong>Barras Apiladas</strong>: Para ver el "todo" y sus "partes" al mismo tiempo. Útil para composiciones.</li>
        <li><strong>Torta (Pie Chart)</strong>: Usalo con gran cautela. Los humanos somos malos comparando ángulos; solo sirve para diferencias muy obvias.</li>
        <li><strong>Violin Plot</strong>: Como un Boxplot pero con más detalle sobre la densidad. Elegante, pero a veces confunde a personas no técnicas.</li>
        <li><strong>Pair Plot</strong>: Una vista a vuelo de pájaro de todas las relaciones posibles entre tus variables a la vez.</li>
        <li><strong>Área</strong>: Similar a los gráficos de líneas, pero enfatiza el volumen acumulado en el tiempo.</li>
        <li><strong>Tree Map</strong>: Perfecto para visualizar jerarquías y tamaños relativos de un vistazo.</li>
      </ul>

      <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 my-6">
        <h4 class="font-bold text-slate-900 dark:text-white mb-4">Pro Tip</h4>
        <p class="text-slate-700 dark:text-slate-300">Antes de abrir Matplotlib, Seaborn o Tableau, preguntate: <strong>"¿Qué quiero que la otra persona vea?"</strong>.</p>
        <p class="mt-4 text-slate-700 dark:text-slate-300">Si la respuesta no está clara, ningún gráfico te va a salvar. El propósito de visualizar es reducir la carga cognitiva de quien te lee para que pueda tomar una decisión rápidamente.</p>
      </div>
    `
  },
  {
    id: 'react-vs-native-comparison',
    title: 'React vs React Native: La Comparación Definitiva',
    excerpt: 'Analizamos las diferencias arquitectónicas y de rendimiento para ayudarte a elegir el stack correcto para tu próximo proyecto.',
    category: 'Frontend',
    readTime: 12,
    date: '2024-12-28',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop',
    tags: ['React', 'React Native', 'Mobile', 'Web'],
    featured: false,
    slug: 'react-vs-react-native-comparison',
    content: `
      <h2>Arquitectura y Fundamentos</h2>
      <p>Aunque comparten el mismo ADN (y logo), React y React Native son bestias diferentes por dentro. Elegir entre una PWA (Progressive Web App) con React o una App Nativa con React Native es una de las decisiones más críticas al inicio de una startup.</p>

      <p><strong>React</strong> (para web) manipula el <em>Virtual DOM</em>, una representación en memoria de la UI, que finalmente se sincroniza con el DOM real del navegador. Es universal, accesible desde cualquier dispositivo con internet.</p>

      <p><strong>React Native</strong>, en cambio, no usa HTML ni CSS. Usa un hilo de JavaScript que se comunica a través de un "puente" (Bridge) —o la nueva arquitectura JSI (JavaScript Interface)— para invocar componentes nativos reales de iOS (UIKit/SwiftUI) y Android (Android Views/Jetpack Compose). El resultado es una app que se siente, se ve y rinde como una nativa.</p>

      <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop" alt="Codificando un Componente React" class="w-full h-64 object-cover rounded-xl my-8 shadow-lg" loading="lazy" decoding="async" />

      <h2>Tabla de Comparación Técnica</h2>
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
            <td class="p-3 font-semibold text-cobalt-300">Renderizado</td>
            <td class="p-3">HTML/CSS en el navegador (Virtual DOM).</td>
            <td class="p-3">Componentes Nativos (UIView, android.view).</td>
          </tr>
          <tr class="border border-slate-700">
            <td class="p-3 font-semibold text-cobalt-300">Estilos</td>
            <td class="p-3">CSS tradicional, CSS-in-JS, Tailwind.</td>
            <td class="p-3">StyleSheet (objeto JS) o NativeWind.</td>
          </tr>
          <tr class="border border-slate-700">
            <td class="p-3 font-semibold text-cobalt-300">Navegación</td>
            <td class="p-3">Basada en URL (React Router).</td>
            <td class="p-3">Basada en Stack/Screen (React Navigation).</td>
          </tr>
          <tr class="border border-slate-700">
            <td class="p-3 font-semibold text-cobalt-300">Acceso al Hardware</td>
            <td class="p-3">Limitado por las Web APIs del navegador (Bluetooth, Geo).</td>
            <td class="p-3">Acceso completo (Nativo) a sensores, cámara, AR, GPU.</td>
          </tr>
        </tbody>
      </table>
      </div>



      <h2>Conclusión</h2>
      <p>No hay un ganador absoluto, solo la herramienta correcta para el trabajo.</p>
      <ul>
        <li>Si necesitás <strong>SEO</strong>, distribución instantánea y bajo costo de adquisición: <strong>Web (React)</strong>.</li>
        <li>Si necesitás <strong>rendimiento nativo</strong>, notificaciones push confiables, acceso profundo al hardware y presencia en las Stores: <strong>Mobile (React Native)</strong>.</li>
        <li>¿Lo mejor de los dos mundos? Investigá <strong>Expo Router</strong> y <strong>React Native Web</strong> para compartir hasta el 90% del código.</li>
      </ul>

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h2>Conclusiones Clave</h2>
      <ul>
        <li>React Native renderiza vistas nativas reales, no es una WebView (como Ionic/Cordova).</li>
        <li>La curva de aprendizaje es suave si ya conocés React, pero requiere aprender sobre ecosistemas mobile (XCode, Android Studio).</li>
        <li>La arquitectura "Bridge" está siendo reemplazada por JSI (comunicación directa en C++), haciendo RN más rápido que nunca.</li>
      </ul>
    `
  },
  {
    id: 'guia-estadistica-data-analyst',
    title: 'Guía de Estadística para Data Analyst',
    excerpt: '45 conceptos con ejemplos reales — todo lo que usé en el análisis de FitNess App',
    category: 'Data Science',
    readTime: 15,
    date: '2026-04-12',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['Statistics', 'Data Science', 'Analytics', 'FitNess'],
    featured: true,
    slug: 'statistics-guide-data-analyst',
    content: `
      <h2>Cómo usar esta guía</h2>
      <p>Organizada en 7 bloques temáticos. Cada concepto tiene cuatro secciones: qué es, cuándo usarlo, un ejemplo real y cómo aparece en entrevistas. Estudiá 5 conceptos por sesión — leé, cerrá, explicá en voz alta.</p>
      <p><em>Todos los conceptos marcados con ⚡ fueron aplicados directamente en el análisis de retención de FitNess App.</em></p>

      <h2>Bloque 1 — Exploración de Datos (EDA)</h2>

      <h3>Media (Promedio)</h3>
      <p>La suma de todos los valores dividida por la cantidad de valores. El 'centro' de los datos. Usala cuando querés resumir un conjunto de datos numéricos en un único valor representativo.</p>
      <p><strong>Ejemplo real:</strong> Tu ticket promedio de cliente es $4.200. Eso es la media de todos los tickets del mes.</p>

      <h3>Mediana</h3>
      <p>El valor central de un conjunto ordenado. La mitad de los datos está por encima, la mitad por debajo. Más robusta que la media cuando hay outliers.</p>
      <p><strong>Ejemplo real:</strong> 9 empleados ganan $100K y 1 gana $1M — el promedio es $190K pero la mediana es $100K. La mediana refleja mejor la realidad.</p>

      <h3>Moda</h3>
      <p>El valor que aparece con más frecuencia. Útil para datos categóricos.</p>
      <p><strong>Ejemplo real:</strong> El plan de suscripción más elegido por los usuarios es el mensual. Esa es la moda.</p>

      <h3>Varianza y Desviación Estándar</h3>
      <p>Miden qué tan dispersos están los datos alrededor de la media. Alta desviación indica datos dispersos, comportamiento impredecible.</p>
      <p><strong>Ejemplo real:</strong> Tiempo promedio en la app: 30 min, desviación: 2 min → usuarios muy consistentes. Desviación de 15 min → comportamiento muy variable.</p>

      <h3>Rango</h3>
      <p>Diferencia entre el valor máximo y el mínimo. Primera mirada rápida a la dispersión.</p>

      <h3>Percentiles y Cuartiles</h3>
      <p>Dividen los datos ordenados en 100 partes iguales (percentiles) o 4 partes iguales (Q1=25%, Q2=50%, Q3=75%).</p>
      <p><strong>Ejemplo real:</strong> Si el gasto en el percentil 90 es $500, el 90% de los clientes gasta menos de $500. Útil para identificar clientes de alto valor.</p>

      <h3>Histograma</h3>
      <p>Gráfico de barras que muestra la distribución de frecuencias de una variable numérica continua. Primera herramienta de EDA.</p>

      <h3>Boxplot (Diagrama de Caja y Bigotes)</h3>
      <p>Visualización que muestra mediana, Q1, Q3 y outliers en un solo gráfico. Ideal para comparar distribuciones entre grupos.</p>

      <h3>Outliers (Valores Atípicos) ⚡</h3>
      <p>Valores que difieren significativamente del resto. En el análisis de FitNess App se detectaron 10.432 registros con ruido de 11.600 totales — 89% de outliers que invalidaban el dataset original. La auditoría de integridad redujo el dataset a 1.168 registros válidos.</p>

      <h2>Bloque 2 — Forma de la Distribución</h2>

      <h3>Distribución Normal</h3>
      <p>Distribución simétrica en forma de campana. El 68% de los datos cae dentro de ±1 desviación, el 95% dentro de ±2, el 99,7% dentro de ±3. Base del 80% de los tests estadísticos.</p>

      <h3>Curtosis: Leptocúrtica</h3>
      <p>Distribución con pico alto y colas pesadas. Comportamiento típico con eventos extremos ocasionales.</p>

      <h3>Curtosis: Mesocúrtica</h3>
      <p>La distribución normal estándar. Comportamiento equilibrado y predecible.</p>

      <h3>Curtosis: Platicúrtica</h3>
      <p>Distribución plana. Datos muy dispersos sin un valor típico claro — necesitás segmentar antes de sacar conclusiones.</p>

      <h3>Asimetría Positiva y Negativa</h3>
      <p>Positiva: cola larga hacia la derecha (pocos valores muy altos). Negativa: cola hacia la izquierda. Los ingresos de usuarios suelen tener asimetría positiva — la mayoría gana poco, pocos ganan mucho. Usá mediana en vez de media.</p>

      <h2>Bloque 3 — Relaciones Entre Variables</h2>

      <h3>Correlación de Pearson</h3>
      <p>Mide la fuerza y dirección de la relación lineal entre dos variables numéricas. Va de -1 a +1.</p>
      <p><strong>Ejemplo real:</strong> r=0,85 entre horas de ejercicio y retención de usuarios. Más ejercicio, menos abandono.</p>

      <h3>Diagrama de Dispersión</h3>
      <p>Gráfico que muestra la relación entre dos variables numéricas. Siempre visualizá antes de calcular correlación.</p>

      <h3>Regresión Lineal</h3>
      <p>Modela la relación entre una variable dependiente (Y) y una o más variables independientes (X). Para predecir valores numéricos.</p>

      <h3>Regresión Logística ⚡</h3>
      <p>Predice la probabilidad de que ocurra un evento binario (Sí/No). En FitNess App se usó conceptualmente para identificar perfiles de riesgo de churn (abandono = 1, retención = 0).</p>

      <h3>Chi-cuadrado</h3>
      <p>Test para variables categóricas. Evalúa si existe asociación entre dos categorías. Ejemplo: ¿el género influye en el plan elegido?</p>

      <h2>Bloque 4 — Comparación de Grupos</h2>

      <h3>T-test de Student</h3>
      <p>Compara si la media de una variable numérica es significativamente diferente entre dos grupos.</p>

      <h3>ANOVA</h3>
      <p>Extiende el t-test a tres o más grupos. Detecta si al menos un grupo es significativamente diferente.</p>

      <h3>Hipótesis Nula (H₀) y Alternativa (H₁) ⚡</h3>
      <p>H₀: no hay diferencia real. H₁: sí hay diferencia. En FitNess App: H₀ = las actividades HIIT y Fuerza no retienen más usuarios. H₁ = sí lo hacen. Los datos rechazaron H₀ con p &lt; 0,05.</p>

      <h3>P-valor y Nivel de Significancia ⚡</h3>
      <p>El p-valor es la probabilidad de ver tus datos si H₀ fuera verdadera. Estándar: p &lt; 0,05. En el análisis de retención, se validó estadísticamente que HIIT y Fuerza son drivers de retención con p &lt; 0,05.</p>

      <h3>Intervalo de Confianza</h3>
      <p>Rango de valores dentro del cual cae el parámetro poblacional verdadero con cierta probabilidad (usualmente 95%). No digas solo "el promedio es X" — decí "el promedio es X con IC95% [min, max]".</p>

      <h2>Bloque 5 — Muestreo e Inferencia</h2>

      <h3>Población vs Muestra ⚡</h3>
      <p>En FitNess App el dataset original tenía 11.600 registros pero solo 1.168 eran válidos (10%). El análisis se realizó sobre esa muestra representativa tras la auditoría ETL.</p>

      <h3>Teorema Central del Límite (TCL)</h3>
      <p>Con muestras de tamaño n≥30, la distribución de sus medias sigue una distribución normal independientemente de la distribución original. Justifica usar tests normales con datos no normales.</p>

      <h3>Muestreo Aleatorio y Estratificado</h3>
      <p>Estratificado: dividís en grupos y muestreás proporcionalmente. Útil cuando querés representar subgrupos importantes (por edad, plan, región).</p>

      <h2>Bloque 6 — Proceso de Análisis</h2>

      <h3>EDA (Análisis Exploratorio) ⚡</h3>
      <p>Primera fase de cualquier análisis. En FitNess App: exploración del dataset crudo, detección de inconsistencias (89% de registros corruptos), análisis de distribución de actividades y sesiones por usuario.</p>

      <h3>ETL (Extraer, Transformar, Cargar) ⚡</h3>
      <p>En FitNess App: extracción del CSV crudo → detección de 10.432 registros inconsistentes → limpieza y consolidación de 1.168 registros válidos → análisis de métricas DAU/MAU y Sticky Factor.</p>

      <h3>Auditoría de Integridad Referencial ⚡</h3>
      <p>Verificación sistemática de que los datos cumplen reglas de consistencia: IDs únicos, rangos válidos, relaciones entre campos. En FitNess App se aplicó a 11.600 registros y se encontró que el 89% tenía datos corruptos o inconsistentes.</p>

      <h3>Valores Nulos y Limpieza de Datos ⚡</h3>
      <p>En FitNess App los nulos y valores fuera de rango fueron la principal causa de los 10.432 registros descartados. La regla: nunca imputar cuando el nulo tiene significado de negocio.</p>

      <h3>Normalización y Estandarización ⚡</h3>
      <p>Antes de K-Means, las variables fueron estandarizadas (frecuencia de uso, tipo de actividad, días activos) con z-score para que ninguna variable dominara el clustering por su escala.</p>

      <h2>Bloque 7 — Machine Learning Básico</h2>

      <h3>K-Means Clustering ⚡</h3>
      <p>Algoritmo que agrupa datos en k clusters minimizando la distancia al centroide. En FitNess App se aplicó a 1.168 usuarios válidos para segmentar perfiles de riesgo de churn. Se identificaron tres perfiles: alta retención (HIIT/Fuerza), riesgo medio, y alto riesgo de abandono.</p>

      <h3>Método del Codo ⚡</h3>
      <p>Técnica para elegir el número óptimo de clusters k. En FitNess App se graficó la inercia para k=2 a k=6 y el codo apareció en k=3, justificando matemáticamente los tres segmentos.</p>

      <h3>Coeficiente de Variabilidad</h3>
      <p>Desviación estándar dividida por la media. Permite comparar la variabilidad entre conjuntos con diferentes escalas.</p>

      <h3>Tipos de Análisis: Descriptivo, Diagnóstico, Predictivo, Prescriptivo ⚡</h3>
      <p>El análisis de FitNess App cubrió los 4 niveles: <strong>Descriptivo</strong> (el churn es del 65%), <strong>Diagnóstico</strong> (la causa es la falla de activación el Día 0 y la baja frecuencia de HIIT/Fuerza), <strong>Predictivo</strong> (usuarios sin actividad HIIT en las primeras 2 semanas tienen 80% de probabilidad de abandono), <strong>Prescriptivo</strong> (programa de onboarding del Día 0 con sesión guiada de HIIT).</p>

      <h2>Conceptos adicionales del análisis de FitNess App</h2>

      <h3>Sticky Factor (DAU/MAU) ⚡</h3>
      <p>Métrica que mide el engagement real de la app: usuarios activos diarios dividido por usuarios activos mensuales. Un Sticky Factor del 20% significa que el usuario promedio usa la app 6 días por mes. En FitNess App se usó para identificar usuarios "sticky" (alta frecuencia) como referencia del comportamiento deseado.</p>

      <h3>Churn Rate ⚡</h3>
      <p>Porcentaje de usuarios que abandonan el servicio en un período. En FitNess App: churn inicial del 65%, objetivo de reducirlo al 45% mediante segmentación y estrategias de activación temprana.</p>

      <h3>Falla de Activación (Día 0) ⚡</h3>
      <p>Concepto de product analytics: el momento crítico donde el nuevo usuario no experimenta el valor del producto. En FitNess App se detectó que los usuarios sin sesión guiada en su primer día tenían 3 veces más probabilidad de abandono que los que sí la tenían.</p>

      <h3>DAU / MAU (Usuarios Activos Diarios / Mensuales) ⚡</h3>
      <p>Métricas de engagement estándar en productos digitales. DAU: usuarios activos únicos en un día. MAU: usuarios activos únicos en un mes. La relación DAU/MAU define el Sticky Factor.</p>

      <h2>Tabla de decisión rápida</h2>
      <table>
        <thead>
          <tr><th>Pregunta de Negocio</th><th>Tipo de Variable</th><th>Herramienta</th></tr>
        </thead>
        <tbody>
          <tr><td>¿Cuánto ganan en promedio nuestros usuarios?</td><td>Numérica, 1 grupo</td><td>Media / Mediana</td></tr>
          <tr><td>¿Qué plan eligen más?</td><td>Categórica, 1 variable</td><td>Moda / Frecuencia</td></tr>
          <tr><td>¿Más marketing, más ventas?</td><td>2 variables numéricas</td><td>Correlación + Regresión</td></tr>
          <tr><td>¿Diferencia entre grupo A y B?</td><td>Numérica, 2 grupos</td><td>t-test</td></tr>
          <tr><td>¿Diferencia entre A, B y C?</td><td>Numérica, 3+ grupos</td><td>ANOVA</td></tr>
          <tr><td>¿El género influye en el plan elegido?</td><td>2 variables categóricas</td><td>Chi-cuadrado</td></tr>
          <tr><td>¿Quién va a hacer churn?</td><td>Variable dependiente binaria</td><td>Regresión logística</td></tr>
          <tr><td>¿Cómo segmento mis usuarios?</td><td>Sin etiquetas previas</td><td>K-Means</td></tr>
          <tr><td>¿Esta diferencia es real o casualidad?</td><td>Cualquiera</td><td>P-valor + Hipótesis</td></tr>
          <tr><td>¿Cuál fue mi tasa de abandono?</td><td>Usuarios activos</td><td>Churn Rate + DAU/MAU</td></tr>
        </tbody>
      </table>
    `
  }
];

export const featuredPosts = blogPosts.filter(post => post.featured);

// Cálculo dinámico de categorías
export const categories = [
  { id: 'all', label: 'Todos', count: blogPosts.length },
  ...Array.from(new Set(blogPosts.map(post => post.category))).map(cat => ({
    id: cat.toLowerCase().replace(/\s+/g, '-'),
    label: cat,
    count: blogPosts.filter(post => post.category === cat).length
  }))
];

export default blogPosts;
