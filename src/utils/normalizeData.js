export const snakeToCamel = (str) => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const convertKeysToCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const camelKey = snakeToCamel(key);
      acc[camelKey] = convertKeysToCamelCase(value);
      return acc;
    }, {});
  }
  return obj;
};

export const camelToSnake = (str) => {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
};

export const convertKeysToSnakeCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToSnakeCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const snakeKey = camelToSnake(key);
      acc[snakeKey] = convertKeysToSnakeCase(value);
      return acc;
    }, {});
  }
  return obj;
};
