import { Fields, Modifiers } from '../interfaces';
import generateFieldSchema from '../utils/generateFieldSchema';

const boolean = (fields: Fields, name: string, modifiers?: Modifiers) => {
  const fieldType = 'Boolean';

  Object.assign(fields, {
    [name]: {
      type: fieldType,
      ...modifiers,
      fieldSchema: generateFieldSchema(name, fieldType, modifiers),
    },
  });
};

export default boolean;
