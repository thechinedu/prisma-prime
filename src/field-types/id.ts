import { Fields } from '../interfaces';
import { autoincrement } from '../attribute-fns';
import { intImpl } from './int';

export const idImpl = (fields: Fields) => {
  intImpl(fields, 'id', { primary: true, default: autoincrement() });
};
