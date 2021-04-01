import { Fields, RelationModifiers } from '../interfaces';
import { fieldModifierFns } from '../field-modifiers';
import { generateFieldSchema } from '../utils';

export const relationImpl = (
  fields: Fields,
  name: string,
  modifiers: RelationModifiers
) => {
  const fieldType = modifiers.source;
  const relationModifiers = Object.assign(modifiers, {
    relation: {},
    list: modifiers.list,
    optional: modifiers.optional,
  });

  if (modifiers.name) {
    Object.assign(relationModifiers, {
      relation: { ...relationModifiers.relation, name: modifiers.name },
    });
  }

  if (modifiers.fields) {
    Object.assign(relationModifiers, {
      relation: { ...relationModifiers.relation, fields: modifiers.fields },
    });
  }

  if (modifiers.references) {
    Object.assign(relationModifiers, {
      relation: {
        ...relationModifiers.relation,
        references: modifiers.references,
      },
    });
  }

  Object.assign(fields, {
    [name]: {
      type: fieldType,
      ...modifiers,
      fieldSchema: generateFieldSchema(fieldModifierFns)(
        name,
        fieldType,
        Object.assign(relationModifiers, {
          source: null,
          name: null,
          fields: null,
          references: null,
        })
      ),
    },
  });
};
