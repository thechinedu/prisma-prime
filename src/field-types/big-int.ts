import { Fields, NumberModifiers } from '../interfaces';
import { fieldModifierFns } from '../field-modifiers';
import { generateFieldSchema } from '../utils';

export const bigIntImpl = (
  fields: Fields,
  name: string,
  modifiers?: NumberModifiers
) => {
  const fieldType = 'BigInt';

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
