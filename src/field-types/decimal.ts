import { Fields, Modifiers } from '../interfaces';
import { fieldModifierFns } from '../field-modifiers';
import { generateFieldSchema } from '../utils';

export const decimalImpl = (
  fields: Fields,
  name: string,
  modifiers?: Modifiers
) => {
  const fieldType = 'Decimal';

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
