import { Fields, RelationModifiers } from '../interfaces';
import { relationImpl } from './relation';

export const hasOneImpl = (
  fields: Fields,
  name: string,
  modifiers: Pick<RelationModifiers, 'source'>
) => {
  relationImpl(fields, name, Object.assign(modifiers, { optional: true }));
};
