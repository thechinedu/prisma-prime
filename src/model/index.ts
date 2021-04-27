import { ModelDefinition, ModelFn, Fields } from '../interfaces';
import { populateFields } from '../field-types';

export const model: ModelFn = (name: string, definition: ModelDefinition) => {
  const fields: Fields = {};

  definition(populateFields(fields));
  let schema = '';

  Object.values(fields).forEach((value, idx, arr) => {
    if (idx === arr.length - 1) schema += `${value.fieldSchema}`;
    else schema += `${value.fieldSchema}\n`;
  });

  const toSchema = `model ${name} {
    ${schema}
  }`;

  // TODO: deep freeze the object to prevent external modification
  return { name, fields, toSchema };
};
