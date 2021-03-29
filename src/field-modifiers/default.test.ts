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

  it('defines a default value for a field for with datetine type', () => {
    expect(fieldDefault('createdAt DateTime', new Date('March 29, 2021'))).toBe(
      'createdAt DateTime @default("2021-03-28T23:00:00.000Z")'
    );
    expect(
      fieldDefault('createdAt DateTime', new Date('March 29, 2021 20:45:00'))
    ).toBe('createdAt DateTime @default("2021-03-29T19:45:00.000Z")');
    expect(fieldDefault('createdAt DateTime', new Date(1616972400000))).toBe(
      'createdAt DateTime @default("2021-03-28T23:00:00.000Z")'
    );
    expect(fieldDefault('createdAt DateTime', '2021-03-28T23:00:00.000Z')).toBe(
      'createdAt DateTime @default("2021-03-28T23:00:00.000Z")'
    );
  });
});
