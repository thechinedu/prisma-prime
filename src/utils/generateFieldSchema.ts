import { Modifiers, ModifierKey } from '../interfaces';

export const generateFieldSchema = (
  fieldModifiers: { [key in ModifierKey]: (fieldSchema: string) => string }
) => (name: string, type: string, modifiers: Modifiers = {}) => {
  let res = `${name} ${type}`;

  for (let [key, value] of Object.entries(modifiers)) {
    let modifier = key as ModifierKey;

    if (value) {
      res = fieldModifiers[modifier](res);
    }
  }

  return res;
};
