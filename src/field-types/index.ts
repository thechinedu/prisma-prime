import { Fields, FieldTypes } from '../interfaces';
import { bigIntImpl } from './big-int';
import { booleanImpl } from './boolean';
import { bytesImpl } from './bytes';
import { datetimeImpl } from './datetime';
import { decimalImpl } from './decimal';
import { floatImpl } from './float';
import { intImpl } from './int';
import { jsonImpl } from './json';
import { rawImpl } from './raw';
import { stringImpl } from './string';

export const populateFields = (fields: Fields): FieldTypes => ({
  bigInt: (name, modifiers) => bigIntImpl(fields, name, modifiers),
  boolean: (name, modifiers) => booleanImpl(fields, name, modifiers),
  bytes: (name, modifiers) => bytesImpl(fields, name, modifiers),
  datetime: (name, modifiers) => datetimeImpl(fields, name, modifiers),
  decimal: (name, modifiers) => decimalImpl(fields, name, modifiers),
  float: (name, modifiers) => floatImpl(fields, name, modifiers),
  int: (name, modifiers) => intImpl(fields, name, modifiers),
  json: (name, modifiers) => jsonImpl(fields, name, modifiers),
  raw: fieldSchema => rawImpl(fields, fieldSchema),
  string: (name, modifiers) => stringImpl(fields, name, modifiers),
});
