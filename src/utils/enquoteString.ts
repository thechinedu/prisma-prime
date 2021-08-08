const excludeList = [
  'autoincrement()',
  'cuid()',
  'dbgenerated()',
  'now()',
  'uuid()',
  'env()',
];

const isExcluded = (value: string) =>
  excludeList.includes(value.replace(/\(.*\)/, '()'));

export const enquoteString = (value: any) => {
  if (typeof value !== 'string' || isExcluded(value)) return value;

  return `"${value}"`;
};
