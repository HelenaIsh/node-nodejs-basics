import { access, constants, mkdir, readdir, copyFile } from 'node:fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcFolderDirectory = join(__dirname, 'files');
const distFolderDirectory = join(__dirname, 'files_copy');
const errorMessage = 'FS operation failed'

const copy = async () => {
    await mkdir(distFolderDirectory);

    const files = await readdir(srcFolderDirectory);

    for (const file of files) {
      const srcFile = join(srcFolderDirectory, file);
      const destFile = join(distFolderDirectory, file);
      
      await copyFile(srcFile, destFile);
    }
};

try {
    await access(srcFolderDirectory, constants.R_OK | constants.W_OK);
    try {
        await access(distFolderDirectory, constants.R_OK | constants.W_OK);
        throw new Error(errorMessage);
      } catch (err) {
        if (err.code === 'ENOENT') {
            await copy();
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




