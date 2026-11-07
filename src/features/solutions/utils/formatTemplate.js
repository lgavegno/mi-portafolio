// Interpolación mínima '{clave}' → valor (ADR-010: sin librería i18n).
// Las claves sin valor quedan intactas para que el faltante sea visible.
export function formatTemplate(template, vars = {}) {
  if (typeof template !== 'string') return '';
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) && vars[key] != null
      ? String(vars[key])
      : match
  );
}
