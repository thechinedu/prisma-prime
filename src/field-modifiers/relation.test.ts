import { relation } from './relation';

describe('Relation field modifier', () => {
  it('sets the "name" argument for a relation', () => {
    expect(relation('user User', { name: 'UserFollows' })).toBe(
      'user User @relation(name: "UserFollows")'
    );
  });

  it('sets the "fields" argument for a relation', () => {
    expect(relation('user User', { fields: ['authorId'] })).toBe(
      'user User @relation(fields: [authorId])'
    );
  });

  it('sets the "references" argument for a relation', () => {
    expect(relation('user User', { references: ['id'] })).toBe(
      'user User @relation(references: [id])'
    );
  });

  it('sets all arguments for a relation', () => {
    expect(
      relation('user User', {
        name: 'UserFollows',
        fields: ['authorId'],
        references: ['id'],
      })
    ).toBe(
      'user User @relation(name: "UserFollows", fields: [authorId], references: [id])'
    );
  });

  it('sets the specified arguments only', () => {
    expect(
      relation('user User', { name: 'UserFollows', references: ['id'] })
    ).toBe('user User @relation(name: "UserFollows", references: [id])');

    expect(
      relation('user User', { name: 'UserFollows', fields: ['authorId'] })
    ).toBe('user User @relation(name: "UserFollows", fields: [authorId])');

    expect(
      relation('user User', { fields: ['authorId'], references: ['id'] })
    ).toBe('user User @relation(fields: [authorId], references: [id])');
  });

  it('sets the arguments in the required order regardless of object entry order', () => {
    expect(
      relation('user User', {
        references: ['id'],
        name: 'UserFollows',
        fields: ['authorId'],
      })
    ).toBe(
      'user User @relation(name: "UserFollows", fields: [authorId], references: [id])'
    );
  });

  it('omits the relation modifier when no arguments are specified', () => {
    expect(relation('user User', {})).toBe('user User');
  });
});
