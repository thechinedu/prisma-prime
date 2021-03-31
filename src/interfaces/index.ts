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
  list?: false;
};

type PrimaryModifier = {
  /**
   * When set to true, the optional and unique modifier should be false or not defined
   */
  primary?: true;
  unique?: false;
  optional?: false;
  list?: false;
};

type ListModifier = {
  /**
   * When set to true, the primary and optional modifier should be false or not defined
   */
  list?: true;
  primary?: false;
  optional?: false;
  unique?: boolean;
};

type PrimaryXOROptional = XOR<PrimaryModifier, OptionalModifier>;
type PrimaryXORList = XOR<PrimaryModifier, ListModifier>;
type OptionalXORList = XOR<OptionalModifier, ListModifier>;
type ExclusiveModifiers = OptionalXORList | PrimaryXORList | PrimaryXOROptional;

export type Modifiers = ExclusiveModifiers & {
  default?: boolean | number | string;
  updatedAt?: boolean;
};

export type IntModifiers = Modifiers & {
  default?: number | Defaults.autoincrement | Defaults.dbgenerated;
};

export type StringModifiers = Modifiers & {
  default?: string | Defaults.cuid | Defaults.dbgenerated | Defaults.uuid;
};

export type DateTimeModifiers = Modifiers & {
  /**
   * Date strings should be formatted using the ISO-8601 standard.
   * They must include the time including the time offsets from UTC
   */
  default?: string | Defaults.now;
};

export type ModifierKey = keyof Modifiers;

type FieldType<M = Modifiers> = (name: string, modifiers?: M) => void;
type RawType = (rawString: string) => void;
type HelperType = () => void;

export type FieldTypes = {
  bigInt: FieldType;
  boolean: FieldType;
  bytes: FieldType;
  datetime: FieldType<DateTimeModifiers>;
  decimal: FieldType;
  float: FieldType;
  id: HelperType;
  int: FieldType<IntModifiers>;
  json: FieldType;
  /** The raw type allows directly specifying a schema field in the PSL format */
  raw: RawType;
  string: FieldType<StringModifiers>;
  timestamps: HelperType;
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
