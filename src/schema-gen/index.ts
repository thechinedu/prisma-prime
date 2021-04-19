import { SchemaConfig } from '../interfaces';

export const generateSchema = ({
  datasource: { provider: datasourceProvider, url, shadowDatabaseUrl = '' },
  generator: {
    provider: generatorProvider = 'generator-client-js',
    output = '',
    binaryTargets = [],
    previewFeatures = [],
  } = {},
  models,
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

  for (const [_, value] of Object.entries(models)) {
    schema += `${value.modelSchema}\n`;
  }

  return schema;
};
