import { Fields, FieldTypes } from '../interfaces';
import { bigIntImpl } from './big-int';
import { booleanImpl } from './boolean';
import { bytesImpl } from './bytes';
import { datetimeImpl } from './datetime';
import { decimalImpl } from './decimal';
import { enumImpl } from './enum';
import { floatImpl } from './float';
import { idImpl } from './id';
import { intImpl } from './int';
import { jsonImpl } from './json';
import { rawImpl } from './raw';
import { relationImpl } from './relation';
import { stringImpl } from './string';
import { timestampsImpl } from './timestamps';

export const populateFields = (fields: Fields): FieldTypes => ({
  bigInt: (name, modifiers) => bigIntImpl(fields, name, modifiers),
  boolean: (name, modifiers) => booleanImpl(fields, name, modifiers),
  bytes: (name, modifiers) => bytesImpl(fields, name, modifiers),
  datetime: (name, modifiers) => datetimeImpl(fields, name, modifiers),
  decimal: (name, modifiers) => decimalImpl(fields, name, modifiers),
  enum: (name, modifiers) => enumImpl(fields, name, modifiers),
  float: (name, modifiers) => floatImpl(fields, name, modifiers),
  id: () => idImpl(fields),
  int: (name, modifiers) => intImpl(fields, name, modifiers),
  json: (name, modifiers) => jsonImpl(fields, name, modifiers),
  raw: fieldSchema => rawImpl(fields, fieldSchema),
  relation: (name, modifiers) => relationImpl(fields, name, modifiers),
  string: (name, modifiers) => stringImpl(fields, name, modifiers),
  timestamps: () => timestampsImpl(fields),
});
