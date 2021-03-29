import { generateModifier, enquoteString } from '../utils';

export const fieldDefault = (
  fieldSchema: string,
  value: boolean | number | string | Date
) => {
  const modifierValue =
    value.constructor === Date ? value.toISOString() : value;

  return generateModifier(fieldSchema, 'default', enquoteString(modifierValue));
};
