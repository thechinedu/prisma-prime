import { generateModifier } from '../utils';

export const optional = (fieldSchema: string) =>
  generateModifier(fieldSchema, 'optional');
