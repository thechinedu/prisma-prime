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

export type NumberModifiers = Modifiers & {
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

export type RelationModifiers = XOR<
  Omit<OptionalModifier, 'primary' | 'unique'>,
  Omit<ListModifier, 'primary' | 'unique'>
> & {
  /**
   * String literal matching the name of the model
   */
  source: string;
  fields?: string[];
  references?: string[];
  name?: string;
};

export type EnumModifiers = Modifiers & {
  /**
   * String literal matching a value in the enum
   */
  default?: string;
  /**
   * When specifying a string literal, ensure it matches the name of the enum
   */
  source: Enum | string;
};

export type ModifierKey = keyof Modifiers | 'relation';

type FieldTypeWithOptionalModifiers<M = Modifiers> = (
  name: string,
  modifiers?: M
) => void;
type FieldTypeWithRequiredModifiers<M = Modifiers> = (
  name: string,
  modifiers: M
) => void;
type RawType = (rawString: string) => void;
type HelperType = () => void;

export type FieldTypes = {
  belongsTo: FieldTypeWithRequiredModifiers<Pick<RelationModifiers, 'source'>>;
  bigInt: FieldTypeWithOptionalModifiers<NumberModifiers>;
  boolean: FieldTypeWithOptionalModifiers;
  bytes: FieldTypeWithOptionalModifiers;
  datetime: FieldTypeWithOptionalModifiers<DateTimeModifiers>;
  decimal: FieldTypeWithOptionalModifiers<NumberModifiers>;
  enum: FieldTypeWithRequiredModifiers<EnumModifiers>;
  float: FieldTypeWithOptionalModifiers<NumberModifiers>;
  hasMany: FieldTypeWithRequiredModifiers<Pick<RelationModifiers, 'source'>>;
  hasOne: FieldTypeWithRequiredModifiers<Pick<RelationModifiers, 'source'>>;
  id: HelperType;
  int: FieldTypeWithOptionalModifiers<NumberModifiers>;
  json: FieldTypeWithOptionalModifiers;
  /** The raw type allows directly specifying a schema field in the PSL format */
  raw: RawType;
  relation: FieldTypeWithRequiredModifiers<RelationModifiers>;
  string: FieldTypeWithOptionalModifiers<StringModifiers>;
  timestamps: HelperType;
};

export type Fields = {
  [key: string]: (
    | Modifiers
    | NumberModifiers
    | StringModifiers
    | DateTimeModifiers
    | RelationModifiers
    | EnumModifiers
  ) & {
    type: string;
    fieldSchema: string;
  };
};

export type ModelFn = (
  modelName: string,
  fieldDefinition: ModelDefinition
) => Model;

export type Model = {
  name: string;
  fields: Fields;
};

export type ModelDefinition = (fieldTypes: FieldTypes) => void;

export type Enum = {
  name: string;
  toSchema: string;
  [key: string]: string;
};
