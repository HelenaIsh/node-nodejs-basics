import { access, constants, readFile } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directory = join(__dirname, 'files', 'fileToRead.txt');
const errorMessage = 'FS operation failed';

const read = async () => {
    const data = await readFile(directory, 'utf-8');
    console.log(data);
};

try {
    await access(directory, constants.R_OK | constants.W_OK);
    await read();
  } catch (err) {
    if (err.code === 'ENOENT') {
        throw new Error(errorMessage)
    }
  }