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

const typeModifiers = {
  optional: (type: string) => `${type}?`,
  list: (type: string) => `${type}[]`,
  default: (type: string) => type,
};

const modifier = ({
  fieldName,
  fieldType: type,
  existingModifiers: additionalModifiers,
  key,
}: SchemaRecord) => {
  const typeModifierKey = key as keyof typeof typeModifiers;
  const typeModifier = typeModifiers[typeModifierKey]
    ? typeModifiers[typeModifierKey]
    : typeModifiers.default;
  const fieldType = typeModifier(type);
  const existingModifiers = additionalModifiers.length
    ? ` ${additionalModifiers.join(' ')}`
    : '';
  const modifierMapKey = key as keyof ModifierMap;
  const schemaAttribute = modifierKeyToSchemaAttribute[modifierMapKey]
    ? ` ${modifierKeyToSchemaAttribute[modifierMapKey]}`
    : '';

  return `${fieldName} ${fieldType}${existingModifiers}${schemaAttribute}`;
};

export const generateModifier = (fieldSchema: string, key: ModifierKey) => {
  const [fieldName, fieldType, ...existingModifiers] = fieldSchema.split(' ');

  return modifier({ fieldName, fieldType, existingModifiers, key });
};
