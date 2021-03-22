import { Fields, FieldTypes } from '../interfaces';
import stringImpl from './string';
import booleanImpl from './boolean';
import rawImpl from './raw';

const populateFields = (fields: Fields): FieldTypes => ({
  boolean: (name, modifiers) => booleanImpl(fields, name, modifiers),
  string: (name, modifiers) => stringImpl(fields, name, modifiers),
  raw: fieldSchema => rawImpl(fields, fieldSchema),
});

export default populateFields;
