/**
 * Builds a `getStickyStyle(colName, isHeader)` function from a schema.
 *
 * Each entry in `schema`:
 *   match     - lowercase column name to match (string or string[]).
 *   width     - column min-width in px.
 *   offset    - left offset in px (cumulative; 0 by default).
 *   withShadow- adds a subtle right-shadow to mark the boundary.
 *
 * Returns a function returning either `{}` or the appropriate style object.
 */
export const buildStickyStyleResolver = (schema = []) => (colName, isHeader = false) => {
  const lower = colName?.toLowerCase() || '';
  const baseZ = isHeader ? 30 : 10;

  const match = schema.find(s =>
    Array.isArray(s.match) ? s.match.some(m => m === lower) : s.match === lower
  );
  if (!match) return {};

  const style = {
    position: 'sticky',
    left: `${match.offset || 0}px`,
    zIndex: baseZ,
    minWidth: `${match.width}px`,
    backgroundColor: 'inherit',
  };

  if (match.withShadow) {
    style.boxShadow = '4px 0 8px -4px rgba(0,0,0,0.1)';
  }
  return style;
};

/**
 * Formats an ISO/raw date string as e.g. "01 Jan 2025".
 * Returns "--" for falsy values and the original string if unparseable.
 */
export const formatTableDate = (dateStr) => {
  if (!dateStr) return '--';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return String(dateStr);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  }).format(date);
};

/**
 * Default cell renderer. Returns "--" for empty values, otherwise the
 * stringified value. Used as a fallback when no custom `renderCell` is given.
 */
export const defaultRenderCell = (val) => {
  if (val === null || val === undefined || val === '') return '--';
  return String(val);
};
