import { generateModifier } from '../utils';

export const optional = (fieldSchema: string, value?: boolean) => {
  if (!value) return fieldSchema;
  return generateModifier(fieldSchema, 'optional');
};
