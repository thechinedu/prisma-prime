import { ModelDefinition, ModelFunc } from '../interfaces';
import populateFields from '../field-types';
import { _fields } from './fields';

export const model: ModelFunc = (name: string, definition: ModelDefinition) => {
  definition(populateFields());

  return { name, fields: _fields };
};
