import * as esbuild from 'esbuild';
import * as zl from 'zip-lib';
import * as fs from 'fs/promises';

async function build() {
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outdir: 'dist',
    platform: 'node',
  });

  const packageJson = {
    scripts: {
      start: 'node index.js',
    },
  };
  await fs.writeFile('dist/package.json', JSON.stringify(packageJson, null, 2));

  await zl.archiveFolder('dist', 'dist.zip');

  console.log('Build completed and dist.zip created successfully.');
}

build();
