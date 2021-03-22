import { Fields, Modifiers } from '../interfaces';
import generateFieldSchema from '../utils/generateFieldSchema';

const decimal = (fields: Fields, name: string, modifiers?: Modifiers) => {
  const fieldType = 'Decimal';

  Object.assign(fields, {
    [name]: {
      type: fieldType,
      ...modifiers,
      fieldSchema: generateFieldSchema(name, fieldType, modifiers),
    },
  });
};

export default decimal;
