// src/features/blog/data/blogData.js
// Datos de artículos del blog

export const blogPosts = [
  {
    id: 'python-data-analytics-guide',
    title: 'Python para Data Analytics: Guía de supervivencia',
    excerpt: 'Domina las herramientas esenciales de pandas y numpy para convertir datos crudos en insights accionables.',
    category: 'Data Engineering',
    readTime: 12,
    date: '2025-01-05',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    tags: ['Python', 'Pandas', 'KPIs', 'Analytics'],
    featured: true,
    slug: 'python-para-data-analytics-guia',
    content: `
      <h2>Introducción al Análisis de Datos Moderno</h2>
      <p>En la era del Big Data, <strong>Python</strong> se ha consolidado como el lenguaje franco de la ciencia de datos. Su simplicidad sintáctica combinada con la potencia bruta de librerías optimizadas en C y Fortran lo hacen imbatible. Para un analista de datos moderno, no es solo un lenguaje, es una navaja suiza capaz de todo: desde la limpieza de terabytes de logs hasta la automatización de reportes ejecutivos.</p>
      
      <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2676&auto=format&fit=crop" alt="Data Analytics Dashboard" class="w-full h-64 object-cover rounded-xl my-8 shadow-lg" loading="lazy" decoding="async" />

      <p>En este artículo, nos centraremos en el ecosistema <strong>Pandas</strong> y <strong>Numpy</strong>, las piedras angulares de cualquier pipeline de datos, y cómo utilizarlos para extraer valor real del caos de información.</p>

      <h2>Funciones Esenciales de Pandas y Numpy</h2>
      <p>Tras analizar cientos de scripts en producción, he llegado a la conclusión de que dominar estas tres funciones te permitirá resolver el 80% de tus problemas diarios de manipulación de datos:</p>
      <ul>
        <li><strong>describe()</strong>: Tu primer contacto con el dataset. Ofrece un resumen estadístico inmediato (media, desviación estándar, cuartiles).</li>
        <li><strong>groupby()</strong>: La herramienta definitiva para segmentación. Fundamental para análisis de cohortes y agregaciones complejas.</li>
        <li><strong>std()</strong> (Numpy): Calcular la desviación estándar es crucial para entender la volatilidad y detectar anomalías estadísticas que podrían sesgar tu modelo.</li>
      </ul>

      <h3>Implementación Práctica</h3>
      <p>Para analizar un dataset de ventas y detectar productos de bajo rendimiento pero alta volatilidad, utilizamos las siguientes funciones clave:</p>

      <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 my-6">
        <h4 class="font-bold text-slate-900 dark:text-white mb-4">🔧 Funciones Esenciales</h4>
        <ul class="space-y-3 text-slate-700 dark:text-slate-300">
          <li><strong class="text-primary">pd.read_csv()</strong> — Carga datos desde archivos CSV</li>
          <li><strong class="text-primary">df.groupby()</strong> — Agrupa datos por categoría para análisis de cohortes</li>
          <li><strong class="text-primary">.agg()</strong> — Aplica múltiples funciones de agregación (sum, mean, std)</li>
          <li><strong class="text-primary">np.std</strong> — Calcula desviación estándar para detectar volatilidad</li>
          <li><strong class="text-primary">.reset_index()</strong> — Convierte el índice agrupado en columnas normales</li>
        </ul>
        <p class="mt-4 text-sm text-slate-600 dark:text-slate-400 italic">💡 Tip: Filtra productos con margen < 15% para identificar oportunidades de optimización</p>
      </div>

      <h2>El Ciclo de Vida del Análisis</h2>
      <p>Un flujo de trabajo profesional no es lineal, pero sigue pasos rigurosos para asegurar la integridad de los insights:</p>
      <ol>
        <li><strong>Limpieza (Cleaning)</strong>: El 60% del tiempo. Manejo de valores nulos (<code>fillna</code>, <code>dropna</code>) y corrección de tipos de datos que a menudo llegan corruptos desde la fuente.</li>
        <li><strong>EDA (Exploratory Data Analysis)</strong>: Visualización preliminar y detección de patrones usando histogramas y diagramas de dispersión.</li>
        <li><strong>Feature Engineering</strong>: Transformar datos crudos en variables significativas para el negocio.</li>
        <li><strong>Modelado</strong>: Aplicación de algoritmos estadísticos o de Machine Learning.</li>
      </ol>

      <h2>KPIs Críticos para el Negocio</h2>
      <p>Al final del día, los líderes de negocio no consumen código, consumen métricas. Tu trabajo es traducir bits en dinero o eficiencia. Céntrate en calcular:</p>
      <ul>
        <li><strong>ROI (Retorno de Inversión)</strong>: (Beneficio Neto / Costo) * 100. La métrica reina.</li>
        <li><strong>Tasa de Conversión</strong>: Porcentaje de usuarios que realizan una acción deseada. Vital para producto.</li>
        <li><strong>Churn Rate</strong>: Tasa de cancelación de clientes. En modelos SaaS, reducir el Churn es más rentable que adquirir nuevos usuarios.</li>
      </ul>

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h2>Key Takeaways</h2>
      <ul>
        <li>Python es la herramienta, pero el <strong>pensamiento estadístico</strong> es la habilidad clave.</li>
        <li>No subestimes el poder de un simple <code>groupby()</code> para encontrar patrones ocultos.</li>
        <li>Limpia tus datos obsesivamente; <em>Garbage In, Garbage Out</em>.</li>
        <li>Comunica tus hallazgos en el lenguaje del negocio (KPIs), no en el del programador (Funciones).</li>
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
    image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2670&auto=format&fit=crop',
    tags: ['Visualización', 'Estadística', 'Pareto', 'DataViz'],
    featured: true,
    slug: 'interpretacion-graficos-principio-pareto',
    content: `
      <h2>Visualización Efectiva de Datos</h2>
      <p>El cerebro humano procesa imágenes 60,000 veces más rápido que texto. Una visualización vale más que mil tablas, pero elegir el gráfico correcto es la diferencia entre confundir a tu audiencia con "ruido visual" o persuadirla con datos claros. En performance web y análisis de sistemas, la visualización es nuestra principal herramienta de diagnóstico.</p>

      <img src="https://images.unsplash.com/photo-1543286386-713df548e9cc?q=80&w=2670&auto=format&fit=crop" alt="Analysis Charts on Tablet" class="w-full h-64 object-cover rounded-xl my-8 shadow-lg" loading="lazy" decoding="async" />

      <h2>Herramientas de Diagnóstico Visual</h2>
      <p>Existen cientos de tipos de gráficos, pero estos tres son los caballos de batalla del análisis estadístico:</p>
      <ul>
        <li><strong>Histogramas</strong>: Ideales para ver la distribución de una variable numérica. ¿Tus tiempos de respuesta del servidor siguen una curva normal o tienen una cola larga (long tail)?</li>
        <li><strong>Boxplots (Diagramas de Caja)</strong>: Perfectos para comparar distribuciones entre grupos y detectar <em>outliers</em> (valores atípicos) de un vistazo. Indispensable para comparar rendimiento entre versiones de una APP.</li>
        <li><strong>Scatter Plots (Diagramas de Dispersión)</strong>: La mejor opción para visualizar la correlación entre dos variables continuas. ¿Aumenta el uso de CPU linealmente con las peticiones por segundo?</li>
      </ul>

      <h2>El Diagrama de Pareto: La Regla 80/20</h2>
      <p>El principio de Pareto, formulado por Vilfredo Pareto, establece que, a menudo, el 80% de los efectos provienen del 20% de las causas. En ingeniería de software, esto es una ley universal:</p>
      <blockquote>
        El 80% de los errores de software son causados por el 20% de los bugs. El 80% del tráfico es manejado por el 20% del código.
      </blockquote>
      <p>Un Diagrama de Pareto combina un gráfico de barras (causas individuales ordenadas por frecuencia) con una línea acumulativa (porcentaje total). Úsalo para priorizar qué <em>bugs</em> arreglar primero o qué endpoints optimizar para obtener el mayor impacto con el menor esfuerzo.</p>

      <h3>Ejemplo en Optimización Web</h3>
      <p>Al analizar los tiempos de carga de un sitio, típicamente descubrimos que el 80% del problema proviene del 20% de las causas:</p>
      
      <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 my-6">
        <h4 class="font-bold text-slate-900 dark:text-white mb-4">⏱️ Causas de Lentitud (Segundos Acumulados)</h4>
        <ul class="space-y-2 text-slate-700 dark:text-slate-300">
          <li><strong class="text-red-400">Terceros (Ads/Analytics):</strong> 4.5s — <span class="text-sm italic">El 80% del problema</span></li>
          <li><strong class="text-amber-400">Imágenes sin optimizar:</strong> 0.8s</li>
          <li><strong class="text-green-400">Ejecución JS principal:</strong> 0.3s</li>
          <li><strong class="text-blue-400">Estilos CSS:</strong> 0.1s</li>
        </ul>
        <p class="mt-4 text-sm text-slate-600 dark:text-slate-400 italic">💡 Conclusión: Optimizar el JS principal te dará mejoras marginales. Atacar los scripts de terceros resolverá la mayor parte del problema.</p>
      </div>

      <h2>¿Barras o Líneas?</h2>
      <p>Una confusión común. La regla es simple:</p>
      <ul>
        <li>Usa <strong>Gráficos de Barras</strong> para comparar categorías discretas (ej. Ventas por País, Errores por Tipo).</li>
        <li>Usa <strong>Gráficos de Líneas</strong> exclusivamente para series temporales o tendencias continuas (ej. Evolución de usuarios por mes, Latencia a lo largo del tiempo).</li>
      </ul>

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h2>Key Takeaways</h2>
      <ul>
        <li>Prioriza siempre base en datos: Aplica Pareto para identificar dónde invertir tus recursos de ingeniería.</li>
        <li>El contexto importa: Un número sin comparación (benchmark o histórico) no dice nada.</li>
        <li>Simplifica: Elimina todo elemento gráfico que no aporte información (Chartjunk).</li>
      </ul>
    `
  },
  {
    id: 'react-vs-native-comparison',
    title: 'React vs React Native: La Comparativa Definitiva',
    excerpt: 'Analizamos las diferencias arquitecturales y de rendimiento para ayudarte a elegir el stack correcto para tu próximo proyecto.',
    category: 'Frontend',
    readTime: 12,
    date: '2024-12-28',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop',
    tags: ['React', 'React Native', 'Mobile', 'Web'],
    featured: false,
    slug: 'react-vs-react-native-comparativa',
    content: `
      <h2>Arquitectura y Fundamentos</h2>
      <p>Aunque comparten el mismo ADN (y el logo), React y React Native son bestias diferentes bajo el capó. Elegir entre una PWA (Progressive Web App) con React o una App Nativa con React Native es una de las decisiones más críticas al inicio de una startup.</p>
      
      <p><strong>React</strong> (para web) manipula el <em>DOM Virtual</em>, una representación en memoria de la UI, que finalmente se sincroniza con el DOM real del navegador. Es universal, accesible desde cualquier dispositivo con internet.</p>
      
      <p><strong>React Native</strong>, por el contrario, no usa HTML ni CSS. Utiliza un hilo de JavaScript que se comunica a través de un "puente" (Bridge) —o la nueva arquitectura JSI (JavaScript Interface)— para invocar componentes nativos reales de iOS (UIKit/SwiftUI) y Android (Android Views/Jetpack Compose). El resultado es una app que se siente, se ve y rinde como una nativa.</p>

      <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop" alt="Coding React Component" class="w-full h-64 object-cover rounded-xl my-8 shadow-lg" loading="lazy" decoding="async" />

      <h2>Tabla Comparativa Técnica</h2>
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
            <td class="p-3">Basada en URLs (React Router).</td>
            <td class="p-3">Basada en Stacks/Screens (React Navigation).</td>
          </tr>
          <tr class="border border-slate-700">
            <td class="p-3 font-semibold text-cobalt-300">Acceso Hardware</td>
            <td class="p-3">Limitado por Web APIs del navegador (Bluetooth, Geo).</td>
            <td class="p-3">Acceso total (Nativo) a sensores, cámara, AR, GPU.</td>
          </tr>
        </tbody>
      </table>
      </div>

      

      <h2>Conclusión</h2>
      <p>No hay un ganador absoluto, solo la herramienta correcta para el trabajo.</p>
      <ul>
        <li>Si necesitas <strong>SEO</strong>, distribución instantánea y bajos costos de adquisición: <strong>Web (React)</strong>.</li>
        <li>Si necesitas <strong>rendimiento nativo</strong>, notificaciones push fiables, acceso profundo a hardware y presencia en Stores: <strong>Mobile (React Native)</strong>.</li>
        <li>¿Lo mejor de ambos mundos? Investiga <strong>Expo Router</strong> y <strong>React Native Web</strong> para compartir hasta el 90% del código.</li>
      </ul>

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h2>Key Takeaways</h2>
      <ul>
        <li>React Native renderiza vistas nativas reales, no es una WebView (como Ionic/Cordova).</li>
        <li>La curva de aprendizaje es suave si ya conoces React, pero requiere aprender sobre los ecosistemas móviles (XCode, Android Studio).</li>
        <li>La arquitectura de "Bridge" está siendo reemplazada por JSI (comunicación directa C++), haciendo RN más rápido que nunca.</li>
      </ul>
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
