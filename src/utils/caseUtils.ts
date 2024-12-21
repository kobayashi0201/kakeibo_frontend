export function toSnakeCase<T extends Record<string, unknown>>(
  obj: T,
): Record<string, unknown> {
  const snakeCaseObj: Record<string, unknown> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeCaseKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      snakeCaseObj[snakeCaseKey] = obj[key];
    }
  }
  return snakeCaseObj;
}

export function toCamelCase<T extends Array<Record<string, unknown>>>(
  array: T,
): T {
  const camelCaseArray = array.map((obj) => {
    const camelCaseObj: Record<string, unknown> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        camelCaseObj[camelCaseKey] = obj[key];
      }
    }
    return camelCaseObj as Record<string, unknown>;
  });
  return camelCaseArray as T;
}
