export default {
  header: {
    eyebrow: 'Technical experience',
    title: 'Odoo implementations and management systems',
    intro:
      'I work as a developer and implementer for various clients through an IT consultancy. For confidentiality reasons, no clients are named and no real operational data is shown — what follows is the technical reasoning behind each project.',
  },
  toolGroups: [
    {
      group: 'Analysis & ETL',
      tools: ['Python', 'Jupyter Notebook', 'pandas', 'SQL / PostgreSQL'],
    },
    {
      group: 'ERP & backend',
      tools: ['Odoo ORM', 'Django', 'REST APIs'],
    },
    {
      group: 'Version control',
      tools: ['Git', 'Git flow'],
    },
  ],
  cases: [
    {
      label: 'Data integrity',
      title: 'Large-scale migration with risk control',
      summary:
        'Design and implementation of a bulk-load pipeline for product↔product relationships from an Excel source into an ERP, for a retail client with a catalog of several hundred SKUs.',
      points: [
        'Source analysis and validation in Jupyter Notebook before touching the ERP: exploration, cleanup, and case classification with pandas — a data-analysis workflow, not a one-shot script.',
        'Formal specification before writing code: explicit blocking rules, no combo loads partially if a single line has a conflict.',
        'Read-only reconciliation against the real catalog, with a conflict report for human validation before any write.',
        'Dry-run with transactional rollback to verify the exact ORM behavior before touching real data.',
        'An identifier auto-normalized by the process nearly generated an incorrect catalog code — caught it, traced the origin, and set the rule: the client\'s original identifier is the source of truth, never a generated variant.',
      ],
      skills: ['Python', 'Jupyter Notebook', 'pandas', 'Odoo ORM', 'ETL with quality control'],
    },
    {
      label: 'Legacy data',
      title: 'Legacy system audit and master data migration',
      summary:
        'Audit and migration of Product and Customer master data into a new ERP, starting from Excel exports and an undocumented historical database.',
      points: [
        'The entire survey was done in notebooks: cross-referencing sources, coverage counts, duplicate detection, and exception classification — every step documented and reproducible.',
        'Automated matching between the historical master and the real catalog, classified by coverage level, with duplicate detection.',
        'Design of a canonical dataset with a traceability dictionary: which source file and field each value came from, and what transformation was applied.',
        'Migration by differences instead of a full re-import, to avoid corrupting already-loaded data.',
        'Archiving instead of physical deletion when preparing the test environment, after detecting cross-references that made deletion risky.',
      ],
      skills: ['Python', 'Jupyter Notebook', 'pandas', 'SQL', 'Data reconciliation'],
    },
    {
      label: 'Systems',
      title: 'Order management with external ERP integration',
      summary:
        'Development and maintenance of a Django order-management system, integrated via API with an external ERP, for a client with multiple sales channels.',
      points: [
        'Catalog, price, and stock synchronization with configurable rate limiting and retries against the external API\'s limits.',
        'State machine for the order lifecycle, locking edits once confirmed in the external system.',
        'Dynamic PDF generation (quotes, delivery notes) with the client\'s brand identity.',
        'Explicit criteria for when a change needs formal specification (touches shared data or calculations) versus when it doesn\'t (cosmetic, isolated).',
      ],
      skills: ['Django', 'REST API integration', 'State machines', 'ReportLab'],
    },
    {
      label: 'Operations',
      title: 'Repository cleanup after an intensive project',
      summary:
        'After stabilizing a bulk load in production, aligned the test environment with the main branch and cleaned up auxiliary branches accumulated over the project.',
      points: [
        'Verified there were no unmerged commits before fast-forwarding, to avoid losing history.',
        'Classified branches into three groups — absorbed, with useful unmerged history, unrelated — with a per-branch closing checklist.',
        'Rescued useful documentation outside the repository before deleting any branch with unmerged history.',
      ],
      skills: ['Advanced Git', 'Repository hygiene'],
    },
  ],
};
