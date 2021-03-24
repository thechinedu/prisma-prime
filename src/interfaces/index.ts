type PrimaryModifier = {
  primary?: true;
  optional?: false;
  unique?: false;
};

type OptionalModifier = {
  optional?: true;
  primary?: false;
  unique?: boolean;
};

export type Modifiers = PrimaryModifier | OptionalModifier;

export type ModifierKey = keyof Modifiers;

export type FieldType = (name: string, modifiers?: Modifiers) => void;
export type RawType = (rawString: string) => void;

export type FieldTypes = {
  bigInt: FieldType;
  boolean: FieldType;
  bytes: FieldType;
  datetime: FieldType;
  decimal: FieldType;
  float: FieldType;
  int: FieldType;
  json: FieldType;
  /** The raw type allows directly specifying a schema field in the PSL format */
  raw: RawType;
  string: FieldType;
};

export type Fields = {
  [key: string]: Modifiers & {
    type: string;
    fieldSchema: string;
  };
};

export type ModelFunc = (
  modelName: string,
  fieldDefinition: ModelDefinition
) => Model;

export type Model = {
  name: string;
  fields: Fields;
};

export type ModelDefinition = (fieldTypes: FieldTypes) => void;
