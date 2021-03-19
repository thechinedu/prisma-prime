import { FieldTypes } from '../interfaces';
import string from './string';
import boolean from './boolean';
import raw from './raw';

const populateFields = (): FieldTypes => ({
  boolean,
  string,
  raw,
});

export default populateFields;
