import { updatedAt } from './updatedAt';

describe('Optional field modifier', () => {
  it('marks a field with the updatedAt attribute in the field schema if the field is set to true', () => {
    expect(updatedAt('name String', true)).toBe('name String @updatedAt');
  });

  it('performs a no-op if the field is set to false', () => {
    expect(updatedAt('name String', false)).toBe('name String');
  });
});
