export default {
  header: {
    eyebrow: 'Experiencia técnica',
    title: 'Implementaciones Odoo y sistemas de gestión',
    intro:
      'Trabajo como desarrollador e implementador para distintos clientes a través de una consultora IT. Por confidencialidad no se nombran clientes ni se exponen datos operativos reales — lo que sigue es el criterio técnico detrás de cada proyecto.',
  },
  toolGroups: [
    {
      group: 'Análisis y ETL',
      tools: ['Python', 'Jupyter Notebook', 'pandas', 'SQL / PostgreSQL'],
    },
    {
      group: 'ERP y backend',
      tools: ['Odoo ORM', 'Django', 'APIs REST'],
    },
    {
      group: 'Control de versiones',
      tools: ['Git', 'Git flow'],
    },
  ],
  cases: [
    {
      label: 'Integridad de datos',
      title: 'Migración masiva con control de riesgo',
      summary:
        'Diseño e implementación de un pipeline de carga masiva de relaciones producto↔producto desde una fuente Excel hacia un ERP, para un cliente de retail con catálogo de varios cientos de referencias.',
      points: [
        'Análisis y validación del origen en Jupyter Notebook antes de tocar el ERP: exploración, limpieza y clasificación de casos con pandas, igual que un flujo de análisis de datos, no un script de una sola pasada.',
        'Especificación formal antes de escribir código: reglas de bloqueo explícitas, ningún combo se carga parcialmente si una sola línea tiene conflicto.',
        'Conciliación en modo solo-lectura contra el catálogo real, con reporte de conflictos para validación humana antes de cualquier escritura.',
        'Dry-run con rollback transaccional para verificar el comportamiento exacto del ORM antes de tocar datos reales.',
        'Un identificador normalizado automáticamente por el proceso casi genera un código de catálogo incorrecto — se frenó, se rastreó el origen, y se fijó como regla: el identificador original del cliente es la fuente de verdad, nunca una variante generada.',
      ],
      skills: ['Python', 'Jupyter Notebook', 'pandas', 'Odoo ORM', 'ETL con control de calidad'],
    },
    {
      label: 'Datos legados',
      title: 'Auditoría y migración de maestros desde sistema legado',
      summary:
        'Relevamiento y migración de los maestros de Productos y Clientes de un cliente hacia un ERP nuevo, partiendo de exportaciones Excel y una base de datos histórica sin documentar.',
      points: [
        'Todo el relevamiento se trabajó en notebooks: cruces entre fuentes, conteo de cobertura, detección de duplicados y clasificación de excepciones, con cada paso documentado y reproducible.',
        'Matching automatizado entre el maestro histórico y el catálogo real, con clasificación por nivel de cobertura y detección de duplicados.',
        'Diseño de un dataset canónico con diccionario de trazabilidad: de qué archivo y campo de origen salió cada dato, y qué transformación se aplicó.',
        'Migración por diferencias en vez de reimportación completa, para no ensuciar datos ya cargados.',
        'Archivado en vez de borrado físico al preparar el entorno de pruebas, tras detectar referencias cruzadas que hacían riesgosa la eliminación.',
      ],
      skills: ['Python', 'Jupyter Notebook', 'pandas', 'SQL', 'Reconciliación de datos'],
    },
    {
      label: 'Sistemas',
      title: 'Gestión de pedidos con integración a ERP externo',
      summary:
        'Desarrollo y mantenimiento de un sistema de gestión de pedidos en Django, integrado vía API con un ERP externo, para un cliente con múltiples canales de venta.',
      points: [
        'Sincronización de catálogo, precios y stock con rate limiting y reintentos configurables ante los límites de la API externa.',
        'Máquina de estados para el ciclo de vida del pedido, con bloqueo de edición una vez confirmado en el sistema externo.',
        'Generación dinámica de documentos PDF (presupuestos, remitos) con identidad de marca del cliente.',
        'Criterio explícito para decidir cuándo un cambio necesita especificación formal (toca datos o cálculos compartidos) y cuándo no (cosmético, aislado).',
      ],
      skills: ['Django', 'Integración de APIs REST', 'Máquinas de estado', 'ReportLab'],
    },
    {
      label: 'Operación',
      title: 'Saneamiento de repositorio tras un proyecto intenso',
      summary:
        'Después de estabilizar una carga masiva en producción, alineación del entorno de pruebas con la rama principal y limpieza de ramas auxiliares acumuladas.',
      points: [
        'Verificación previa de commits sin fusionar antes de alinear por fast-forward, evitando pérdida de historial.',
        'Clasificación de ramas en tres grupos —absorbidas, con historial útil, ajenas— con checklist de cierre por rama.',
        'Rescate de documentación útil fuera del repositorio antes de eliminar cualquier rama con historial no fusionado.',
      ],
      skills: ['Git avanzado', 'Higiene de repositorio'],
    },
  ],
};
