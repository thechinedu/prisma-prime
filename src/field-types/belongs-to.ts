import { Fields, RelationModifiers } from '../interfaces';
import { relationImpl } from './relation';
import { intImpl } from './int';

export const belongsToImpl = (
  fields: Fields,
  name: string,
  modifiers: Pick<RelationModifiers, 'source'>
) => {
  const foreignKey = `${name}Id`;

  relationImpl(
    fields,
    name,
    Object.assign(modifiers, { fields: [foreignKey], references: ['id'] })
  );
  intImpl(fields, foreignKey);
};
