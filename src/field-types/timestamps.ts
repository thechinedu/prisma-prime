import { Fields } from '../interfaces';
import { fieldModifierFns } from '../field-modifiers';
import { generateFieldSchema } from '../utils';
import { now } from '../attribute-fns';

export const timestampsImpl = (fields: Fields) => {
  const fieldType = 'DateTime';

  Object.assign(fields, {
    createdAt: {
      type: fieldType,
      fieldSchema: generateFieldSchema(fieldModifierFns)(
        'createdAt',
        fieldType,
        {
          default: now(),
        }
      ),
    },

    updatedAt: {
      type: fieldType,
      fieldSchema: generateFieldSchema(fieldModifierFns)(
        'updatedAt',
        fieldType,
        {
          updatedAt: true,
        }
      ),
    },
  });
};
