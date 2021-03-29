import { Fields, StringModifiers } from '../interfaces';
import { fieldModifierFns } from '../field-modifiers';
import { generateFieldSchema } from '../utils';

export const stringImpl = (
  fields: Fields,
  name: string,
  modifiers?: StringModifiers
) => {
  const fieldType = 'String';

  Object.assign(fields, {
    [name]: {
      type: fieldType,
      ...modifiers,
      fieldSchema: generateFieldSchema(fieldModifierFns)(
        name,
        fieldType,
        modifiers
      ),
    },
  });
};
