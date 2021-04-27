import { formatSchema, getDMMF as validateSchema } from '@prisma/sdk';
import { createReadStream } from 'fs';
import { join } from 'path';

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
 *    Save to prisma/schema.prisma
 */

export const generateSchema = async ({
  datasource: { provider: datasourceProvider, url, shadowDatabaseUrl = '' },
  generator: {
    provider: generatorProvider = 'generator-client-js',
    output = '',
    binaryTargets = [],
    previewFeatures = [],
  } = {},
  models,
  enums = {},
  schemaOutput,
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
  let schemaPath = schemaOutput;

  schema = buildSchemaFromRecord(models, schema);
  schema = buildSchemaFromRecord(enums, schema);

  await validateSchema({ datamodel: schema }).catch(err => console.error(err));
  schema = await formatSchema({ schema });

  if (!schemaPath) {
    schemaPath = await getDefaultSchemaPath();
  }
};

void formatSchema;

const buildSchemaFromRecord = (
  record: Record<string, { toSchema: string }>,
  schema: string
) => {
  for (const [_, value] of Object.entries(record)) {
    schema += `${value.toSchema}\n`;
  }

  return schema;
};

const getDefaultSchemaPath = async (): Promise<string> => {
  const packageJSONPath = join(process.cwd(), 'package.json');
  const createReadStreamPromise = new Promise((resolve, reject) => {
    const stream = createReadStream(packageJSONPath, { encoding: 'utf-8' });

    stream.on('readable', () => {
      const content = stream.read();

      if (content) resolve(content);
    });

    stream.on('error', err => {
      reject(err);
    });
  });

  void createReadStreamPromise;

  return '';
};
