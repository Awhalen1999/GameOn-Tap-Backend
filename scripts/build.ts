import * as esbuild from 'esbuild';
import * as zl from 'zip-lib';
import * as fs from 'fs/promises';

async function build() {
  /**
   * const entry = 'index'
   * const out = 'dist'
   * const src = 'src'
   * const package = 'package.json'
   * 
   * entryPoints: [path.resolve(cwd(), src, `${entry}.ts`)]
   *  
   * copyFile(package, path.resolve(cwd(), out, package))
   * 
   * archiveFolder(out, `${out}.zip`)
   */
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outdir: 'dist',
    platform: 'node',
  });

  await fs.copyFile('package.json', 'dist/package.json')

  await zl.archiveFolder('dist', 'dist.zip');
}

build();
