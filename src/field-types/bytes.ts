import { Fields, Modifiers } from '../interfaces';
import { fieldModifiers } from '../field-modifiers';
import { generateFieldSchema } from '../utils';

export const bytesImpl = (
  fields: Fields,
  name: string,
  modifiers?: Modifiers
) => {
  const fieldType = 'Bytes';

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
