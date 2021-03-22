import { Fields, Modifiers } from '../interfaces';
import generateFieldSchema from '../utils/generateFieldSchema';

const json = (fields: Fields, name: string, modifiers?: Modifiers) => {
  const fieldType = 'Json';

  Object.assign(fields, {
    [name]: {
      type: fieldType,
      ...modifiers,
      fieldSchema: generateFieldSchema(name, fieldType, modifiers),
    },
  });
};

export default json;
