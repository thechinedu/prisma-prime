import { Fields, Modifiers } from '../interfaces';
import generateFieldSchema from '../utils/generateFieldSchema';

const string = (fields: Fields, name: string, modifiers?: Modifiers) => {
  const fieldType = 'String';

  Object.assign(fields, {
    [name]: {
      type: fieldType,
      ...modifiers,
      fieldSchema: generateFieldSchema(name, fieldType, modifiers),
    },
  });
};

export default string;
