import { ModifierKey, RelationModifiers } from '../interfaces';

type SchemaRecord = {
  fieldName: string;
  fieldType: string;
  existingModifiers: string[];
  key?: ModifierKey;
  value?: unknown;
};

type ModifierMap = {
  [key in ModifierKey]?: (value?: unknown) => string;
};

const modifierKeyToSchemaAttribute: ModifierMap = {
  primary: () => ' @id',
  unique: () => ' @unique',
  default: value => ` @default(${value})`,
  updatedAt: () => ` @updatedAt`,
  relation: value => {
    const relationValue = (value as unknown) as Omit<
      RelationModifiers,
      'source'
    >;
    const name = relationValue.name ? `name: "${relationValue.name}"` : '';
    const fields = relationValue.fields
      ? `fields: [${relationValue.fields}]`
      : '';
    const references = relationValue.references
      ? `references: [${relationValue.references}]`
      : '';
    const relationArgs = [name, fields, references].filter(Boolean).join(', ');

    if (!relationArgs) return '';

    return ` @relation(${relationArgs})`;
  },
};

const typeModifiers = {
  optional: (type: string) => `${type}?`,
  list: (type: string) => `${type}[]`,
  base: (type: string) => type,
};

const modifier = ({
  fieldName,
  fieldType: type,
  existingModifiers: additionalModifiers,
  key,
  value,
}: SchemaRecord) => {
  const typeModifierKey = key as keyof typeof typeModifiers;
  const typeModifier = typeModifiers[typeModifierKey]
    ? typeModifiers[typeModifierKey]
    : typeModifiers.base;
  const fieldType = typeModifier(type);
  const existingModifiers = additionalModifiers.length
    ? ` ${additionalModifiers.join(' ')}`
    : '';
  const modifierMapKey = key as keyof ModifierMap;
  const modifierMapFn = modifierKeyToSchemaAttribute[modifierMapKey];
  const schemaAttribute = `${modifierMapFn?.(value) ?? ''}`;

  return `${fieldName} ${fieldType}${existingModifiers}${schemaAttribute}`;
};

export const generateModifier = (
  fieldSchema: string,
  key: ModifierKey,
  value?: unknown
) => {
  const [fieldName, fieldType, ...existingModifiers] = fieldSchema.split(' ');

  return modifier({ fieldName, fieldType, existingModifiers, key, value });
};
