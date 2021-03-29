import { Fields, DateTimeModifiers } from '../interfaces';
import { fieldModifierFns } from '../field-modifiers';
import { generateFieldSchema } from '../utils';

export const datetimeImpl = (
  fields: Fields,
  name: string,
  modifiers?: DateTimeModifiers
) => {
  const fieldType = 'DateTime';

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
