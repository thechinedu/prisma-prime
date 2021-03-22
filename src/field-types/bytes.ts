import { Fields, Modifiers } from '../interfaces';
import generateFieldSchema from '../utils/generateFieldSchema';

const bytes = (fields: Fields, name: string, modifiers?: Modifiers) => {
  const fieldType = 'Bytes';

  Object.assign(fields, {
    [name]: {
      type: fieldType,
      ...modifiers,
      fieldSchema: generateFieldSchema(name, fieldType, modifiers),
    },
  });
};

export default bytes;
