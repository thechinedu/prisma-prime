import { generateModifier, enquoteString } from '../utils';

export const fieldDefault = (
  fieldSchema: string,
  value: boolean | number | string
) => generateModifier(fieldSchema, 'default', enquoteString(value));
