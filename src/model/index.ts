import { ModelDefinition, ModelFn, Fields } from '../interfaces';
import { populateFields } from '../field-types';

export const model: ModelFn = (name: string, definition: ModelDefinition) => {
  const fields: Fields = {};

  definition(populateFields(fields));
  let schema = '';

  for (const value of Object.values(fields)) {
    schema += `${value.fieldSchema}\n`;
  }

  const toSchema = `model ${name} {
    ${schema}
  }`;

  // TODO: deep freeze the object to prevent external modification
  return { name, fields, toSchema };
};
