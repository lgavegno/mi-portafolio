// src/features/blog/data/blogData.js
// Datos de artículos del blog

export const blogPosts = [
  {
    id: 'python-data-analytics-guide',
    title: 'Python para Data Analytics: Guía de supervivencia',
    excerpt: 'Domina las herramientas esenciales de pandas y numpy para convertir datos crudos en insights accionables.',
    category: 'Data Engineering',
    readTime: 10,
    date: '2025-01-05',
    image: null,
    tags: ['Python', 'Pandas', 'KPIs', 'Analytics'],
    featured: true,
    slug: 'python-para-data-analytics-guia',
    content: `
      <h2>Introducción al Análisis de Datos Moderno</h2>
      <p>Para un analista de datos, Python no es solo un lenguaje, es una navaja suiza. En este artículo, nos centraremos en el ecosistema <strong>Pandas</strong> y <strong>Numpy</strong>, las piedras angulares de cualquier pipeline de datos.</p>

      <h3>Funciones Esenciales de Pandas y Numpy</h3>
      <p>Dominar estas tres funciones te permitirá resolver el 80% de tus problemas diarios:</p>
      <ul>
        <li><strong>describe()</strong>: Tu primer contacto con el dataset. Ofrece un resumen estadístico inmediato (media, desviación estándar, cuartiles).</li>
        <li><strong>groupby()</strong>: La herramienta definitiva para segmentación de datos. Fundamental para análisis de cohortes.</li>
        <li><strong>std()</strong> (Numpy): Calcular la desviación estándar es crucial para entender la volatilidad y detectar anomalías.</li>
      </ul>

      <h3>El Ciclo de Vida del Análisis</h3>
      <p>Un flujo de trabajo profesional sigue estos pasos rigurosos:</p>
      <ol>
        <li><strong>Limpieza (Cleaning)</strong>: Manejo de valores nulos (<code>fillna</code>, <code>dropna</code>) y corrección de tipos de datos.</li>
        <li><strong>EDA (Exploratory Data Analysis)</strong>: Visualización preliminar y detección de patrones.</li>
        <li><strong>Modelado</strong>: Aplicación de algoritmos estadísticos o de Machine Learning.</li>
      </ol>

      <h3>KPIs Críticos para el Negocio</h3>
      <p>Al final del día, los datos deben hablar el lenguaje del negocio. Céntrate en calcular:</p>
      <ul>
        <li><strong>ROI (Retorno de Inversión)</strong>: (Beneficio Neto / Costo) * 100.</li>
        <li><strong>Tasa de Conversión</strong>: Porcentaje de usuarios que realizan una acción deseada.</li>
        <li><strong>Churn Rate</strong>: Tasa de cancelación de clientes, vital para modelos de suscripción.</li>
      </ul>
    `
  },
  {
    id: 'estadistica-pareto-viz',
    title: 'Interpretación de Gráficos Estadísticos y Principio de Pareto',
    excerpt: 'Cómo utilizar la visualización de datos para identificar el 20% de las causas que generan el 80% de los problemas.',
    category: 'Performance',
    readTime: 8,
    date: '2025-01-02',
    image: null,
    tags: ['Visualización', 'Estadística', 'Pareto', 'DataViz'],
    featured: true,
    slug: 'interpretacion-graficos-principio-pareto',
    content: `
      <h2>Visualización Efectiva de Datos</h2>
      <p>Una visualización vale más que mil tablas. Elegir el gráfico correcto es la diferencia entre confundir a tu audiencia o persuadirla.</p>

      <h3>Herramientas de Diagnóstico Visual</h3>
      <ul>
        <li><strong>Histogramas</strong>: Ideales para ver la distribución de una variable numérica. ¿Tus datos siguen una curva normal?</li>
        <li><strong>Boxplots (Diagramas de Caja)</strong>: Perfectos para comparar distribuciones entre grupos y detectar <em>outliers</em> (valores atípicos) de un vistazo.</li>
        <li><strong>Scatter Plots (Diagramas de Dispersión)</strong>: La mejor opción para visualizar la correlación entre dos variables continuas.</li>
      </ul>

      <h3>El Diagrama de Pareto: La Regla 80/20</h3>
      <p>El principio de Pareto establece que, a menudo, el 80% de los efectos provienen del 20% de las causas. En ingeniería de software y negocios, esto es vital.</p>
      <p>Un Diagrama de Pareto combina un gráfico de barras (causas individuales) con una línea acumulativa (porcentaje total). Úsalo para priorizar qué <em>bugs</em> arreglar primero o qué productos optimizar.</p>

      <h3>¿Barras o Líneas?</h3>
      <p>Usa <strong>Gráficos de Barras</strong> para comparar categorías discretas (ej. Ventas por País). Usa <strong>Gráficos de Líneas</strong> exclusivamente para series temporales o tendencias continuas (ej. Evolución de usuarios por mes).</p>
    `
  },
  {
    id: 'react-vs-native-comparison',
    title: 'React vs React Native: La Comparativa Definitiva',
    excerpt: 'Analizamos las diferencias arquitecturales y de rendimiento para ayudarte a elegir el stack correcto para tu próximo proyecto.',
    category: 'Frontend',
    readTime: 12,
    date: '2024-12-28',
    image: null,
    tags: ['React', 'React Native', 'Mobile', 'Web'],
    featured: false,
    slug: 'react-vs-react-native-comparativa',
    content: `
      <h2>Arquitectura y Fundamentos</h2>
      <p>Aunque comparten el mismo ADN (y el logo), React y React Native son bestias diferentes bajo el capó.</p>
      <p><strong>React</strong> (para web) manipula el <em>DOM Virtual</em> que finalmente se renderiza como HTML y CSS en el navegador. <strong>React Native</strong>, por el contrario, utiliza un hilo de JavaScript que se comunica a través de un "puente" (Bridge) o la nueva arquitectura (JSI) para invocar componentes nativos reales de iOS y Android.</p>

      <h3>Tabla Comparativa Técnica</h3>
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
            <td class="p-3">StyleSheet (subset de Flexbox similar a CSS).</td>
          </tr>
          <tr class="border border-slate-700">
            <td class="p-3 font-semibold text-cobalt-300">Navegación</td>
            <td class="p-3">Basada en URLs (React Router).</td>
            <td class="p-3">Basada en Stacks/Screens (React Navigation).</td>
          </tr>
          <tr class="border border-slate-700">
            <td class="p-3 font-semibold text-cobalt-300">Acceso Hardware</td>
            <td class="p-3">Limitado por Web APIs del navegador.</td>
            <td class="p-3">Acceso total a sensores, cámara, GPS, etc.</td>
          </tr>
        </tbody>
      </table>

      <h3>Conclusión</h3>
      <p>Si necesitas SEO y alcance universal, elige React. Si necesitas rendimiento nativo y acceso profundo al dispositivo, React Native es el camino.</p>
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
