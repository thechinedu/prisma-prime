import { primary } from './primary';

describe('Primary field modifier', () => {
  it('adds the @id attribute to the field schema', () => {
    expect(primary('name String')).toBe('name String @id');
  });
});
