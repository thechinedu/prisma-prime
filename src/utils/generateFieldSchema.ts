import { Modifiers, ModifierKey } from '../interfaces';

type FieldModifiers = {
  [key in ModifierKey]: (fieldSchema: string, fieldValue?: any) => string;
};

export const generateFieldSchema = (fieldModifiers: FieldModifiers) => (
  name: string,
  type: string,
  modifiers: Modifiers = {}
) => {
  let res = `${name} ${type}`;

  for (let [key, value] of Object.entries(modifiers)) {
    let modifier = key as ModifierKey;

    res = fieldModifiers[modifier](res, value);
  }

  return res;
};
