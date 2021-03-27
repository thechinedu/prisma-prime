import { generateModifier } from '../utils';

export const unique = (fieldSchema: string, value?: boolean) => {
  if (!value) return fieldSchema;
  return generateModifier(fieldSchema, 'unique');
};
