import { writeFile } from 'fs';
import { access, constants } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const content = 'I am fresh and young';
const directory = join(__dirname, 'files', 'fresh.txt');

const create = async () => {
    writeFile(directory, content, err => {
        if (err) {
          throw new Error('FS operation failed');
        }
    });
};

try {
    await access(directory, constants.R_OK | constants.W_OK);
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.code === 'ENOENT') {
        await create();
    } else {
        console.error(err.message)
    }
  }