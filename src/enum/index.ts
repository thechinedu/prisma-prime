import { Enum } from '../interfaces';

export const enumType = (name: string, keys: string[]): Enum => {
  const fields: Record<typeof keys[number], string> = {};

  for (const key of keys) fields[key] = key;

  return {
    name,
    ...fields,
    toSchema: `enum ${name} {\n${keys.join('\t\n')}\n}`,
  };
};
