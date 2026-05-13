# MOD-01: Hero Feature (ParticleBackground)

## Propósito
Proveer una experiencia visual de alto impacto (Senior level) sin degradar la performance de la SPA.

## Especificaciones Técnicas
- **Tecnología:** HTML5 Canvas + RequestAnimationFrame.
- **Optimización:** 
  - Cantidad de partículas dinámica según ancho de pantalla.
  - Uso de `ResizeObserver` para recalcular el canvas sin memory leaks.
  - Pausa automática de la animación cuando el componente está fuera del viewport (Intersections API - Pendiente refactor).

## Riesgos Identificados
- **CPU Spikes:** En dispositivos móviles de gama baja, el renderizado de partículas puede causar lag.
- **Solución:** ADR-006 definirá el umbral de desactivación de partículas en < 768px.