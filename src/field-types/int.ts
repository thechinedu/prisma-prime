import { Fields, IntModifiers } from '../interfaces';
import { fieldModifierFns } from '../field-modifiers';
import { generateFieldSchema } from '../utils';

export const intImpl = (
  fields: Fields,
  name: string,
  modifiers?: IntModifiers
) => {
  const fieldType = 'Int';

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
