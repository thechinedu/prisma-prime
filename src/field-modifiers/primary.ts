import { generateModifier } from '../utils';

export const primary = (fieldSchema: string, value?: boolean) => {
  if (!value) return fieldSchema;
  return generateModifier(fieldSchema, 'primary');
};
