export const env = (key: string, defaultValue = '') => {
  const result = process.env[key];
  return result ? `env("DATABASE_URL")` : defaultValue;
};
