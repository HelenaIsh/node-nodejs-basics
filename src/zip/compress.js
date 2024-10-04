import { createGzip } from 'node:zlib';
import { createReadStream, createWriteStream} from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileToCompressDirectory = join(__dirname, 'files', 'fileToCompress.txt');
const archiveDirectory = join(__dirname, 'files', 'archive.gz');

const compress = async () => {
    const gzip = createGzip();
    const source = createReadStream(fileToCompressDirectory);
    const destination = createWriteStream(archiveDirectory);
    source.pipe(gzip).pipe(destination);
};

await compress();