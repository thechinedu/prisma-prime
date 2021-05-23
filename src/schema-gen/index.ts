import { formatSchema, getDMMF as validateSchema } from '@prisma/sdk';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';

import { SchemaConfig } from '../interfaces';

export const generateSchema = async ({
  datasource: { provider: datasourceProvider, url, shadowDatabaseUrl = '' },
  generator: {
    provider: generatorProvider = 'prisma-client-js',
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
  schema += '\n';

  await validateSchema({ datamodel: schema }).catch(err => console.error(err));
  schema = await formatSchema({ schema });

  if (!schemaPath) {
    schemaPath = await getDefaultSchemaPath();
  }

  writeToSchemaPath(schemaPath, schema);
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

const getDefaultSchemaPath = async (): Promise<string> => {
  const packageJSONPath = join(process.cwd(), 'package.json');
  const readPackageJson = new Promise((resolve, reject) => {
    const stream = createReadStream(packageJSONPath, { encoding: 'utf-8' });

    stream.on('readable', () => {
      const content = stream.read();

      if (content) resolve(JSON.parse(content));
    });

    stream.on('error', err => {
      reject(err);
    });
  });
  const packageJsonContent: any = await readPackageJson;
  let schemaPath: string =
    packageJsonContent?.prisma?.schema || './prisma/schema.prisma';

  return join(process.cwd(), schemaPath);
};

const writeToSchemaPath = (schemaPath: string, schema: string) => {
  const writable = createWriteStream(schemaPath, { encoding: 'utf-8' });
  writable.write(schema);

  writable.end();
};
