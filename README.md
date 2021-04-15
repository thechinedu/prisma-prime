# Prisma Prime

Schema definition for Prisma in JavaScript/TypeScript. Prisma Prime allows you to programmatically generate your Prisma schema using TypeScript or JavaScript.

## Status

This project is still in active development and not recommended for use in a production environment.

## Usage

Example:

```ts
// db/models/Post.ts
import { model } from 'prisma-prime';

const Post = model('Post', t => {
  t.id();
  t.string('title', { unique: true });
  t.boolean('draft');
  t.string('categories', { list: true });
  t.string('slug', { unique: true });
  t.hasOne('author', { source: 'User' });
  t.hasMany('comments', { source: 'Comment' });
  t.timestamps();
  t.uniqueScope('title', 'slug');
});

// db/models/User.ts
import { model, enumType } from 'prisma-prime';

const Role = enumType('Role', ['USER', 'ADMIN']);

const User = model('User', t => {
  t.id();
  t.string('fullName');
  t.string('email', { unique: true });
  t.enum('role', { source: Role });
  t.hasMany('posts', { source: 'Post' });
  t.timestamps();
});

// db/models/Comment.ts
import { model } from 'prisma-prime';

const Comment = model('Comment', t => {
  t.id();
  t.string('content');
  t.belongsTo('post', { source: 'Post' });
  t.timestamps();
});

// db/models/schema.ts
import { generateSchema } from 'prisma-prime';

const schema = generateSchema({
  datasource: {
    provider: 'postgresql',
    url:
      process.env.DATABASE_URL ||
      'postgresql://user@localhost:5432/prisma-prime',
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
