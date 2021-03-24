import { generateModifier } from '../utils';

export const unique = (fieldSchema: string) =>
  generateModifier(fieldSchema, 'unique');
