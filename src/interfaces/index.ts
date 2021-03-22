export type Modifiers = Partial<{
  optional: boolean;
}>;

export type ModifierKey = keyof Modifiers;

export type FieldType = (name: string, modifiers?: Modifiers) => void;
export type RawType = (rawString: string) => void;

export type FieldTypes = {
  string: FieldType;
  boolean: FieldType;
  /** The raw type allows directly specifying a schema field in the PSL format */
  raw: RawType;
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
