import { unique } from './unique';

describe('Unique field modifier', () => {
  it('adds the @unique attribute to the field schema', () => {
    expect(unique('name String')).toBe('name String @unique');
  });
});
