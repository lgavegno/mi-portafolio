# CONTRIBUTING.md — Guía de Contribución

## Convenciones de commits (Conventional Commits)

| Tipo | Cuándo usarlo | Ejemplo |
|------|--------------|---------|
| feat | Nueva funcionalidad | feat: agregar sección testimonios |
| fix | Corrección de bug | fix: formulario no enviaba en Safari |
| content | Cambio de contenido | content: agregar proyecto OmniStock |
| docs | Documentación | docs: actualizar CLAUDE.md con nuevas rutas |
| style | Cambio visual sin lógica | style: ajustar espaciado en hero mobile |
| refactor | Reestructura sin cambio funcional | refactor: extraer hook useContactForm |
| perf | Mejora de performance | perf: lazy load de WireframeGeometry en agencias
| chore | Tareas de mantenimiento | chore: actualizar dependencias |

## Flujo de branches

```
main        ← producción. Solo recibe merges desde develop
develop     ← integración. Todas las features mergean acá primero
feature/*   ← trabajo nuevo (feat/fix/content/docs)
```

## ⚠️ Regla crítica — Nunca commitear directo a main

Claude Code y cualquier colaborador **SIEMPRE debe:**

1. **Verificar la rama activa antes de commitear:** `git branch`
2. **Si está en `main` → hacer checkout a la feature branch:** `git checkout develop && git checkout -b fix/nombre`
3. **Nunca usar `git push origin fix/branch:main`** — esto bypasea la integración
4. **Flujo obligatorio:** `feature/*` → `develop` → `main`

**Si un commit llega a `main` por error:**
```bash
git checkout develop
git merge main
git push origin develop
# (sincronizar develop con main para no perder los cambios)
```

## Flujo correcto

```bash
# 1. Partir desde develop
git checkout develop
git checkout -b content/nombre-del-cambio

# 2. Trabajar y commitear
git add [archivos específicos]
git commit -m "tipo: descripción breve en minúscula"

# 3. Mergear a develop
git checkout develop
git merge content/nombre-del-cambio --no-ff
git push origin develop

# 4. Solo cuando develop está estable y testeado: mergear a main
git checkout main
git merge develop --no-ff
git push origin main
# Deploy automático a https://ongevag.vercel.app/
```

## ⚠️ Nunca

- Nunca mergear `feature/*` directo a `main`
- Nunca pushear directo a `main` sin pasar por `develop`

## Cómo agregar un proyecto al portfolio

1. Abrir `src/data/projects.js`
2. Agregar objeto respetando el esquema documentado en `src/docs/MOD-01-PROJECTS.md`
3. Campos obligatorios: `id`, `title`, `description`, `category`, `tags`, `status`, `progress`, `featured`
4. Si tiene imágenes: crear carpeta `src/assets/projects/[id]/` con `screenshot-1.webp` y `screenshot-2.webp` (800px ancho, formato WebP)
5. Actualizar `CHANGELOG.md` con entrada bajo la versión correspondiente
6. Commit: `content: agregar proyecto [nombre]`

## Cómo agregar un post al blog

1. Abrir `src/features/blog/data/blogData.js`
2. Agregar objeto siguiendo la estructura existente
3. El contenido es HTML inline (no Markdown) — ver posts existentes como ejemplo
4. Commit: `content: agregar post [título]`

## Reglas de código

### Stack & Arquitectura

- **React 19 + Vite:** Functional components únicamente — NO class components
- **Arquitectura:** Feature-Based Architecture (ver [ADR-004](src/docs/adr/ADR-004.md))
  - `src/components/ui/` → UI Kit global, agnóstico al negocio
  - `src/features/` → Módulos autocontenidos con lógica, estado y vista
  - `src/layouts/` → Composición de páginas
  - `src/pages/` → Rutas y puntos de entrada
- **JavaScript puro:** Sin TypeScript (ver [ADR-002](src/docs/adr/ADR-002.md)). ESLint valida la calidad del código.

### Estilos & CSS

- **Tailwind CSS únicamente** — NO crear archivos `.css` o `.scss` nuevos
- **Excepción:** CSS permitido solo para 3D transforms y keyframes complejos que Tailwind no puede manejar (precedente: `Services3DCarousel.css`)
- Colores siempre via tokens de Tailwind — no hex hardcodeados en JSX
- Si necesitas estilos globales, editar `src/index.css` via `@layer`

### Animaciones

- **Framer Motion** para animaciones complejas
- Reutiliza variantes de `src/config/motionConfig.js` (`fadeInUp`, `slideInLeft`, etc.) — no crear nuevas animations ad-hoc
- Testear con `prefers-reduced-motion` activo para cumplir accesibilidad

### Componentes & Hooks

- Hooks propios siempre en `src/hooks/` con prefijo `use` (ej: `useContactForm.js`)
- **React Icons exclusive:** `react-icons/fi` (Feather) como primera opción, `react-icons/md` (Material) como fallback
- NO usar `material-icons`, Google Fonts via `<span>`, u otros proveedores de iconografía

### Assets

- Imágenes estáticas en `/public`
- Imágenes importadas en JS deben estar optimizadas (Vite ImageTools las procesa automáticamente)
- Formatos preferidos: WebP, JPEG. Evitar PNG para fotos.

### Path Aliases

**Todo código nuevo debe usar path aliases** para imports más limpios:

```javascript
// ✅ Correcto (código nuevo)
import Button from '@components/ui/Button'
import { fadeInUp } from '@config/motionConfig'
import { useVibrate } from '@hooks/useVibrate'

// ⚠️ Legado (imports existentes con rutas relativas)
import Button from '../../components/ui/Button'
```

**Aliases disponibles:**
- `@components/*` → `src/components/*`
- `@features/*` → `src/features/*`
- `@hooks/*` → `src/hooks/*`
- `@config/*` → `src/config/*`
- `@data/*` → `src/data/*`
- `@pages/*` → `src/pages/*`
- `@layouts/*` → `src/layouts/*`
- `@assets/*` → `src/assets/*`
- `@/*` → `src/*` (acceso a root)

**Nota:** Los imports existentes usan rutas relativas. No refactorizar archivos legacy, solo usar aliases en código nuevo.

## Checklist antes de cada commit

- [ ] `npm run build` ejecuta sin errores
- [ ] `npm run lint` no reporta errores nuevos
- [ ] El cambio se ve correctamente en mobile (380px) y desktop (1280px)
- [ ] Si agregué animaciones: probé con `prefers-reduced-motion` activo
- [ ] Si modifiqué `src/data/projects.js`: verifiqué que ProjectCard y Works renderizan correctamente
- [ ] Si cambié estilos: revisé que no haya hardcodeado colores ni dimensiones (usar tokens)
- [ ] Actualicé `CHANGELOG.md` si el cambio es visible para el usuario

## Qué nunca commitear

- `.env` — credenciales de EmailJS (está en .gitignore)
- `node_modules/`
- `dist/`
- Archivos `.DS_Store`
- Console.log de debug

## Después de completar una tarea

1. Asegúrate de que `npm run build` y `npm run lint` ejecutan sin errores
2. El código debe ser técnicamente sólido — se registra la tarea cuando se cumplen estos criterios
3. Actualiza `CHANGELOG.md` si es un cambio visible al usuario

## Estructura de documentación SDD

| Archivo | Propósito | Actualizar cuando... |
|---------|-----------|---------------------|
| `CLAUDE.md` | Contexto del proyecto | Cambia stack, arquitectura o convenciones |
| `src/docs/PRD.md` | Requisitos del producto | Se agrega/elimina una feature |
| `src/docs/adr/` | Decisiones de arquitectura | Se toma una decisión técnica relevante |
| `src/docs/DESIGN_TOKENS.md` | Sistema de diseño | Se agregan colores o animaciones |
| `CHANGELOG.md` | Historial de versiones | Cualquier cambio visible al usuario |
| `src/docs/MOD-*.md` | Spec de módulos | Se modifica un módulo documentado |

## Referencias

- [ADR-001: Vite como build tool](src/docs/adr/ADR-001.md)
- [ADR-002: JavaScript puro sin TypeScript](src/docs/adr/ADR-002.md)
- [ADR-003: EmailJS para formulario de contacto](src/docs/adr/ADR-003.md)
- [ADR-004: Arquitectura feature-based (DDD Light)](src/docs/adr/ADR-004.md)

## Sistema de separadores de sección (SectionDivider)
 
Al agregar nuevas secciones con color de fondo diferente al anterior, usar
`SectionDivider` entre ellas:
 
```jsx
import SectionDivider from '../components/ui/SectionDivider'
 
<SeccionA />  {/* bg: #EEE0C9 */}
<SectionDivider variant="wave" fromColor="#EEE0C9" toColor="#F1F0E8" />
<SeccionB />  {/* bg: #F1F0E8 */}
```
 
**Variantes disponibles:** `wave` | `bowl` | `overlap`
**Props requeridas:** `fromColor` y `toColor` deben ser el hex exacto del bg de cada sección.
**Regla:** no usar separador si `fromColor === toColor` (mismo color no necesita transición).
**Restricción activa:** no agregar separadores en secciones con `bg-obsidian` hasta resolver DT-08-01.
 
Ver spec completa: `docs/specs/FEATURE-08-SECTION-DIVIDERS/spec.md`
 
---
 
## Paleta de colores (Rebrand 2026 — ADR-012)
 
Toda clase de color nueva debe usar tokens de la paleta rebrand:
 
| Token | HEX | Tailwind class |
|-------|-----|----------------|
| cream | #F1F0E8 | `bg-[#F1F0E8]` |
| sand | #EEE0C9 | `bg-[#EEE0C9]` |
| mist-blue | #ADC4CE | `bg-[#ADC4CE]` |
| steel-blue | #96B6C5 | `bg-[#96B6C5]` |
| navy | #2C3340 | `bg-[#2C3340]` |
| slate text | #4B5563 | `text-[#4B5563]` |
 
**Nunca usar:** `mint-400`, `cyan-institutional`, `cobalt-500`, `bg-obsidian`
(eliminados en ADR-012 — Tailwind no emite CSS para estos tokens).