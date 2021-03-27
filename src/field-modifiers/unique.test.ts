import { unique } from './unique';

describe('Unique field modifier', () => {
  it('adds the @unique attribute to the field schema if the field is set to true', () => {
    expect(unique('name String', true)).toBe('name String @unique');
  });

  it('performs a no-op if the field is set to false', () => {
    expect(unique('name String', false)).toBe('name String');
  });
});
