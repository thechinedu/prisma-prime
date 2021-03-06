import { Fields, EnumModifiers, Enum } from '../interfaces';
import { fieldModifierFns } from '../field-modifiers';
import { generateFieldSchema } from '../utils';

export const enumImpl = (
  fields: Fields,
  name: string,
  modifiers: EnumModifiers
) => {
  const fieldType =
    (modifiers.source as Enum)?.name || (modifiers.source as string);
  const fieldSchema = generateFieldSchema(fieldModifierFns)(
    name,
    fieldType,
    Object.assign(modifiers, { source: null })
  ).replace(/["']/g, '');

  Object.assign(fields, {
    [name]: {
      type: fieldType,
      ...modifiers,
      fieldSchema,
    },
  });
};
