import { generateModifier } from '../utils';

export const list = (fieldSchema: string, value?: boolean) => {
  if (!value) return fieldSchema;
  return generateModifier(fieldSchema, 'list');
};
