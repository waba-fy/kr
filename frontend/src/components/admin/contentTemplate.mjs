// Preserve the complete editor structure without copying another client's content.
export function blankContentFields(value) {
  if (Array.isArray(value)) return value.map(blankContentFields);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, key === "kind" && typeof child === "string" ? child : blankContentFields(child)]));
  if (typeof value === 'boolean') return false;
  if (typeof value === 'number') return 0;
  return '';
}
export function newContentFromTemplate(template, sourceKey = '') {
  return { key: '', title: '', isActive: false, data: blankContentFields(template), sourceKey };
}

export const emptyArrayItem = (sample) => {
  if (Array.isArray(sample)) return sample.slice(0, 1).map(emptyArrayItem);
  if (sample && typeof sample === "object") return Object.fromEntries(Object.keys(sample).map((key) => [key, emptyArrayItem(sample[key])]));
  if (typeof sample === "boolean") return false;
  if (typeof sample === "number") return 0;
  return "";
};

