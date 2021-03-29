export const enquoteString = (value: any) => {
  if (typeof value !== 'string') return value;

  return `"${value}"`;
};
