type Fields = {
  string: (name: string, modifiersAndAttributes: any) => void;
};

type ModelDefinition = (fields: Fields) => void;

export const model = (name: string, definition: ModelDefinition) => {
  console.log({ name, definition });
};

const modelReturn = {
  name: 'User',
  fields: {
    id: { type: 'int', id: true, default: 'autoincrement' },
    email: { type: 'string', unique: true },
    name: { type: 'string', optional: true },
    hasMany: 'Community',
    toSchema: `
      model User {
        id Int @id @default(autoincrement())
        email String @unique
        name String?
        communities Community[]
      }
    `,
  },
};

// generateSchema()

console.log(modelReturn);
