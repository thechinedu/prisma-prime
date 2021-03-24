import { ModifierKey } from '../interfaces';

type SchemaRecord = {
  fieldName: string;
  fieldType: string;
  existingModifiers: string[];
  key?: ModifierKey;
};

type ModifierMap = {
  [key in ModifierKey]?: string;
};

const modifierKeyToSchemaAttribute: ModifierMap = {
  primary: '@id',
  unique: '@unique',
};

const optionalModifier = ({
  fieldName,
  fieldType,
  existingModifiers,
}: SchemaRecord) => `${fieldName} ${fieldType}? ${existingModifiers.join(' ')}`;

const listModifier = ({
  fieldName,
  fieldType,
  existingModifiers,
}: SchemaRecord) =>
  `${fieldName} ${fieldType}[] ${existingModifiers.join(' ')}`;

const defaultModifier = ({
  fieldName,
  fieldType,
  existingModifiers,
  key,
}: SchemaRecord) =>
  `${fieldName} ${fieldType} ${existingModifiers.join(' ')} ${
    modifierKeyToSchemaAttribute[key as keyof ModifierMap]
  }`;

const modifiers = {
  optional: optionalModifier,
  list: listModifier,
  default: defaultModifier,
};

export const generateModifier = (fieldSchema: string, key: ModifierKey) => {
  const [fieldName, fieldType, ...existingModifiers] = fieldSchema.split(' ');
  const modifierKey = key as keyof typeof modifiers;
  const modifierFn = modifiers[modifierKey]
    ? modifiers[modifierKey]
    : modifiers.default;

  return modifierFn({ fieldName, fieldType, existingModifiers, key });
};
