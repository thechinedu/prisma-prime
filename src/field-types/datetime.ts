import { Fields, Modifiers } from '../interfaces';
import { fieldModifiers } from '../field-modifiers';
import { generateFieldSchema } from '../utils';

export const datetimeImpl = (
  fields: Fields,
  name: string,
  modifiers?: Modifiers
) => {
  const fieldType = 'DateTime';

  Object.assign(fields, {
    [name]: {
      type: fieldType,
      ...modifiers,
      fieldSchema: generateFieldSchema(fieldModifiers)(
        name,
        fieldType,
        modifiers
      ),
    },
  });
};
