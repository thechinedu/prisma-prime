import { list } from './list';

describe('List field modifier', () => {
  it('marks a field as a list in the field schema if the field is set to true', () => {
    expect(list('name String', true)).toBe('name String[]');
  });

  it('performs a no-op if the field is set to false', () => {
    expect(list('name String', false)).toBe('name String');
  });
});
