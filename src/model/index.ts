import { ModelDefinition, ModelFunc } from '../interfaces';
import { populateFields } from '../field-types';

export const model: ModelFunc = (name: string, definition: ModelDefinition) => {
  const fields = {};

  definition(populateFields(fields));

  // TODO: deep freeze the object to prevent external modification
  return { name, fields };
};

const example = model('User', t => {
  t.int('id', { default: 1, updatedAt: true });
});

console.log(example);
