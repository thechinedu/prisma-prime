import { ModelDefinition, ModelFunc } from '../interfaces';
import populateFields from '../field-types';

export const model: ModelFunc = (name: string, definition: ModelDefinition) => {
  const fields = {};

  definition(populateFields(fields));

  // TODO: deep freeze the object to prevent external modification
  return { name, fields };
};
