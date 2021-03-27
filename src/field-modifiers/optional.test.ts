import { optional } from './optional';

describe('Optional field modifier', () => {
  it('marks a field as optional in the field schema if the field is set to true', () => {
    expect(optional('name String', true)).toBe('name String?');
  });

  it('performs a no-op if the field is set to false', () => {
    expect(optional('name String', false)).toBe('name String');
  });
});
