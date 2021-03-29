import { Fields, Modifiers } from '../interfaces';
import { fieldModifierFns } from '../field-modifiers';
import { generateFieldSchema } from '../utils';

export const jsonImpl = (
  fields: Fields,
  name: string,
  modifiers?: Modifiers
) => {
  const fieldType = 'Json';

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
