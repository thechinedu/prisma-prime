import { Modifiers } from '../interfaces';
import generateFieldSchema from '../utils/generateFieldSchema';
import { _fields } from '../model/fields';

const boolean = (name: string, modifiers?: Modifiers) => {
  const fieldType = 'Decimal';

  Object.assign(_fields, {
    [name]: {
      type: fieldType,
      ...modifiers,
      _fieldSchema: generateFieldSchema(name, fieldType, modifiers),
    },
  });
};

export default boolean;
