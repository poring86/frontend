import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: 'http://localhost:3333/api-json',
    output: {
      mode: 'split',
      target: 'data/api/generated/endpoints.ts',
      schemas: 'data/api/generated/models',
      client: 'fetch',
    },
  },
});
