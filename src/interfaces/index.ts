// https://github.com/krzkaczor/ts-essentials/blob/master/lib/types.ts#L346
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

// https://github.com/krzkaczor/ts-essentials/blob/master/lib/types.ts#L349
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export enum Defaults {
  autoincrement = 'autoincrement',
  dbgenerated = 'dbgenerated',
  cuid = 'cuid',
  uuid = 'uuid',
  now = 'now',
}

type OptionalModifier = {
  /**
   * When set to true, the primary modifier should be false or not defined
   */
  optional?: true;
  /**
   * When set to true, the primary modifier should be false or not defined
   */
  unique?: boolean;
  primary?: false;
};

type PrimaryModifier = {
  /**
   * When set to true, the optional and unique modifier should be false or not defined
   */
  primary?: true;
  unique?: false;
  optional?: false;
};

export type IntModifiers = XOR<PrimaryModifier, OptionalModifier> & {
  default?: number | Defaults.autoincrement | Defaults.dbgenerated;
};

export type Modifiers = XOR<PrimaryModifier, OptionalModifier> & {
  default?: boolean | number | string;
};

export type ModifierKey = keyof Modifiers;

export type FieldType<M = Modifiers> = (name: string, modifiers?: M) => void;
export type RawType = (rawString: string) => void;

export type FieldTypes = {
  bigInt: FieldType;
  boolean: FieldType;
  bytes: FieldType;
  datetime: FieldType;
  decimal: FieldType;
  float: FieldType;
  int: FieldType<IntModifiers>;
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
