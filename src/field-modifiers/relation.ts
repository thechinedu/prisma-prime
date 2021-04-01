import { RelationModifiers } from '../interfaces';
import { generateModifier } from '../utils';

export const relation = (
  fieldSchema: string,
  value: Omit<RelationModifiers, 'source'>
) => generateModifier(fieldSchema, 'relation', value);
