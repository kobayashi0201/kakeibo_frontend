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
