import { SchemaConfig } from '../interfaces';

/**
 *
 * Next steps:
 * Generate schema output, run prisma format on it and save to file system
 *
 *  File to save to:
 *    If path is specified, use the specified path.
 *
 *    otherwise:
 *    Read from package json (of the project using prisma-prime) and check to see if a path
 *    to the prisma schema has been set. If it has been set, use it as the schema output
 *
 *    otherwise:
 *    Save to prisma/prisma.schema
 */

export const generateSchema = ({
  datasource: { provider: datasourceProvider, url, shadowDatabaseUrl = '' },
  generator: {
    provider: generatorProvider = 'generator-client-js',
    output = '',
    binaryTargets = [],
    previewFeatures = [],
  } = {},
  models,
  enums = {},
}: SchemaConfig) => {
  const datasource = `datasource db {
    provider = "${datasourceProvider}"
    url = "${url}"${shadowDatabaseUrl &&
    `\nshadowDatabaseUrl = "${shadowDatabaseUrl}"`}
  }`;
  const generator = `generator client {
    provider = "${generatorProvider}"${output && `\noutput = "${output}"`}${
    binaryTargets.length
      ? `\nbinaryTargets = ${JSON.stringify(binaryTargets)}`
      : ''
  }${
    previewFeatures.length
      ? `\previewFeatures = ${JSON.stringify(previewFeatures)}`
      : ''
  }
  }`;
  let schema = `${datasource}\n${generator}\n`;

  schema = buildSchemaFromRecord(models, schema);
  schema = buildSchemaFromRecord(enums, schema);

  console.log({ dirname: __dirname, cwd: process.cwd() });

  return schema;
};

const buildSchemaFromRecord = (
  record: Record<string, { toSchema: string }>,
  schema: string
) => {
  for (const [_, value] of Object.entries(record)) {
    schema += `${value.toSchema}\n`;
  }

  return schema;
};
