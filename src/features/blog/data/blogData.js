// src/features/blog/data/blogData.js
// Datos de artículos del blog

export const blogPosts = [
  {
    id: 'fitness-data-integrity-refactor',
    title: 'Data Integrity & ML: Saneando 11,600 registros con Python',
    excerpt: 'Cómo transformar un dataset con 89% de ruido en un motor de predicción de Churn veraz mediante técnicas de auditoría y clustering.',
    category: 'Data Science',
    readTime: 10,
    date: '2026-02-06',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    tags: ['Python', 'Clustering', 'ETL', 'Audit'],
    featured: true,
    slug: 'fitness-data-integrity-refactor',
    content: `
      <h2>El Desafío de la Integridad</h2>
      <p>En mi reciente refactorización del proyecto <strong>FitNess App</strong>, me encontré con un escenario común en la industria: un dataset masivo pero profundamente corrupto. De 11,600 registros, solo 1,168 cumplían con los estándares de integridad referencial.</p>
      
      <h3>Metodología Senior</h3>
      <p>Implementé un pipeline ETL que priorizó la <strong>veracidad</strong> sobre la cantidad. El resultado fue una reducción del ruido estadístico del 89%, permitiendo que el modelo de <strong>K-Means Clustering</strong> identificara perfiles de riesgo reales en lugar de artefactos de datos.</p>
      
      <h2>Insights de Negocio</h2>
      <p>El análisis reveló que el 45% de los usuarios abandonaba en el día 7 debido a una falla en el flujo de onboarding, no por falta de interés en el contenido de HIIT o Fuerza.</p>
    `
  },
  {
    id: 'python-data-analytics-guide',
    title: 'Python para Data Analytics: Guía de supervivencia',
    excerpt: 'Domina las herramientas esenciales de pandas y numpy para convertir datos crudos en insights accionables.',
    category: 'Data Engineering',
    readTime: 12,
    date: '2025-01-05',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
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

      <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" alt="Dashboard de análisis de datos" class="w-full h-64 object-cover rounded-xl my-8 shadow-lg" loading="lazy" decoding="async" />

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

      <hr class="my-8 border-slate-200 dark:border-slate-800" />

      <h3>El Arsenal Visual: 12 Gráficos para Contar Historias</h3>
      <p>Tener el mejor modelo predictivo no sirve de mucho si nadie entiende lo que dice. La visualización es el idioma que usamos para traducir matemáticas complejas a decisiones de negocio claras.</p>

      <p class="mb-4">Aquí tienes la caja de herramientas fundamental para que tus análisis no terminen olvidados en un cajón:</p>

      <ul class="list-disc pl-5 space-y-2 mb-8 text-slate-700 dark:text-slate-300">
        <li><strong>Barras</strong>: El clásico confiable. Úsalo para comparar cantidades entre categorías sin complicarte (A vs B).</li>
        <li><strong>Histograma</strong>: Para ver la "forma" de tus datos. ¿Es una campana de Gauss normal o hay algo raro?</li>
        <li><strong>Boxplot (Caja y Bigotes)</strong>: El detector de mentiras. Te enseña dónde están realmente los datos y expone a los outliers sin piedad.</li>
        <li><strong>Líneas</strong>: Imprescindible para ver el pasado y proyectar el futuro (series temporales).</li>
        <li><strong>Scatter Plot (Dispersión)</strong>: ¿Tienen relación estas dos variables o es pura coincidencia? Aquí lo ves claro.</li>
        <li><strong>Heatmap (Mapa de Calor)</strong>: Ideal para matrices de correlación. Donde está rojo intenso, hay una relación fuerte.</li>
        <li><strong>Barras Apiladas</strong>: Para ver el "todo" y sus "partes" al mismo tiempo. Útil para composiciones.</li>
        <li><strong>Pastel (Pie Chart)</strong>: Úsalo con mucha moderación. Los humanos somos malos comparando ángulos; úsalo solo para diferencias muy obvias.</li>
        <li><strong>Violin Plot</strong>: Como un Boxplot pero con más detalle sobre la densidad. Elegante, pero a veces confunde a quien no es técnico.</li>
        <li><strong>Pair Plot</strong>: Una vista de pájaro de todas las relaciones posibles entre tus variables a la vez.</li>
        <li><strong>Área</strong>: Similar al de líneas, pero enfatiza el volumen acumulado en el tiempo.</li>
        <li><strong>Tree Map</strong>: Perfecto para visualizar jerarquías y tamaños relativos de un vistazo.</li>
      </ul>

      <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 my-6">
        <h4 class="font-bold text-slate-900 dark:text-white mb-4">Consejo Pro</h4>
        <p class="text-slate-700 dark:text-slate-300">Antes de abrir Matplotlib, Seaborn o Tableau, pregúntate: <strong>"¿Qué quiero que vea la otra persona?"</strong>.</p>
        <p class="mt-4 text-slate-700 dark:text-slate-300">Si la respuesta no es clara, ningún gráfico te va a salvar. El objetivo de visualizar no es demostrar cuánto sabes de código, es reducir la carga cognitiva de quien te lee para que pueda tomar una decisión rápido.</p>
      </div>
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
  },
  {
    id: 'guia-estadistica-data-analyst',
    title: 'Guía de Estadística para Data Analyst',
    excerpt: '45 conceptos con ejemplos reales — todo lo que usé en el análisis de FitNess App',
    category: 'Data Science',
    readTime: 15,
    date: '2026-04-12',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['Estadística', 'Data Science', 'Analytics', 'FitNess'],
    featured: true,
    slug: 'guia-estadistica-data-analyst',
    content: `
      <h2>Cómo usar esta guía</h2>
      <p>Organizada en 7 bloques temáticos. Cada concepto tiene cuatro secciones: qué es, cuándo usarlo, un ejemplo real, y cómo aparece en entrevistas. Estudiá de a 5 conceptos por sesión — leé, cerrá, explicá en voz alta.</p>
      <p><em>Todos los conceptos marcados con ⚡ fueron aplicados directamente en el análisis de retención de FitNess App.</em></p>

      <h2>Bloque 1 — Exploración de Datos (EDA)</h2>

      <h3>Media (Promedio)</h3>
      <p>La suma de todos los valores dividida por la cantidad de valores. El 'centro' de los datos. Usalo cuando querés resumir un conjunto de datos numéricos en un solo valor representativo.</p>
      <p><strong>Ejemplo real:</strong> El ticket promedio de tus clientes es $4.200. Eso es la media de todos los tickets del mes.</p>

      <h3>Mediana</h3>
      <p>El valor central de un conjunto ordenado. La mitad de los datos queda por encima, la otra mitad por debajo. Más robusta que la media cuando hay outliers.</p>
      <p><strong>Ejemplo real:</strong> 9 empleados ganan $100K y 1 gana $1M — el promedio es $190K pero la mediana es $100K. La mediana refleja mejor la realidad.</p>

      <h3>Moda</h3>
      <p>El valor que aparece con mayor frecuencia. Útil para datos categóricos.</p>
      <p><strong>Ejemplo real:</strong> El plan de suscripción más elegido por los usuarios es el mensual. Eso es la moda.</p>

      <h3>Varianza y Desvío Estándar</h3>
      <p>Miden qué tan dispersos están los datos alrededor de la media. Un desvío alto indica datos dispersos, comportamiento impredecible.</p>
      <p><strong>Ejemplo real:</strong> Promedio de tiempo en app: 30 min, desvío: 2 min → usuarios muy consistentes. Desvío de 15 min → comportamiento muy variable.</p>

      <h3>Rango</h3>
      <p>Diferencia entre el valor máximo y mínimo. Primera mirada rápida a la dispersión.</p>

      <h3>Percentiles y Cuartiles</h3>
      <p>Dividen los datos ordenados en 100 partes iguales (percentiles) o 4 partes iguales (Q1=25%, Q2=50%, Q3=75%).</p>
      <p><strong>Ejemplo real:</strong> Si el gasto del percentil 90 es $500, el 90% de los clientes gasta menos de $500. Útil para identificar high-value customers.</p>

      <h3>Histograma</h3>
      <p>Gráfico de barras que muestra la distribución de frecuencias de una variable numérica continua. Primera herramienta del EDA.</p>

      <h3>Boxplot (Diagrama de caja y bigotes)</h3>
      <p>Visualización que muestra mediana, Q1, Q3 y outliers en un solo gráfico. Ideal para comparar distribuciones entre grupos.</p>

      <h3>Outliers (Valores atípicos) ⚡</h3>
      <p>Valores que se alejan significativamente del resto. En el análisis de FitNess App se detectaron 10.432 registros con ruido sobre 11.600 totales — un 89% de outliers que invalidaba el dataset original. La auditoría de integridad redujo el dataset a 1.168 registros válidos.</p>

      <h2>Bloque 2 — Forma de la Distribución</h2>

      <h3>Distribución Normal</h3>
      <p>Distribución simétrica en forma de campana. El 68% de los datos cae a ±1 desvío, el 95% a ±2, el 99.7% a ±3. Base del 80% de los tests estadísticos.</p>

      <h3>Curtosis: Leptocúrtica</h3>
      <p>Distribución con pico alto y colas pesadas. Comportamiento típico con eventos extremos ocasionales.</p>

      <h3>Curtosis: Mesocúrtica</h3>
      <p>La distribución normal estándar. Comportamiento equilibrado y predecible.</p>

      <h3>Curtosis: Platicúrtica</h3>
      <p>Distribución achatada. Datos muy dispersos sin un valor típico claro — necesitás segmentar antes de sacar conclusiones.</p>

      <h3>Asimetría positiva y negativa</h3>
      <p>Positiva: cola larga hacia la derecha (pocos valores muy altos). Negativa: cola hacia la izquierda. Los ingresos de usuarios suelen tener asimetría positiva — la mayoría gana poco, pocos ganan mucho. Usá mediana en lugar de media.</p>

      <h2>Bloque 3 — Relaciones entre Variables</h2>

      <h3>Correlación de Pearson</h3>
      <p>Mide la fuerza y dirección de la relación lineal entre dos variables numéricas. Va de -1 a +1.</p>
      <p><strong>Ejemplo real:</strong> r=0.85 entre horas de ejercicio y retención de usuarios. A más ejercicio, menos abandono.</p>

      <h3>Diagrama de dispersión</h3>
      <p>Gráfico que muestra la relación entre dos variables numéricas. Siempre visualizá antes de calcular correlación.</p>

      <h3>Regresión Lineal</h3>
      <p>Modela la relación entre una variable dependiente (Y) y una o más variables independientes (X). Para predecir valores numéricos.</p>

      <h3>Regresión Logística ⚡</h3>
      <p>Predice la probabilidad de que ocurra un evento binario (Sí/No). En FitNess App se usó conceptualmente para identificar perfiles de riesgo de churn (abandono = 1, retención = 0).</p>

      <h3>Chi-cuadrado</h3>
      <p>Test para variables categóricas. Evalúa si existe asociación entre dos categorías. Ejemplo: ¿el género influye en el plan elegido?</p>

      <h2>Bloque 4 — Comparación de Grupos</h2>

      <h3>Prueba t de Student</h3>
      <p>Compara si la media de una variable numérica es significativamente diferente entre dos grupos.</p>

      <h3>ANOVA</h3>
      <p>Extiende la prueba t a tres o más grupos. Detecta si al menos un grupo es significativamente diferente.</p>

      <h3>Hipótesis Nula (H₀) y Alternativa (H₁) ⚡</h3>
      <p>H₀: no hay diferencia real. H₁: sí hay diferencia. En FitNess App: H₀ = las actividades HIIT y Fuerza no retienen más usuarios. H₁ = sí retienen más. Los datos rechazaron H₀ con p &lt; 0.05.</p>

      <h3>P-value y Nivel de Significancia ⚡</h3>
      <p>El p-value es la probabilidad de ver tus datos si H₀ fuera verdadera. Estándar: p &lt; 0.05. En el análisis de retención se validó estadísticamente que HIIT y Fuerza son drivers de retención con p &lt; 0.05.</p>

      <h3>Intervalo de Confianza</h3>
      <p>Rango de valores dentro del cual el verdadero parámetro poblacional cae con cierta probabilidad (generalmente 95%). No digas solo "el promedio es X" — decí "el promedio es X con IC95% [min, max]".</p>

      <h2>Bloque 5 — Muestreo e Inferencia</h2>

      <h3>Población vs Muestra ⚡</h3>
      <p>En FitNess App el dataset original tenía 11.600 registros pero solo 1.168 eran válidos (10%). El análisis se hizo sobre esa muestra representativa después de la auditoría ETL.</p>

      <h3>Teorema Central del Límite (TCL)</h3>
      <p>Con muestras de tamaño n≥30, la distribución de sus medias sigue una distribución normal sin importar la distribución original. Justifica usar tests normales con datos no normales.</p>

      <h3>Muestreo Aleatorio y Estratificado</h3>
      <p>Estratificado: dividís en grupos y muestreás proporcionalmente. Útil cuando querés representar subgrupos importantes (por edad, plan, región).</p>

      <h2>Bloque 6 — Proceso de Análisis</h2>

      <h3>EDA (Análisis Exploratorio) ⚡</h3>
      <p>Primera fase de cualquier análisis. En FitNess App: exploración del dataset crudo, detección de inconsistencias (89% de registros corruptos), análisis de distribución de actividades y sesiones por usuario.</p>

      <h3>ETL (Extract, Transform, Load) ⚡</h3>
      <p>En FitNess App: extracción del CSV crudo → detección de 10.432 registros inconsistentes → saneamiento y consolidación de 1.168 registros válidos → análisis de métricas DAU/MAU y Sticky Factor.</p>

      <h3>Auditoría de Integridad Referencial ⚡</h3>
      <p>Verificación sistemática de que los datos cumplen reglas de consistencia: IDs únicos, rangos válidos, relaciones entre campos. En FitNess App se aplicó sobre 11.600 registros y se detectó que el 89% tenía datos corruptos o inconsistentes.</p>

      <h3>Valores Nulos y Limpieza de Datos ⚡</h3>
      <p>En FitNess App los nulos y valores fuera de rango fueron la causa principal de los 10.432 registros descartados. La regla: nunca imputar cuando el nulo tiene significado de negocio.</p>

      <h3>Normalización y Estandarización ⚡</h3>
      <p>Antes de K-Means se estandarizaron las variables (frecuencia de uso, tipo de actividad, días activos) con z-score para que ninguna variable dominara el clustering por su escala.</p>

      <h2>Bloque 7 — Machine Learning Básico</h2>

      <h3>Clustering K-Means ⚡</h3>
      <p>Algoritmo que agrupa datos en k clusters minimizando la distancia al centroide. En FitNess App se aplicó sobre 1.168 usuarios válidos para segmentar perfiles de riesgo de churn. Se identificaron 3 perfiles: alta retención (HIIT/Fuerza), riesgo medio y alto riesgo de abandono.</p>

      <h3>Método del Codo ⚡</h3>
      <p>Técnica para elegir el número óptimo de clusters k. En FitNess App se graficó la inercia para k=2 a k=6 y el codo apareció en k=3, justificando matemáticamente los tres segmentos.</p>

      <h3>Coeficiente de Variabilidad</h3>
      <p>Desvío estándar dividido por la media. Permite comparar variabilidad entre conjuntos con distintas escalas.</p>

      <h3>Tipos de análisis: Descriptivo, Diagnóstico, Predictivo, Prescriptivo ⚡</h3>
      <p>El análisis de FitNess App cubrió los 4 niveles: <strong>Descriptivo</strong> (el churn es del 65%), <strong>Diagnóstico</strong> (la causa es la falla de activación en Día 0 y baja frecuencia de HIIT/Fuerza), <strong>Predictivo</strong> (usuarios sin actividad HIIT en primeras 2 semanas tienen 80% de probabilidad de abandono), <strong>Prescriptivo</strong> (programa de onboarding con sesión guiada de HIIT en Día 0).</p>

      <h2>Conceptos adicionales del análisis FitNess App</h2>

      <h3>Sticky Factor (DAU/MAU) ⚡</h3>
      <p>Métrica que mide el engagement real de una app: usuarios activos diarios dividido usuarios activos mensuales. Un Sticky Factor del 20% significa que el usuario promedio usa la app 6 días por mes. En FitNess App se usó para identificar el segmento de usuarios "pegados" (alta frecuencia) como referencia del comportamiento deseado.</p>

      <h3>Churn Rate ⚡</h3>
      <p>Porcentaje de usuarios que abandonan el servicio en un período. En FitNess App: churn inicial del 65%, objetivo reducirlo al 45% mediante segmentación y estrategias de activación temprana.</p>

      <h3>Falla de Activación (Día 0) ⚡</h3>
      <p>Concepto de product analytics: el momento crítico donde el usuario nuevo no experimenta el valor del producto. En FitNess App se detectó que usuarios sin sesión guiada en su primer día tenían probabilidad de abandono 3x mayor que los que sí la tenían.</p>

      <h3>DAU / MAU (Daily / Monthly Active Users) ⚡</h3>
      <p>Métricas estándar de engagement en productos digitales. DAU: usuarios únicos activos en un día. MAU: usuarios únicos activos en un mes. La relación DAU/MAU define el Sticky Factor.</p>

      <h2>Tabla de decisión rápida</h2>
      <table>
        <thead>
          <tr><th>Pregunta de negocio</th><th>Tipo de variable</th><th>Herramienta</th></tr>
        </thead>
        <tbody>
          <tr><td>¿Cuánto ganan nuestros usuarios en promedio?</td><td>Numérica, 1 grupo</td><td>Media / Mediana</td></tr>
          <tr><td>¿Qué plan eligen más?</td><td>Categórica, 1 variable</td><td>Moda / Frecuencia</td></tr>
          <tr><td>¿A más marketing, más ventas?</td><td>2 variables numéricas</td><td>Correlación + Regresión</td></tr>
          <tr><td>¿Diferencia entre grupo A y B?</td><td>Numérica, 2 grupos</td><td>Prueba t</td></tr>
          <tr><td>¿Diferencia entre A, B y C?</td><td>Numérica, 3+ grupos</td><td>ANOVA</td></tr>
          <tr><td>¿Género influye en el plan elegido?</td><td>2 variables categóricas</td><td>Chi-cuadrado</td></tr>
          <tr><td>¿Quién va a hacer churn?</td><td>Variable dependiente binaria</td><td>Regresión logística</td></tr>
          <tr><td>¿Cómo segmento mis usuarios?</td><td>Sin etiquetas previas</td><td>K-Means</td></tr>
          <tr><td>¿Esta diferencia es real o azar?</td><td>Cualquiera</td><td>P-value + Hipótesis</td></tr>
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
