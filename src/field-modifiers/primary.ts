import { generateModifier } from '../utils';

export const primary = (fieldSchema: string) =>
  generateModifier(fieldSchema, 'primary');
