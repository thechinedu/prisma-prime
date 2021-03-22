import { Fields } from '../interfaces';

const raw = (fields: Fields, fieldSchema: string) => {
  const [name, fieldType] = fieldSchema.split(' ');

  Object.assign(fields, {
    [name]: {
      type: fieldType,
      fieldSchema: fieldSchema,
    },
  });
};

export default raw;
