import { generateModifier } from '../utils';

export const fieldDefault = (
  fieldSchema: string,
  value: boolean | number | string
) =>
  generateModifier(
    fieldSchema,
    'default',
    typeof value === 'string' ? `"${value}"` : value
  );
