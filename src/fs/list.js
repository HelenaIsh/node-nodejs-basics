import { access, constants, readdir } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcFolderDirectory = join(__dirname, 'files');
const errorMessage = 'FS operation failed'


const list = async () => {
    const files = await readdir(srcFolderDirectory);
    for (const file of files) {
        console.log(file);
    }
};

try {
    await access(srcFolderDirectory, constants.R_OK | constants.W_OK);
    await list();
  } catch (err) {
    if (err.code === 'ENOENT') {
        throw new Error(errorMessage);
    } else {
        console.error(err.message)
    }
  }