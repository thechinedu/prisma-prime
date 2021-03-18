export type Modifiers = Partial<{
  optional: boolean;
}>;

export type ModifierKey = keyof Modifiers;

export type FieldType = (name: string, modifiers?: Modifiers) => void;

export type FieldTypes = {
  string: FieldType;
};

export type ModelDefinition = (fieldTypes: FieldTypes) => void;
