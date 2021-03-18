const optional = (fieldSchema: string) => {
  const [fieldName, fieldType] = fieldSchema.split(' ');

  return `${fieldName} ${fieldType}?`;
};

export default optional;
