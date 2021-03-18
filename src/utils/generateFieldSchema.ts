import { Modifiers, ModifierKey } from '../interfaces';
import fieldModifiers from '../field-modifiers';

const generateFieldSchema = (
  name: string,
  type: string,
  modifiers: Modifiers = {}
) => {
  let res = `${name} ${type}`;

  for (let [key, value] of Object.entries(modifiers)) {
    let modifier = key as ModifierKey;

    if (value) {
      res = fieldModifiers[modifier](res);
    }
  }

  return res;
};

export default generateFieldSchema;
