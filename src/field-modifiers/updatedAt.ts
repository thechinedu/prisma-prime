import { generateModifier } from '../utils';

export const updatedAt = (fieldSchema: string, value?: boolean) => {
  if (!value) return fieldSchema;
  return generateModifier(fieldSchema, 'updatedAt');
};
