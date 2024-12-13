export function toSnakeCase<T extends Record<string, any>>(obj: T): Record<string, any> {
  const snakeCaseObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      snakeCaseObj[snakeCaseKey] = obj[key];
    }
  }
  return snakeCaseObj;
}
