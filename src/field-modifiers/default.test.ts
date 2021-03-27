import { fieldDefault } from './default';

describe('Optional field modifier', () => {
  it('defines a default value for a field for with string type', () => {
    expect(fieldDefault('name String', 'hello world')).toBe(
      'name String @default("hello world")'
    );
  });

  it('defines a default value for a field for with number type', () => {
    expect(fieldDefault('age Int', 42)).toBe('age Int @default(42)');
  });

  it('defines a default value for a field for with boolean type', () => {
    expect(fieldDefault('isCool Boolean', true)).toBe(
      'isCool Boolean @default(true)'
    );
    expect(fieldDefault('isRowdy Boolean', false)).toBe(
      'isRowdy Boolean @default(false)'
    );
  });
});
