import { primary } from './primary';

describe('Primary field modifier', () => {
  it('adds the @id attribute to the field schema if the field is set to true', () => {
    expect(primary('name String', true)).toBe('name String @id');
  });

  it('performs a no-op if the field is set to false', () => {
    expect(primary('name String', false)).toBe('name String');
  });
});
