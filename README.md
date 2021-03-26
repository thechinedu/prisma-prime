# Prisma Prime

Schema definition for Prisma in JavaScript/TypeScript. Prisma Prime allows you to programmatically generate your Prisma schema using TypeScript or JavaScript.

## Status

This project is still in active development and not recommended for use in a production environment.

## Usage

Example:

```ts
import { model, generateSchema } from 'prisma-prime';

const User = model('User', t => {
  t.id();
  t.string('fullName');
  t.string('email', { unique: true });
  t.hasMany('posts', { model: Post });
  t.timestamps();
});

const Post = model('Post', t => {
  t.id();
  t.string('title', { unique: true });
  t.boolean('draft');
  t.string('categories', { list: true });
  t.string('slug', { unique: true });
  t.hasOne('author', { model: User });
  t.hasMany('comments', { model: Comment });
  t.timestamps();
  t.uniqueScope('title', 'slug');
});

const Comment = model('Comment', t => {
  t.id();
  t.string('content');
  t.belongsTo('post', { model: Post });
  t.timestamps();
});

const schema = generateSchema({
  datasource: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL || 'postgresql://user@localhost:5432/prisma-prime',
  },
  generator: {
    provider: 'prisma-client-js',
  },
  models: {
    User,
    Post,
    Comment,
  },
});
```
