import { ModelDefinition } from '../interfaces';
import populateFields from '../fields';
import { _fields } from './fields';

export const model = (name: string, definition: ModelDefinition) => {
  definition(populateFields());

  return { name, fields: _fields };
};
