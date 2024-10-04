import { createGunzip } from 'node:zlib';
import { createReadStream, createWriteStream} from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const archiveDirectory = join(__dirname, 'files', 'archive.gz');
const distDirectory = join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
    const gunzip = createGunzip();
    const source = createReadStream(archiveDirectory);
    const destination = createWriteStream(distDirectory);
    source.pipe(gunzip).pipe(destination);
};

await decompress();