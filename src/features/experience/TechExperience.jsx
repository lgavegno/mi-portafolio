import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * TechExperience.jsx
 *
 * Sección "Experiencia técnica" — trabajo de implementación/desarrollo Odoo
 * y sistemas de gestión, mostrado sin nombrar clientes ni exponer datos de
 * negocio (SKUs, CUITs, nombres de sistemas legados, entornos).
 *
 * Paleta ONGEVAG (rebrand EPIC-07 / v3.1.0):
 *   cream       #F1F0E8
 *   sand        #EEE0C9
 *   mist-blue   #ADC4CE
 *   steel-blue  #96B6C5
 *   navy        #2C3340
 *
 * Tipografía: Space Grotesk (display) + Inter (body)
 *
 * Integración esperada: agregar a las clases de Tailwind (tailwind.config.js)
 *   colors: { cream: '#F1F0E8', sand: '#EEE0C9', 'mist-blue': '#ADC4CE',
 *             'steel-blue': '#96B6C5', navy: '#2C3340' }
 * Si preferís no tocar el config, este archivo usa valores arbitrarios
 * bg-[#F1F0E8] etc. para no depender de que existan esas clases.
 */

const cases = [
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
];

const toolGroups = [
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
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 110, damping: 18 },
  },
};

function CaseRow({ c, index, isOpen, onToggle }) {
  return (
    <motion.div variants={item} className="border-t border-[#2C3340]/15 py-8">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-start justify-between gap-6 text-left"
      >
        <div className="flex-1">
          <span className="font-['Inter'] text-xs uppercase tracking-[0.14em] text-[#2C3340]/50">
            {String(index + 1).padStart(2, '0')} — {c.label}
          </span>
          <h3 className="mt-2 font-['Space_Grotesk'] text-2xl font-medium leading-snug text-[#2C3340] md:text-3xl">
            {c.title}
          </h3>
          <p className="mt-3 max-w-2xl font-['Inter'] text-[15px] leading-relaxed text-[#2C3340]/70">
            {c.summary}
          </p>
        </div>

        <span
          aria-hidden="true"
          className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2C3340]/20 text-[#2C3340] transition-transform duration-300 ${
            isOpen ? 'rotate-45' : 'group-hover:rotate-90'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <div className="mt-6 grid gap-8 pl-0 md:grid-cols-[1fr,220px] md:pl-1">
          <ul className="space-y-3">
            {c.points.map((p, i) => (
              <li key={i} className="flex gap-3 font-['Inter'] text-[15px] leading-relaxed text-[#2C3340]/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#96B6C5]" />
                {p}
              </li>
            ))}
          </ul>

          <div>
            <span className="font-['Inter'] text-xs uppercase tracking-[0.14em] text-[#2C3340]/50">
              Stack
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[#96B6C5]/40 bg-[#96B6C5]/10 px-3 py-1 font-['Inter'] text-xs text-[#2C3340]/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TechExperience() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#F1F0E8] px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <span className="font-['Inter'] text-xs uppercase tracking-[0.14em] text-[#2C3340]/50">
            Experiencia técnica
          </span>
          <h2 className="mt-3 font-['Space_Grotesk'] text-4xl font-medium leading-tight text-[#2C3340] md:text-5xl">
            Implementaciones Odoo y sistemas de gestión
          </h2>
          <p className="mt-5 font-['Inter'] text-[15px] leading-relaxed text-[#2C3340]/70">
            Trabajo como desarrollador e implementador para distintos clientes a través de
            una consultora IT. Por confidencialidad no se nombran clientes ni se exponen
            datos operativos reales — lo que sigue es el criterio técnico detrás de cada
            proyecto.
          </p>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-6 border-t border-[#2C3340]/15 pt-8 sm:grid-cols-3">
          {toolGroups.map((g) => (
            <div key={g.group}>
              <span className="font-['Inter'] text-xs uppercase tracking-[0.14em] text-[#2C3340]/50">
                {g.group}
              </span>
              <ul className="mt-3 space-y-1.5">
                {g.tools.map((t) => (
                  <li
                    key={t}
                    className="font-['Space_Grotesk'] text-lg text-[#2C3340]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14"
        >
          {cases.map((c, i) => (
            <CaseRow
              key={c.title}
              c={c}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
          <div className="border-t border-[#2C3340]/15" />
        </motion.div>
      </div>
    </section>
  );
}
