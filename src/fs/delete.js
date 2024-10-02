import { access, constants, unlink } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directory = join(__dirname, 'files', 'fileToRemove.txt');
const errorMessage = 'FS operation failed';

const remove = async () => {
    await unlink(directory);
};

try {
    await access(directory, constants.R_OK | constants.W_OK);
    await remove();
  } catch (err) {
    if (err.code === 'ENOENT') {
        throw new Error(errorMessage)
    }
  }