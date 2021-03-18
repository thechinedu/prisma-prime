// type FieldTypes = {
//   string: (name: string, modifiers?: Modifiers) => void;
// };

// type ModelDefinition = (fieldTypes: FieldTypes) => void;

// type Modifiers = Partial<{
//   optional: boolean;
// }>;

// type ModifierKey = keyof Modifiers;

// const fieldModifiers = {
//   optional(fieldSchema: string) {
//     const [fieldName, fieldType] = fieldSchema.split(' ');

//     return `${fieldName} ${fieldType}?`;
//   },
// };

// const generateFieldSchema = (
//   name: string,
//   type: string,
//   modifiers: Modifiers = {}
// ) => {
//   let res = `${name} ${type}`;

//   for (let [key, value] of Object.entries(modifiers)) {
//     let modifier = key as ModifierKey;

//     if (value) {
//       res = fieldModifiers[modifier](res);
//     }
//   }

//   return res;
// };

// const generateFields = (fields: any): FieldTypes => ({
//   string(name: string, modifiers?: Modifiers) {
//     const fieldType = 'String';

//     Object.assign(fields, {
//       [name]: {
//         type: fieldType,
//         ...modifiers,
//         _fieldSchema: generateFieldSchema(name, fieldType, modifiers),
//       },
//     });
//   },
// });

// export const model = (name: string, definition: ModelDefinition) => {
//   const fields = {};

//   definition(generateFields(fields));

//   return { name, fields };
// };

export { model } from './model';
