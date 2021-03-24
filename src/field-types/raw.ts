import { Fields } from '../interfaces';

export const rawImpl = (fields: Fields, fieldSchema: string) => {
  const fieldName = Symbol('raw');

  Object.assign(fields, {
    [fieldName]: {
      fieldSchema: fieldSchema,
    },
  });
};
