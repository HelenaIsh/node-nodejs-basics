import { access, constants, rename as fsRename } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const oldFileName = join(__dirname, 'files', 'wrongFilename.txt');
const newFileName = join(__dirname, 'files', 'properFilename.md');
const errorMessage = 'FS operation failed'

const rename = async () => {
    await fsRename(oldFileName, newFileName);
};

try {
    await access(oldFileName, constants.R_OK | constants.W_OK);
    try {
        await access(newFileName, constants.R_OK | constants.W_OK);
        throw new Error(errorMessage);
      } catch (err) {
        if (err.code === 'ENOENT') {
            await rename();
        } else {
            throw err;
        }
      }
  } catch (err) {
    if (err.code === 'ENOENT') {
        throw new Error(errorMessage);
    } else {
        console.error(err.message)
    }
  }




