import { Modifiers, ModifierKey } from '../interfaces';

type FieldModifierFns = {
  [key in ModifierKey]: (fieldSchema: string, fieldValue: any) => string;
};

export const generateFieldSchema = (fieldModifierFns: FieldModifierFns) => (
  name: string,
  type: string,
  modifiers: Modifiers = {}
) => {
  let res = `${name} ${type}`;

  for (let [key, value] of Object.entries(modifiers)) {
    if (value == null) continue;

    let modifier = key as ModifierKey;

    res = fieldModifierFns[modifier](res, value);
  }

  return res;
};
