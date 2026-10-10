import { copyFile } from 'node:fs/promises';
await copyFile(new URL('../dist/index.html', import.meta.url), new URL('../server-build/index.html', import.meta.url));
