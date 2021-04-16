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

type BinaryTargets =
  | 'native'
  | 'darwin'
  | 'windows'
  | 'linux-musl'
  | 'debian-openssl-1.0.x'
  | 'debian-openssl-1.1.x'
  | 'rhel-openssl-1.0.x'
  | 'rhel-openssl-1.1.x'
  | 'linux-arm-openssl-1.0.x'
  | 'linux-arm-openssl-1.1.x';

export type SchemaConfig = {
  /**
   * Definitions for the datasource block in the prisma schema
   */
  datasource: {
    /**
     * Define the data source connector to use
     */
    provider: 'postgresql' | 'mysql' | 'sqlite' | 'sqlserver';
    url: string;
    shadowDatabaseUrl?: string;
  };
  /**
   * Definitions for the prisma client generator block in the prisma schema
   */
  generator: {
    /**
     * Describes which generator to use.
     * This can point to a file that implements a generator
     * or specify a built-in generator directly.
     * It is set to "prisma-client-js" by default.
     */
    provider?: string;
    /**
     * File path indicating the location of the generated client.
     * It is set to "node_modules/@prisma/client" by default
     */
    output?: string;
    /**
     * Specify the OS on which the prisma client will run.
     * It is set to ["native"] by default
     */
    binaryTargets?: BinaryTargets[];
    /**
     * Use intellisense to see list of currently available preview features
     */
    previewFeatures?: string[];
  };
  /**
   * An object specifying all the models that should be added to the prisma schema.
   * By default, all models are added
   */
  models?: Record<string, Model>;
  /**
   * An object specifying all the enums that should be added to the prisma schema.
   * By default, all enums are added
   */
  enums?: Record<string, Enum>;
  /**
   * File path indicating where the generated prisma schema should be saved.
   * If the prisma schema path is specified in package.json, it'll use the specified path by default.
   * Otherwise, It is saved to /prisma/prisma.schema by default.
   */
  schemaOutput?: string;
};
