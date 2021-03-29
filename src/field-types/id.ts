import { Fields } from '../interfaces';
import { fieldModifierFns } from '../field-modifiers';
import { generateFieldSchema } from '../utils';
import { autoincrement } from '../attribute-fns';

export const idImpl = (fields: Fields) => {
  const fieldType = 'Int';

  Object.assign(fields, {
    id: {
      type: fieldType,
      fieldSchema: generateFieldSchema(fieldModifierFns)('id', fieldType, {
        primary: true,
        default: autoincrement(),
      }),
    },
  });
};
