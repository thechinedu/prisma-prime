import { optional } from './optional';

describe('Optional field modifier', () => {
  it('marks a field as optional in the field schema', () => {
    expect(optional('name String')).toBe('name String?');
  });
});
