import { Fields, RelationModifiers } from '../interfaces';
import { relationImpl } from './relation';

export const hasManyImpl = (
  fields: Fields,
  name: string,
  modifiers: Pick<RelationModifiers, 'source'>
) => {
  relationImpl(fields, name, Object.assign(modifiers, { list: true }));
};
