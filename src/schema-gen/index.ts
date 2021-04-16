import { SchemaConfig } from '../interfaces';

export const generateSchema = ({
  datasource: { provider: datasourceProvider, url, shadowDatabaseUrl = '' },
  generator: {
    provider: generatorProvider = 'generator-client-js',
    output = '',
    binaryTargets = [],
  },
}: SchemaConfig) => {
  const datasource = `datasource db {
    provider = "${datasourceProvider}"
    url = "${url}"${shadowDatabaseUrl &&
    `\nshadowDatabaseUrl = "${shadowDatabaseUrl}"`}
  }`;
  const generator = `generator client {
    provider = "${generatorProvider}"${output && `\noutput = "${output}"`}${
  }
  }`;
  const schema = `${datasource}${generator}`;
};
