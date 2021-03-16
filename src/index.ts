type FieldTypes = {
  string: (name: string, modifiers?: Modifiers) => void;
};

type ModelDefinition = (fieldTypes: FieldTypes) => void;

type Modifiers = Partial<{
  optional: boolean;
  // unique: true
}>;

type ModifierKey = keyof Modifiers;

// { name: { type: "string", optional: true, unique: true } }
// name String? @unique
// `{field.name} {field.type} {field.modifiers.join(' ')}`

const fieldModifiers = {
  optional(fieldSchema: string) {
    const [fieldName, fieldType] = fieldSchema.split(' ');

    return `${fieldName} ${fieldType}?`;
  },
};

const generateFieldSchema = (
  name: string,
  type: string,
  modifiers: Modifiers = {}
) => {
  let res = `${name} ${type}`;

  for (let [key, value] of Object.entries(modifiers)) {
    let modifier = key as ModifierKey;

    if (value) {
      res = fieldModifiers[modifier](res);
    }
  }

  return res;
};

const generateFields = (fields: any): FieldTypes => ({
  string(name: string, modifiers?: Modifiers) {
    const fieldType = 'String';

    Object.assign(fields, {
      [name]: {
        type: fieldType,
        ...modifiers,
        _fieldSchema: generateFieldSchema(name, fieldType, modifiers),
      },
    });
  },
});

export const model = (name: string, definition: ModelDefinition) => {
  const fields = {};

  definition(generateFields(fields));
  // mergeSchemaDefinitions(fields)

  return { name, fields };
};

/**
 * Example usage:
 * const User = model("User", (f) => {
 *  f.string("name", { optional: true })
 * })
 */

// const modelReturn = {
//   name: 'User',
//   fields: {
//     id: { type: 'int', id: true, default: 'autoincrement' },
//     email: { type: 'string', unique: true },
//     name: { type: 'string', optional: true },
//     hasMany: 'Community',
//     toSchema: `
//       model User {
//         id Int @id @default(autoincrement())
//         email String @unique
//         name String?
//         communities Community[]
//       }
//     `,
//   },
// };
